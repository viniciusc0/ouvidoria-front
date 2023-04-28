
// ----------------------------------------------------------------------

import { Dispatch } from "react";
import { ActionsType } from "./JwtContext";

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
};


export type JWTContextType = {
  dispatch: Dispatch<ActionsType>
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  loginUser: (data: any) => void;
  registerUser: (data: any) => void;
  logoutUser: () => void;
};


