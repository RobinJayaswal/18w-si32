const RedisSessions = require("redis-sessions");
const redis = require("redis");
const { AuthError } = require("./errors");

const RS_APPNAME = "si32";

const rs = new RedisSessions({
  client: redis.createClient(process.env.REDIS_URL)
});

// resolves with session object
const create = (user, ip) => {
  return new Promise((resolve, reject) => {
    rs.create(
      {
        app: RS_APPNAME,
        id: user._id,
        ip,
        ttl: 10000
      },
      (err, resp) => {
        if (err) {
          reject(new AuthError());
        } else {
          resp.user = user;
          resolve(resp);
        }
      }
    );
  });
};

// resolves with the user id associated with a valid token
const get = token => {
  return new Promise((resolve, reject) => {
    rs.get(
      {
        app: RS_APPNAME,
        token
      },
      (err, session) => {
        if (err || !session.id) {
          reject(new AuthError("No session found"));
        } else {
          resolve(session.id);
        }
      }
    );
  });
};

// removes session by token
const destroy = token => {
  return new Promise((resolve, reject) => {
    rs.kill(
      {
        app: RS_APPNAME,
        token
      },
      (err, resp) => {
        if (err || resp.kill == 0) {
          reject(new Error(err));
        } else {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  create,
  get,
  destroy
};
