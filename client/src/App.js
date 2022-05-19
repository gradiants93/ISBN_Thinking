import "./App.css";
import "./pages/page.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Books from "./pages/books";
import AddNewBook from "./pages/add_new_book";
import SearchBook from "./pages/search_book";

function App() {
  return (
    <Router>
      <Navbar />

      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/addnewbook" component={AddNewBook} />
          <Route path="/search" component={SearchBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
