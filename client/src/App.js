import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Books from "./pages/books";
import AddNewBook from "./pages/add_new_book";
import SearchBook from "./pages/search_book";
import NavBurger from "./components/Navbar/NavBurger";

function App() {
  return (
    <Router>
      <Navbar />
      <NavBurger />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/addnewbook" component={AddNewBook} />
        <Route path="/search" component={SearchBook} />
      </Switch>
    </Router>
  );
}

export default App;
