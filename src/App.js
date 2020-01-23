import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav.js';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Register.js';
import Upload from './Upload.js';
import Gallery from './Gallery.js';
import history from './history'

// import {Route, BrowserRouter as Router} from "react-router-dom";
import {Router, navigate} from "@reach/router";
import { withRouter } from 'react-router-dom';

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = {
      email: '',
      fName: '',
      errorMsg: ''
    }
  }

  handleLogin = (e) =>
  {
      // console.log('hi '+e.target._firstname.value);
      e.preventDefault();
      const data = new FormData(e.target);
      const curEmail = e.target._email.value;
      e.target._email.value = e.target._password.value = '';
      fetch('/login', {
          method: 'post',
          body: data
      }).then((res) => { return res.json()})
      .then(obj => 
      {
          if(obj.data === "Invalid Credentials. Please try again.")
          {
              console.log("Unrecognized username password")
              this.setState({errorMsg: 'Invalid Credentials. Please try again.'});
          }
          else if(obj.data === "Great! You are logged in (theoretically)." || obj.data === "You are already logged in (theoretically)!")
          {
              this.setState({email: curEmail, errorMsg: ""})
              console.log("current state according to fetch /login "+this.state.email);
              navigate('/')
              // this.props.history.push('/');
          }
          else
          {
              console.log("fetch /login error "+obj.data+this.state.email);
          }
      });
  }

  handleRegister = (e) =>
  {
      // console.log('hi '+e.target._firstname.value);
      e.preventDefault();
      const data = new FormData(e.target);
      fetch('/create_user', {
          method: 'post',
          body: data
      }).then((res) => {console.log(res.status+" HERE "); return res.json()})
      .then(obj => 
      {
        console.log(obj.data);
        navigate('/gallery')
      })
  }

  handleLogout = () =>
  {
    fetch('/logout', {
      method: 'post'
    }).then((_) => {
      this.setState({email: ''})
      this.setState({fName: ''})
    })
  }

  getUser = () =>
  {
    let bob = fetch('/curUser', {
      method: 'get'
    }).then((res) => {return res.json()})
    .then(obj => 
    {
      console.log(obj + " "+obj.data);
      if(obj && obj.data)
      {
        console.log(obj+"_"+obj.data+" in getuser")
        this.setState({fName: obj.data[1]})
        this.setState({email: obj.data[0]})
      }
      else 
      {
        console.log('reeee');
        this.setState({fName: '', email: ''});
      }
    })

    return bob;
  }

  componentDidMount() {
    console.log("Mounting");
    this.getUser();
  }

  render() {
    return (
      <>
        <Nav email={this.state.email} handleLogout = {this.handleLogout}/>
        <div className="App">
          <header className="App-header">
            <Router className="main" history={history}>
              <Home path="/" fName = {this.state.fName} email = {this.state.email}/>
              <Login path="/login" handleLogin={this.handleLogin} email={this.state.email} errorMsg={this.state.errorMsg}/> 
              <Register path="/create_user" handleRegister={this.handleRegister} email = {this.state.email}/>
              <Upload path="/upload_file" email={this.state.email} />
              <Gallery path="/gallery" email={this.state.email} />
              {/* <NotFound default /> */}
            </Router>
          </header>
        </div>
      </>
    );
  }
}

export default withRouter(App);
