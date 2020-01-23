import React, {Component} from 'react';

class Dot extends Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        var divStyle = {
            position: 'absolute',
            top: this.props.y+'px',
            left: this.props.x+'px',
            width: '3px',
            height: '3px',
            backgroundColor: 'red'
        }
        return <div style={divStyle}></div>
    }
}

export default Dot;