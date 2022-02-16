import React from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Snippets from "./pages/Snippets";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/snippets">
          <Snippets />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
