import React, {Component} from 'react'
import Dot from './Dot.js'
class Detail extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0,
            unit: '',
            pX: 0.0,
            pY: 0.0,
            len: 0,
            dots: 0
        }
    }

    addPt = (e) =>
    {
        console.log(e.pageX+" "+e.target.offsetLeft)
        var x = e.pageX - e.target.offsetLeft;
        var y = e.pageY - e.target.offsetTop;
        console.log("Adding "+x+", "+y+" with "+this.state.dots+" already added")
        if(this.state.dots==0) 
            this.setState({x1: e.pageX, y1: e.pageY, dots: 1})
        else if(this.state.dots==1)
            this.setState({x2: e.pageX, y2: e.pageY, dots: 2})
    }

    getOffset = () =>
    {

    }

    clearPts = (e) =>
    {
        console.log("Clearing points")
        this.setState({x1:0, y1:0, x2:0, y2:0, dots:0})
        this.props.clearPts();
    }

    componentDidMount()
    {
        console.log("Mounting Detail.js")
        this.props.getData();

        if(this.props.unit)
        {
            this.setState({
                x1: this.props.x1,
                x2: this.props.x2,
                y1: this.props.y1,
                y2: this.props.y2,
                unit: this.props.unit,
                len: this.props.len,
                dots: 2
            });
        }
        else this.clearPts();
    }

    render()
    {
        
        if(this.state.dots==2)
        {
            return <>
                <h4>Click on any two points in image to start. </h4>
                <img onClick={this.addPt} src={this.props.imgSrc} className="bigIMG"></img>
                <Dot x={this.state.x1} y={this.state.y1}></Dot>
                <Dot x={this.state.x2} y={this.state.y2}></Dot>
                <label>Length: <input type="number"/></label>
                <select>
                    <option value="cm">cm</option>
                    <option value="in">in</option>
                </select>
                <br/>
                <button className = "regBut" onClick={this.clearPts}>Clear Points</button>
            </>
        }
        else
        {
            return <>
                <h4>Click on any two points in image to start. </h4>
                <img onClick={this.addPt} src={this.props.imgSrc} className="bigIMG"></img>
                <Dot x={this.state.x1} y={this.state.y1}></Dot>
                <Dot x={this.state.x2} y={this.state.y2}></Dot>
            </>
        }
    }
}

export default Detail;