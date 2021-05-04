import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import MainPage from "./MainPage";
import About from "../pages/About.js";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <MainPage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
