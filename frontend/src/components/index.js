import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HorizontalNav from "./navbar"
import { Provider } from "react-redux"
import store from "./redux-store"
import ModalNotify from "./modal/ModalNotify"
import ModalOption from "./modal/ModalOption"
import ModalCustom from "./modal/ModalCustom"
import MyCvPage from "./mycv-page"
import NotFound404Page from "./notfound-404page"
import ShowCasePage from "./showcase-page"

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
          <Route exact path="/show-case" children={<ShowCasePage dispatch={store.dispatch} />} />
          <Route path="/:id" children={<MyCvPage dispatch={store.dispatch} />} />
          <Route path="/*" children={<NotFound404Page />} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;