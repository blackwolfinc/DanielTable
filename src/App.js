import { Container } from "@material-ui/core";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./Assets/Components/Login";
import { TableReact } from "./Assets/Components/TableReact";

function App() {
  return (
    <Container maxWidth="Xl">
   
   


 <BrowserRouter>
      <Switch>
        <Route path="/Homepage">
        <TableReact />
        </Route>
        <Route path="/">
        <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
    </Container>
  );
}

export default App;
