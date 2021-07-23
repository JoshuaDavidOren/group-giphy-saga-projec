import React from 'react';
import SearchPage from '../SearchPage/SearchPage';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import FavoritePage from '../FavoritePage/FavoritePage';

function App() {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router>
      <Route path="/" exact component={SearchPage} />
      <Route path="/favorites" exact component={FavoritePage}/>
      </Router>
    </div>
  );
}

export default App;
