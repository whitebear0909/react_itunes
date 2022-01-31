import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import * as rootRedux from "./redux/rootRedux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "./pages/home";
import "./App.scss";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootRedux.rootReducer, 
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootRedux.rootSage);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/home">
              <HomePage />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
