/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';


const authContext = React.createContext({
  isInitializing: true,
  user: {},
  token: '',
});

export class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    user: PropTypes.object,
  };
  onLogout = (next = '/') => {
    Cookies.set('token', '');
    Cookies.set('user', {});

    window.location.href = next;
  }
  render() {
    const authHelpers = {
      onLogout: this.onLogout,
    };

    return (
      <authContext.Provider value={{ user: this.props.user, authHelpers }}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export default authContext.Consumer;
