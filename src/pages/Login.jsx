import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const memoryEmail = JSON.parse(localStorage.getItem('email'));

function Login() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.id]: e.target.value });
  };

  const emailInput = () => {
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
          onChange={(e) => handleChange(e)}
          value={email}
          placeholder={memoryEmail ? email : 'email'}
          className="email-input"
        />
      </div>
    );
  };

  const passwordInput = () => {
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

  const enterButton = () => (
    <Link to="/comidas">
      <button
        type="button"
        className="login-submit-btn"
        data-testid="login-submit-btn"
        onClick={() => clickToEnter()}
        disabled={isDisabled()}
      >
        Entrar
      </button>
    </Link>
  );

  return (
    <div>
      <h1 className="Login">Login</h1>
      {emailInput()}
      {passwordInput()}
      {enterButton()}
    </div>
  );
}

export default Login;
