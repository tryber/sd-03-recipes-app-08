import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainFoodPagePV from './pages/MainFoodPagePV';


function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
          <Route exact path to="/" component={Login} />
          <Route path to="/comidas" component={MainFoodPagePV} />
          {/* <Route to="/bebidas">{}</Route>
          <Route to="/comidas/:id">{}</Route>
          <Route to="/bebidas/:id">{}</Route>
          <Route to="/comidas/:id/in-progress">{}</Route>
          <Route to="/bebidas/:id/in-progress">{}</Route>
          <Route to="/explorar">{}</Route>
          <Route to="/explorar/comidas">{}</Route>
          <Route to="/explorar/bebidas">{}</Route>
          <Route to="/explorar/comidas/ingredientes">{}</Route>
          <Route to="/explorar/bebidas/ingredientes">{}</Route>
          <Route to="/explorar/comidas/area">{}</Route>
          <Route to="/perfil">{}</Route>
          <Route to="/receitas-feitas">{}</Route>
          <Route to="/receitas-favoritas">{}</Route>
          <Route to="*">{}</Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
