# startWorker.py

import traceback

from game.Game import Game
from game.DockerBot import DockerBot

from waitForGame import pollUntilGameReady
from endpoints import post_match_results

# ------------------------------------------------------------------------------
# run_worker()

def run_worker():
    while True:
        # get the next game
        (botSpecs, gameType, matchId) = pollUntilGameReady()

        bots = []

        # create a bot object for each bot that's in this match
        for b in botSpecs:
            bots.append(DockerBot(b['id'], b['index'], b['url'], b.get('params', {})))

        game = Game(bots)

        try:
            # we'll need more than just a log at some point
            # should probably return a tuple of log and results, which would contain
            # flags/info on game termination (timeout, completion, bot error, etc.)
            game.start()

            print("Got results.")

            # send the results back to the server
            post_match_results(matchId, game.get_log())

        except Exception as err:
            print("GAME ERR")
            print(err)
            for p in game.players:
                if not p.bot.is_running():
                    p.crashed = True

            game.rank_players()
            game.log_winner()
            post_match_results(matchId, game.get_log())

            # TODO handle if no bot crashed, meaning the error was ours

        try:
            for b in bots:
                b.cleanup()
        except Exception as err:
            print("Issue cleaning up.")
            print(err)

        print("Done cleaning up.")

# ------------------------------------------------------------------------------
# Script

run_worker()
