import request from "superagent";
import store from "../store";

import config from "../config";
import { history } from "../router";
import { SESSION_DESTROY } from "../data/session/sessionActions";

const { API_URL } = config;

const agent = request.agent();

// attach auth to all requests, and redirect to login if we ever get a 401
agent.use(req => {
  // pass the session token on every request
  req.set("Authorization", "Bearer " + store.getState().session.token);

  req.on("response", res => {
    // if we got a 401, redirect to the login page
    if (res.status == 401) {
      // destroy the local session if there was one
      store.dispatch({
        type: SESSION_DESTROY
      });
      history.push("/login");
    }
  });
});

// small wrappers around base get/post calls
const get = url => {
  return agent.get(API_URL + url);
};

const post = url => {
  return agent.post(API_URL + url);
};

const put = url => {
  return agent.put(API_URL + url);
};

const del = url => {
  return agent.del(API_URL + url);
};

export { get, post, put, del };
