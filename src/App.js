import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    //<ChatProvider>
    <div className="App">
      <div>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/chats">
            <ChatPage />
          </Route>
        </Switch>
      </div>
    </div>
    //</ChatProvider>
  );
}

export default App;
