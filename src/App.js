import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { auth } from './firebase';
import {
  useStateValue,
  StateProvider,
} from './contextAPI/StateProvider';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Main from './components/Main';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contextAPI/AuthContext';
import reducer, { initialState } from './contextAPI/reducer';

const App = () => (
  <Router>
    <AuthProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Switch>
          <PrivateRoute exact path='/' component={Main} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
        </Switch>
      </StateProvider>
    </AuthProvider>
  </Router>
);

export default App;
