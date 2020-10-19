import React, { useState, useRef } from 'react';
import { auth } from '../../firebase';

const SignUp = () => {
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
      await auth.createUserWithEmailAndPassword(
        emailRef.current.value,
        passRef.current.value,
      );
    } catch (err) {
      setError('Failed to create an account');
    }
    setLoading(false);
  };
  return (
    <div className='hello'>
      <form onSubmit={handleSignUp}></form>
    </div>
  );
};
