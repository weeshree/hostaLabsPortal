import React, {Component} from 'react';
import { render } from '@testing-library/react';
import {Redirect, Route} from "react-router";

import Step1 from './Step1.js'
import Step3_1 from './Step3_1.js'
import Step3_2 from './Step3_2.js'
import Step2 from './Step2.js'

import {Router, navigate} from "@reach/router";

class Upload extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            curStep: 1,
            type: 0,
            imgURL: '',
            imgName: ''
        }
    }

    componentDidMount() {
        this.getDefaultName().then((name) =>
            this.setState({imgName: name, curStep: 1, type: 0, imgURL: ''}))
    }

    async getDefaultName() {
        let promise = fetch('/get_next_id', {
            method: 'get',
        })

        let res = await promise;

        let promise2 = res.json();

        let obj = await promise2;
        console.log(obj+" "+obj.data);
        return obj.data;
    }

    _next = (e) => {
        let x = this.state.curStep;
        this.setState({curStep: x+1})
    }

    _prev = (e) => {
        let x = this.state.curStep;
        this.setState({curStep: x-1})
    }

    addButton = () => {
        console.log("ADD BUTTON "+this.state.curStep)
        if(this.state.curStep===3)
        {
            return (<>
                <button
                className = "prevBut"
                type = "button" onClick={this._prev}>
                    Previous
                </button>
                <button
                className = "subBut"
                type = "button" type="submit" form="step3Form">
                    Submit
                </button>
                </>
                )
        }
        else if(this.state.curStep==1)
        {
            return (
                <button
                className = "nextBut"
                type = "button" onClick={this._next}>
                    Next
                </button>
            )
        }
        else if(this.state.curStep==2)
        {
            return (<>
                <button
                className = "prevBut"
                type = "button" onClick={this._prev}>
                    Previous
                </button>
                <button
                className = "nextBut"
                type = "button" onClick={this._next}>
                    Next
                </button>
                </>
                )
        }
    }

    onChange = (e) => {
        if(e.target.value === "1")
        {
            this.setState({type: 1})
        }
        else if(e.target.value === "2")
        {
            this.setState({type: 2})
        }
        else 
        {
            this.setState({imgName: e.target.value})
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("YO "+e.target.id+" "+this.state.curStep+" "+this.state.type)
        if(this.state.type==2 && this.state.curStep==3)
        {
            if(e.target.querySelector('input').files.length==0) return;
            const data = new FormData()
            data.append('picture', e.target.querySelector('input').files[0])
            data.append('name', this.state.imgName)
            console.log(this.state.imgName+" AHSOAHOSA")
            fetch('/upload_file', {
                method: 'post',
                body: data
            }).then((res) => 
            {
                var uploadImg = res;
                console.log(uploadImg)
                this.setState({imgURL: uploadImg.url})
                navigate('/')
            })
            /*{return res.json()})
            .then(obj => 
            {
                console.log(obj.data)
                var uploadImg = new Image();
                uploadImg.src = obj.data;
                document.body.appendChild(uploadImg);
            });*/
        }
        else if(this.state.type==1 && this.state.curStep==3)
        {
            const data = new FormData()
            const strin = e.target.querySelector('input').value
            console.log(strin)
            if(!strin) return;
            fetch('/save_images_from_url?url='+strin+'&name='+this.state.imgName, {
                method: 'get',
            }).then((res) => 
            {
                var urlImg = res;
                this.setState({imgURL: urlImg.url})
                console.log("Skrrt")
                navigate('/')
            })
        }
    }

    render()
    {
        let uploadHTML = <div className="uploadForm container">
            <h1> Image Upload </h1>
            <br/>
            <Step1 curStep={this.state.curStep} onChange = {this.onChange}/>
            <Step2 curStep={this.state.curStep} imgName={this.state.imgName} onChange={this.onChange}/>
            <Step3_1 curStep={this.state.curStep} type={this.state.type} onSubmit={this.onSubmit}/>
            <Step3_2 curStep={this.state.curStep} type={this.state.type} onSubmit={this.onSubmit}/>
            <hr/>
            {this.addButton()}
        </div>
        if(!this.props.email)
        {
            return <>
                    <Redirect exact to="/"/>
                </>
        }
        else
        {
            return uploadHTML;
        }

    }
}

export default Upload;