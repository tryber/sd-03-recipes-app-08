import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const memoryEmail = JSON.parse(localStorage.getItem('email'));

const emailInput = (userInfo, setUserInfo, handleChange) => {
  const { email } = userInfo;
  if (memoryEmail && email !== memoryEmail) {
    return setUserInfo({ ...userInfo, email: memoryEmail });
  }
  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        id="email"
        onChange={(event) => handleChange(event, setUserInfo, userInfo)}
        value={email}
        placeholder={memoryEmail ? email : 'email'}
        className="email-input"
      />
    </div>
  );
};

const passwordInput = (userInfo, handleChange) => {
  const { password } = userInfo;
  return (
    <div>
      <input
        type="password"
        data-testid="password-input"
        id="password"
        onChange={(e) => handleChange(e)}
        value={password}
        placeholder="senha"
        className="password-input"
      />
    </div>
  );
};

const enterButton = (userInfo, clickToEnter, isDisabled) => (
  <Link to="/comidas">
    <button
      type="button"
      className="login-submit-btn"
      data-testid="login-submit-btn"
      onClick={() => clickToEnter(userInfo)}
      disabled={isDisabled(userInfo)}
    >
      Entrar
    </button>
  </Link>
);

function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserInfo({ ...userInfo, [id]: value });
  };

  const clickToEnter = () => {
    const { email } = userInfo;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const isDisabled = () => {
    const { password, email } = userInfo;
    const emailTest = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (password.length > 6 && email.match(emailTest)) return false;
    return true;
  };

  return (
    <main>
      <h1 className="Login">Login</h1>
      {emailInput(userInfo, setUserInfo, handleChange)}
      {passwordInput(userInfo, handleChange)}
      {enterButton(userInfo, clickToEnter, isDisabled)}
    </main>
  );
}

export default Login;
