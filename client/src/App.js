import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookList from "./components/book_list";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Books from "./pages/books";
import AddBook from "./pages/add_book";

function App() {
  return (
    <Router>
      <Navbar />

      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/books" component={Books} />
          <Route path="/addbook" component={AddBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
