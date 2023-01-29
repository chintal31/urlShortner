import React from "react";

import Header from "./header";
import Hero from "./hero";
import Main from "./main";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <Hero />
      <Main />
    </React.Fragment>
  );
}
