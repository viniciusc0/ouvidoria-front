import { createContext, useEffect, useReducer, useCallback } from 'react';
// utils
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType } from './types';
import Cookies from 'js-cookie';
import { userInfo } from 'services/requests/user/userInfo';
import { login } from 'services/requests/usersAuth/login';
import { useRouter } from 'next/router';
import { LoginRegisterResponseProps } from 'services/requests/usersAuth/types';
import { UserInfo } from 'services/requests/user/types';
import { register } from 'services/requests/usersAuth/register';


export enum AuthTypes {
  INITIAL = 'INITIAL',
  LOGOUT = 'LOGOUT',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

type Payload = {
  [AuthTypes.INITIAL]: {
    isAuthenticated: boolean;
    user: UserInfo | null;
  };
  [AuthTypes.LOGIN]: {
    user: LoginRegisterResponseProps | null;
  };
  [AuthTypes.REGISTER]: {
    user: LoginRegisterResponseProps | null;
  };
  [AuthTypes.LOGOUT]: undefined;
};

export type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------




const reducer = (state: AuthStateType, action: ActionsType) => {

  switch (action.type) {
    case AuthTypes.INITIAL:
      return {
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    case AuthTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AuthTypes.REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case AuthTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default: return state;
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const token = typeof window !== 'undefined' ? Cookies.get('token') : undefined;

      if (token) {
        const response = await userInfo();

        if (response != undefined) {
          const user = response;
          dispatch({
            type: AuthTypes.INITIAL,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        }
      } else {
        dispatch({
          type: AuthTypes.INITIAL,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: AuthTypes.INITIAL,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const router = useRouter();

  async function loginUser(data: any) {
    const response = await login(data);
    if (response != undefined) {
      Cookies.set("token", response?.jwt, { expires: 2 });

      dispatch({
        type: AuthTypes.LOGIN,
        payload: {
          user: response
        }
      });
      router.push('/');
    }
  }

  async function registerUser(data: any) {
    const response = await register(data);
    if (response != undefined) {
      Cookies.set("token", response?.jwt, { expires: 2 });

      dispatch({
        type: AuthTypes.REGISTER,
        payload: {
          user: response
        }
      });
      router.push('/');
    }
  }

  async function logoutUser() {
    Cookies.remove("token");
    dispatch({
      type: AuthTypes.LOGOUT,
    });
  }


  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
        registerUser,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
