import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies();

type userData = {
  username: string,
  email: string,
  firstname: string,
  lastname: string
}

type ContextType = {
  userData: userData,
  setUserData: (user: userData) => void;
};

export const UserContext = createContext<ContextType>({
  userData: {
    username: '',
    email: '',
    firstname: '',
    lastname: ''
  },

  setUserData: (userData: userData) => {}
});

type providerProps = {
  children: React.ReactNode;
};

const UserProvider: React.FC<providerProps> = ({ children }) => {
  // This is the exact same logic that we previously had in our hook
  const [userData, setUserData] = useState({ username: '', email: '', firstname: '', lastname: '' });
  const [ isLogged, setIslogged ] = useState(cookies.get('mibarrio_user'));

  useEffect(() => {
    if (isLogged && userData.username === '') {
      setIslogged(cookies.get('mibarrio_user'));

      const options = {
        method: 'GET',
        withCredentials: true,
        url: 'https://apo.ocuba.net/auth/myaccount'
      };

      fetch('https://apo.ocuba.net/auth/myaccount', {
        method: 'GET',
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        if (data.error) {
          throw new Error(data.error)
        }

        const { email, username, "custom:role": role } = data;

        setUserData({
          ...userData,
          email,
          username,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // axios(options)
      // .then(function (resp) {
      //     console.log(resp)
      //     const { email, username, "custom:role": role } = resp.data;
      //     cookies.set('vrc_user', username );

      //     setUserData({
      //       ...userData,
      //       email,
      //       username,
      //     });
      // })
      // .catch(function (error) {
      //   console.log('catch');
      //   console.log(error)
      // });
    }

  }, [isLogged])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );

};

export default UserProvider;