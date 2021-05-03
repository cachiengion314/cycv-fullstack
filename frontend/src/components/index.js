import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import HorizontalNav from "./navbar"
import { Provider } from "react-redux"
import store from "./redux-store"
import ModalNotify from "./modal/ModalNotify"
import ModalOption from "./modal/ModalOption"
import ModalCustom from "./modal/ModalCustom"
import MyCvPage from "./mycv-page"
import ShowCasePage from "./showcase-page"
import AboutUs from './about-us'
import Block from "../custom-components/Block"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ModalCustom />
        <ModalOption />
        <ModalNotify />

        <Block width="100%" className="cycv-header">
          <HorizontalNav width="100%" height="3rem" />
        </Block>

        <Switch>
          <Route exact path="/" children={<MyCvPage dispatch={store.dispatch} />} />
          <Route exact path="/show-case" children={<ShowCasePage dispatch={store.dispatch} />} />
          <Route path="/:id" children={<MyCvPage dispatch={store.dispatch} />} />
        </Switch>

        <Block width="100%" className="cycv-footer align-center">
          <Block width="60%" height="1px" background="darkblue" className="mt-5"></Block>
          <AboutUs width="100%" className="" />
        </Block>

      </Router>
    </Provider>
  );
}

export default App;