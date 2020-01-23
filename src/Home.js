import React, {Component} from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render()
    {
        // return <h1> Hosta Labs Portal </h1>
        console.log(this.props.fName+" O")
        return this.props.fName ? (
            <>
            <h1> Hosta Labs Portal </h1>
            <p>Welcome {this.props.fName}</p>
            </>
        ) : (
            <h1> Hosta Labs Portal </h1>
        );
    }
}

export default Home;