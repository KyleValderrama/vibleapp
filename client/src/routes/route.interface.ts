import { AuthParamList } from "./stacks/auth/params";

export interface Route {
  name: keyof AuthParamList;
  component: React.FC<any>;
}
