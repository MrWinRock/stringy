import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  userId: number;
  username: string;
  email: string;
}

export const decodeToken = (token: string): DecodedToken => {
  const decoded = jwtDecode<any>(token);
  return {
    userId: decoded.id,
    username: decoded.username,
    email: decoded.email,
  };
};
