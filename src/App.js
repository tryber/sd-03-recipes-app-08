import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <div id="meals">
      <Router>
        <Switch>
          <Route to="/">{}</Route>
          <Route to="/comidas">{}</Route>
          <Route to="/bebidas">{}</Route>
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
          <Route to="*">{}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
