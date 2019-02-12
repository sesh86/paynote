import React, { Component } from 'react';

import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('login')) this.props.history.push('/notes')      
    this.state = {alert:''};
  }
  onSubmit=(ev)=> {
    ev.preventDefault();
    let login={}
    let currentComponent = this;

    for(let i in ev.target.elements){
      if(ev.target.elements[i].value!==undefined && ev.target.elements[i].value!=="")
      login[ev.target.elements[i].name]=ev.target.elements[i].value;
    }

      axios.post('/login', login)
        .then(function (response) {
          if(response.data!=='Invalid UserName or Password'){
            localStorage.setItem('login', true);
            currentComponent.props.history.push('/notes')
          }
          else
            currentComponent.setState({alert:response.data});
          }
        )
        .catch(function (error) {
          console.log(error);
        });

  }  
  render() {

    return (
      <div className="cat">
      <div className="container">
        <br/>
        <br/>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <div className="container form-group">
          User Name<input type="text" name="userName" required className="form-control"/>
          Password   <input type="Password" name="password"  required  className="form-control"/>
          <br/>
          <div className="alert alert-danger" hidden={this.state.alert==''}>{this.state.alert}</div>
          <button className="form-control btn btn-darkblue">Login</button>
          </div>
        </form>
      </div>
      </div>
)
}
}

export default Login;
