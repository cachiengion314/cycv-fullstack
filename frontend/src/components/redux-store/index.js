import { createStore } from "redux";
import Reducer from "./Reducer";
import InitialStore from "./InitialStore";

const reduxStore = createStore(Reducer, InitialStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default reduxStore;