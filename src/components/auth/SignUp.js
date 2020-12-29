import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contextAPI/AuthContext';

const SignUp = () => {
  const history = useHistory();
  const { signup } = useAuth();
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const [error, setError] = useState('');
  const [load, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== passConfRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
      history.push('/');
    } catch (err) {
      setError('Failed to create an account');
    }
    setLoading(false);
    return null;
  };

  return (
    <div className='auth'>
      <div className='auth__cnt'>
        <h1>Create an account</h1>
        <form>
          <p className='auth__label'>E-mail</p>
          <input placeholder='Email' type='text' ref={emailRef} />

          <p className='auth__label'>Password</p>
          <input
            placeholder='Password'
            type='password'
            ref={passRef}
          />

          <p className='auth__label'>Confirm password</p>
          <input
            placeholder='Confirm Password'
            type='password'
            ref={passConfRef}
          />

          <p className='auth__error'>{error}</p>

          <button
            type='submit'
            className='auth__action-button'
            onClick={handleSignUp}
            disabled={load}
          >
            Submit
          </button>

          <button
            type='button'
            className='auth__redirect-button'
            onClick={() => history.push('/login')}
          >
            Sign in into your ToDoIst account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
