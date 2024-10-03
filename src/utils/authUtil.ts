import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  username: string;
  email: string;
}

export const decodeToken = (token: string): DecodedToken => {
  return jwtDecode(token) as DecodedToken;
};
