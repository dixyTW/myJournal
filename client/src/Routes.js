import React from "react";
import { Route, Switch } from "react-router-dom";
import Entries from "./Entries.js";
import Login from "./Login.js"
import Register from "./Register.js"
import NotFound from "./NotFound"

export default () =>
  <Switch>
    <Route path="/" exact component={Entries} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route component={NotFound} />
  </Switch>;