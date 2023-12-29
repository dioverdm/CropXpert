import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// importing chakraProvider from the library we installed
import { BrowserRouter } from "react-router-dom";
// importing BrowserRouter from the pacakge we installed
import ChatProvider from "./Context/ChatProvider";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // for same state throughout the app
  // we wraped the whole app inside chatprovider
  // it is a context api (state management)
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      {/* we wraped app inside ChakraProvider */}
      {/* we wraped app inside BrowseRouter */}
    </ChatProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
