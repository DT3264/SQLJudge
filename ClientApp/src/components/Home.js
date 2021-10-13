import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;


  componentDidMount(){
    document.title = "SQL Judge"
  }

  render () {
    return (
      <div>
        <h1>Bienvenido al SQL Judge</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sollicitudin maximus sapien eu gravida. 
            Phasellus posuere, elit a blandit luctus, neque ante egestas turpis, eu malesuada mauris tortor quis enim. 
            Maecenas quis nulla non ligula accumsan lacinia. Mauris venenatis tincidunt enim vel pulvinar.
        </p>
      </div>
    );
  }
}
