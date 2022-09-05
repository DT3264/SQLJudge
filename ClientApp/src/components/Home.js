import React, { Component } from "react";

export class Home extends Component {
  static displayName = Home.name;

  componentDidMount() {
    document.title = "SQL Judge";
  }

  render() {
    return (
      <div>
        <h1>Bienvenido al SQL Judge</h1>
      </div>
    );
  }
}
