import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contextAPI/AuthContext';

const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState('');
  const [load, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passRef.current.value);
      history.push('/');
    } catch (err) {
      setError('Failed to login');
    }
    setLoading(false);
  };
  return (
    <div className='auth'>
      <div className='auth__cnt'>
        <h1>Sign in</h1>
        <form>
          <p className='auth__label'>E-mail</p>
          <input type='text' ref={emailRef} />

          <p className='auth__label'>Password</p>
          <input type='password' ref={passRef} />

          <p className='auth__error'>{error}</p>

          <button
            type='submit'
            className='auth__action-button'
            onClick={handleLogin}
            disabled={load}
          >
            Sign in
          </button>

          <button
            type='button'
            className='auth__redirect-button'
            onClick={() => history.push('/signup')}
          >
            Create ToDoIst Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
