import "./App.css";
import {} from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./Login";
import JobsList from "./JobsList";
import AddJob from "./AddJob";
import Register from "./Register";
import Protected from "./Protected";
import Profile from "./Profile";
import SearchbyComp from "./Searchbycom";
import SearchbyType from "./Searchbytype";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        
        <Route path = "/register">
          <Register/>
        </Route>
        <Route path = "/add">
          <Protected Cmp = {AddJob}/>
        </Route>
        <Route path = "/jobs">
        <Protected Cmp = {JobsList}/>
        </Route>
        <Route path = "/profile">
        <Protected Cmp = {Profile}/>
        </Route>
        <Route path = "/searchComp">
        <Protected Cmp = {SearchbyComp}/>
        </Route>
        <Route path = "/searchJobtype">
        <Protected Cmp = {SearchbyType}/>
        </Route>
        <Route path = "/">
          <Login/>
        </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
