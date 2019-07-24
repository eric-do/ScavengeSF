import React from 'react';
import { createRootNavigator } from './router';
import firebase from './firebase';

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

  componentDidMount() {
  
  }

  render() {
    const { signedIn } = this.state;
    const Layout = createRootNavigator(signedIn);
    return <Layout />;
  };
}