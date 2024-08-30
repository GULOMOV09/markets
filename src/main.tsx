import * as ReactDOM from "react-dom/client";
import "./assets/sass/main.scss";
import { App } from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
