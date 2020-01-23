import React, {Component} from "react";
import {Redirect, Route} from "react-router";
import {Router, navigate} from "@reach/router";
import Detail from './Detail.js'

class Gallery extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            imgURLs: [],
            curIMG: '',
            curUnit: '',
            curLen: 0,
            curX1: 0,
            curX2: 0,
            curY1: 0,
            curY2: 0,
            del: ''
        }
    }

    componentDidMount () {
        console.log("Mounting")
        this.setState({curIMG: '', del: ''})
        fetch('/instance', {
            method: 'get'
        }).then(res => {console.log(res); return res.json()} 
        ).then(obj => {
            // console.log(":O "+JSON.stringify(obj))
            console.log(obj.data)
            const arr = obj.data.match(/\'(.*?)\'/g); // JSON.parse(obj.data.replace("'", '"'))
            console.log(arr)
            const a2 = []
            for(let i=0; i<arr.length; i++)
            {
                let strURL = arr[i].replace("'","").replace("'","");
                if(strURL == this.state.del) continue;
                a2.push("/instance/"+strURL)
            }
            this.setState({imgURLs: a2})
        })
    }

    onClick = (e) =>
    {
        console.log("HUH ");
        console.log(e.currentTarget)
        const name = e.currentTarget.querySelector('div').id;
        this.setState({
            curIMG: name
        })
    }

    delIMG = (e)  =>
    {
        e.preventDefault();
        const picId = e.target.id;
        const data = new FormData()
        data.append('filepath', (e.target.id).replace("/instance/", ""))
        console.log(e.target.id)
        fetch('/delete_image', {
            method: 'post',
            body: data
        }).then((res) => 
        {
            console.log("HAH")
            console.log(res)
            return res.json()
        }).then(obj => {
            console.log(obj.data)
            let a2 = this.state.imgURLs;
            for(var i=0; i<a2.length; i++)
            {
                if(a2[i]==picId) {
                    a2.splice(i, 1);
                    break;
                }
            }
            this.setState({curIMG: '', imgURLs: a2})
            navigate('/gallery')
        })
    }

    getData = () => {
        if(!this.state.curIMG) return;
        fetch('/get_image_data/?file='+this.state.curIMG.replace("/instance/", ""), {
            method: 'get',
        }).then((res) => {
            console.log(res);
            return res.json();
        }).then((obj) => {
            var map = JSON.parse(obj.data);
            if(map["ReferenceUnit"]!=="None")
            {
                var map2 = JSON.parse(map["DepthData"])
                this.setState({
                    unit: map["ReferenceUnit"],
                    curX1: map2["x1"],
                    curY1: map2["y1"],
                    curX2: map2["x2"],
                    curY2: map2["y2"],
                    curLen: map2["len"]});
            }


        });
    }

    clearPts = () =>
    {
        this.setState({
            unit: '',
            curX1: 0,
            curX2: 0,
            curY1: 0,
            curY2: 0,
            curLen: 0
        })
    }
    render () 
    {
        if(!this.props.email)
        {
            return <>
                    <Redirect exact to="/"/>
                </>
        }
        else
        {
            console.log("HERE "+this.state.curIMG);
            if(this.state.curIMG)
            {
                return <>
                    <div className="container">
                        <form onSubmit = {this.delIMG} id={this.state.curIMG}>
                            <h2><b>{this.state.curIMG.replace("/instance/", "")}</b></h2>
                            <Detail imgSrc = {this.state.curIMG} 
                                getData={this.getData}
                                x1 = {this.state.curX1}
                                y1 = {this.state.curY1}
                                x2 = {this.state.curX2}
                                y2 = {this.state.curY2}
                                len = {this.state.curLen}
                                unit = {this.state.curUnit}
                                clearPts = {this.clearPts}/> 
                            <button className="regBut" type="submit">Delete Image</button>                          
                        </form>
                    </div>
                </>
            }
            if(this.state.imgURLs)
            {
                const func  = this.onClick;

                return <> 
                    <div className="container">
                        {
                        this.state.imgURLs.map(function(name, index)
                            {
                                const divStyle = {
                                    backgroundImage: 'url('+name+')',
                                };
                                return <div key={index} className="card" onClick={func}>
                                    {/* <img alt="image" src={name}/> */}
                                    <div className="image" id={name} style={divStyle}>
                                    </div>
                                    <div className="container">
                                        <h4><b>{name.replace("/instance/", "")}</b></h4>
                                    </div>
                                </div>;
                            }
                        )
                        }
                    </div>
                </>
            }
            else return <h1> Sup Boiz </h1>;

        }
    }
}

export default Gallery;