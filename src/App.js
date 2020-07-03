import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import DrinksPrincipalPage from './pages/DrinksPrincipalPage';
import MealsPrincipalPage from './pages/MealsPrincipalPage';
import Profile from './pages/Profile';
import Test from './pages/Test';
import './styles/App.css';

function App() {
  return (
    <div id="meals" className="meals">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/comidas" component={MealsPrincipalPage} />
          <Route exact path="/bebidas" component={DrinksPrincipalPage} />
          <Route exact path="/comidas/:id" component={Test} />
          <Route exact path="/bebidas/:id" component={Test} />
          <Route path="/comidas/:id/in-progress">{}</Route>
          <Route path="/bebidas/:id/in-progress">{}</Route>
          <Route path="/explorar" component={Test} />
          <Route path="/explorar/comidas">{}</Route>
          <Route path="/explorar/bebidas">{}</Route>
          <Route path="/explorar/comidas/ingredientes">{}</Route>
          <Route path="/explorar/bebidas/ingredientes">{}</Route>
          <Route path="/explorar/comidas/area">{}</Route>
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
