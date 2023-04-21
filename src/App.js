import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./views/Dashboard/Dashboard";
import Projects from "./views/Projects/Projects";
import Persons from "./views/Persons/Persons";
import Login from "./views/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Layout>
              <Dashboard />
            </Layout>
          </Route>
          <Route exact path="/projects">
            <Layout>
              <Projects />
            </Layout>
          </Route>
          <Route exact path="/persons">
            <Layout>
              <Persons />
            </Layout>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
