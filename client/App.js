import React, { Component } from 'react';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            text : 'Server-Side Rendering'
        }
    }

    render() {
        return (
        <div>
            <h1>{this.state.text}</h1>
        </div>
        );
    }

    componentDidMount(){

    }
}

export default App