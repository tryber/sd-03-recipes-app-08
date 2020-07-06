import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesPage from './pages/RecipesPage';
import ExploreMealsOrDrinks from './pages/ExploreMealsOrDrinks';
import ExploreByIngredients from './pages/ExploreByIngredient';
import Test from './pages/Test';
import './styles/App.css';

function App() {
  return (
    <div id="meals" className="meals">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/bebidas" component={RecipesPage} />
          <Route exact path="/comidas" component={RecipesPage} />
          <Route path="/comidas/:id" component={Test} />
          <Route path="/bebidas/:id" component={Test} />
          <Route path="/comidas/:id/in-progress">{}</Route>
          <Route path="/bebidas/:id/in-progress">{}</Route>
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/explorar/comidas" component={ExploreMealsOrDrinks} />
          <Route exact path="/explorar/bebidas" component={ExploreMealsOrDrinks} />
          <Route path="/explorar/comidas/ingredientes" component={ExploreByIngredients} />
          <Route path="/explorar/bebidas/ingredientes" component={ExploreByIngredients} />
          <Route path="/explorar/comidas/area">{Test}</Route>
          <Route exact path="/perfil" component={Profile} />
          <Route path="/receitas-feitas">{}</Route>
          <Route path="/receitas-favoritas">{}</Route>
          <Route path="*">{}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
