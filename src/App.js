import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipesPage from './pages/RecipesPage';
import ExploreMealsOrDrinks from './pages/ExploreMealsOrDrinks';
import ExploreByIngredients from './pages/ExploreByIngredient';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './pages/NotFound';
// import Test from './pages/Test';
import './styles/App.css';
import MealDetailPage from './pages/MealDetailPage';
import DrinkDetailPage from './pages/DrinkDetailPage';
import DrinkInProgressPage from './pages/DrinkInProgressPage';
import MealInProgressPage from './pages/MealInProgressPage';
import FavoritePage from './pages/FavoritePage';
import DonePage from './pages/DonePage';

function App() {
  return (
    <div id="meals" className="meals">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/bebidas" component={RecipesPage} />
          <Route exact path="/comidas" component={RecipesPage} />
          <Route exact path="/comidas/:id" component={MealDetailPage} />
          <Route exact path="/bebidas/:id" component={DrinkDetailPage} />
          <Route path="/comidas/:id/in-progress" component={MealInProgressPage} />
          <Route path="/bebidas/:id/in-progress" component={DrinkInProgressPage} />
          <Route exact path="/explorar" component={Explore} />
          <Route exact path="/explorar/comidas" component={ExploreMealsOrDrinks} />
          <Route exact path="/explorar/bebidas" component={ExploreMealsOrDrinks} />
          <Route path="/explorar/comidas/ingredientes" component={ExploreByIngredients} />
          <Route path="/explorar/bebidas/ingredientes" component={ExploreByIngredients} />
          <Route path="/explorar/comidas/area" component={ExploreByArea} />
          <Route exact path="/perfil" component={Profile} />
          <Route path="/receitas-feitas" component={DonePage} />
          <Route path="/receitas-favoritas" component={FavoritePage} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
