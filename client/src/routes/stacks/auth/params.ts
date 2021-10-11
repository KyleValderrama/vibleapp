import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthProps<T extends keyof AuthParamList> = {
  navigation: NativeStackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
