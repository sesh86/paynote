import React from 'react';
import {Link , NavLink,withRouter} from 'react-router-dom';

const logout=(props)=>{
    localStorage.removeItem("login");
    props.history.push('/login');
}
const NavBar=(props)=>{
  return <nav className="navbar navbar-expand-sm navbar-dark bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/"><span className="logo1">Pay</span><span className="logo2">Notes</span></Link>
          <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            {/* {localStorage.getItem("login")?
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link btn" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link btn" to="/Timer">Dashboards</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink className="nav-link btn" to="/Todo">Reports</NavLink>
                  </li>
              </ul>:''} */}
            </div>
            {localStorage.getItem("login")?<button className="btn btn-logout" onClick={()=>logout(props)}>Logout</button>:''}
          </div>
          
    </nav>
}
export default withRouter(NavBar);
