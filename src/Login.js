import React, {Component} from "react";
import {Redirect, Route} from "react-router";

class Login extends Component {
    constructor(props)
    {
        super(props);
    }

    // componentDidMount()
    // {
    //     useEffect(() => {
    //         fetch('/').then(response => {
    //             console.log(response);
    //         })
    //     }, []);
    // }

  /*handleSubmit(e)
    {
        // console.log('hi '+e.target._firstname.value);
        e.preventDefault();
        const data = new FormData(e.target);
        fetch('/login', {
            method: 'post',
            body: data
        }).then((res) => {return res.json()})
        .then(obj => 
        {
            if(obj.data == "Invalid Credentials. Please try again.")
            {
                // Router.
            }
            else if(obj.data == "Great! You are logged in (theoretically).")
            {
                this.setState({email: e.target._email.value})
            }
            else
            {
                
            }
        });

        // }).then((res) => {
        //     console.log(res);
        //     alert('form submitted '+res);
        // }).catch((err) => {
        //     alert(err);
        // });
    }*/

    render()
    {
        let loginHTML = (<>
            <div className="login-form">
                <form onSubmit = {this.props.handleLogin}>
                    <h2 className="text-center">Log in</h2>       
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Username" name='_email' required="required"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" name = '_password' required="required"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
                        <a href="#" className="pull-right">Forgot Password?</a>
                    </div>        
                </form>
                <p className="text-center"><a href="/create_user">Create an Account</a></p>
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
            return loginHTML;
        }
    }
}

export default Login;