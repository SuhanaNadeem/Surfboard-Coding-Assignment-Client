import ReactDOM from "react-dom";
import ApolloProvider from "./ApolloProvider";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";

ReactDOM.render(ApolloProvider, document.getElementById("root"));
const trackingId = "UA-146291298-1";
ReactGA.initialize(trackingId);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
