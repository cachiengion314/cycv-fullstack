import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HorizontalNav from "./navbar";
import { Provider } from "react-redux";
import store from "./redux-store";
import ModalNotify from "./modal/ModalNotify";
import ModalOption from "./modal/ModalOption";
import ModalCustom from "./modal/ModalCustom";
import MyCvPage from "./mycv-page";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ModalCustom />
        <ModalOption />
        <ModalNotify />
        <HorizontalNav width="100%" height="3rem" />
        <Switch>
          <Route exact path="/" children={<MyCvPage dispatch={store.dispatch} />} />
          <Route path="/:id" children={<MyCvPage dispatch={store.dispatch} />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;