import React from "react";
import { Providers } from "./src/providers";
import { Routes } from "./src/routes";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  return (
    <Providers>
      <Routes />
    </Providers>
  );
};

export default App;
