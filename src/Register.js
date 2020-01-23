import React, {Component, useEffect} from "react";
import {Redirect, Route} from "react-router";


class Register extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            formFields: []
        }
    }

    // componentDidMount()
    // {
    //     useEffect(() => {
    //         fetch('/').then(response => {
    //             console.log(response);
    //         })
    //     }, []);
    // }

    /*inputChangeHandler(e) {
        let formFields = this.state.formFields;
        formFields[e.target.name] = e.target.value;
        this.setStaet({
            formFields
        });
    }*/
/*
            user_json['_firstname'] = request.form["_firstname"]
            user_json['_lastname'] = request.form["_lastname"]
            user_json['_password'] = request.form["_password"]
            user_json['_email'] = request.form["_email"]
            user_json['_api_key'] = 'test'
            user_json['_firstname'] = request.form["_firstname"]
            */


    render()
    {
        let registerHTML = (<>
            <div className="login-form">
                <form onSubmit = {this.props.handleRegister}>
                    <h2 className="text-center">Register</h2>       
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="First Name" name='_firstname' required="required"/>
                    </div>                    
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last Name" name='_lastname' required="required"/>
                    </div>                        
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" name='_email' required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" name = '_password' required="required"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                    </div>     
                </form>
            </div>
        </>);

    if(this.props.email)
    {
        return <>
                <Redirect exact to="/"/>
            </>
    }
    else
    {
        return registerHTML;
    }
    }
}

export default Register;