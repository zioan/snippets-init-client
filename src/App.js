import axios from "axios";
import "./App.css";
import Router from "./Router";
import "./style/index.scss";
import { UserContextProvider } from "./util/UserContext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className="container">
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
