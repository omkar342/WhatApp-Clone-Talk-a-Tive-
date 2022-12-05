import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ChakraProvider>
  </BrowserRouter>
);

// ReactDOM.render(
//   <BrowserRouter>
//     <ChakraProvider>
//       <ChatProvider>
//         <App />
//       </ChatProvider>
//     </ChakraProvider>
//   </BrowserRouter>,
//   document.getElementById()
// );
