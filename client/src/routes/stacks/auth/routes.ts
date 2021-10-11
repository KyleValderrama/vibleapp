import { Login, Register } from "../../../modules/auth";
import { Route } from "../../route.interface";

export const AuthRoutes: Route[] = [
  { name: "Login", component: Login },
  { name: "Register", component: Register },
];
