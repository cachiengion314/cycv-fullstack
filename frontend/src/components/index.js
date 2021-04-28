import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from "react-redux"
import store from "./redux-store"
import MyCvPage from "./mycv-page"
import ShowCasePage from "./showcase-page"
import NavBar from "./navbar"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar width="100%" height="3rem" />
        <Switch>
          <Route exact path="/" children={<MyCvPage dispatch={store.dispatch} />} />
          <Route exact path="/show-case" children={<ShowCasePage dispatch={store.dispatch} />} />
          <Route path="/:id" children={<MyCvPage dispatch={store.dispatch} />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;