import React from "react";
import { createRootNavigator } from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faCrown,
  faGlobeAsia,
  faPlus,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faCrown, faGlobeAsia, faPlus, faSignOutAlt);

export default class App extends React.Component {
  static navigationOptions = {
    title: "Scavenge"
  };

  constructor(props) {
    super(props);
    this.state = {
      id: 1,
      signedIn: false
    };
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  }
}
