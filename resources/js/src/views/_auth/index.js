import React, {useReducer} from 'react';

export const AuthContext = React.createContext();

const initialState = {
  login: false,
  user: {},
}

const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN': {
      return {login: true, user: action.payload}
    }
    case 'LOGOUT': {
      return {login: false, user: null}
    }
    default:
      return state;
  }
}

const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = {
    state: state,
    handleLogin: data => dispatch({type: 'LOGIN', payload: data}),
    handleLogout: () => dispatch({type: 'LOGOUT'}),
  }

  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 

export default AuthProvider;
