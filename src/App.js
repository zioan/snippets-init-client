import axios from "axios";
import "./App.css";
import Router from "./Router";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="container">
      <Router />
    </div>
  );
}

export default App;
