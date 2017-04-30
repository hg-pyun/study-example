import React, { Component } from 'react';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            text : this.props.data.text
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
        this.setState({
            text : 'Client Loaded'
        })
    }
}

export default App