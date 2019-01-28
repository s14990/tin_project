import React from 'react';
import { Link } from "react-router-dom";

class NavBarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.loginbuttons=this.loginbuttons.bind(this);
    }

loginbuttons(){
    if(!this.props.user_loged_in){
        return <div>
                <Link className="buttons" to={'/login'}>Log in</Link>
                <Link className="buttons" to={'/register'}>Register</Link>
               </div>
    }
    else
    return <button className="buttons" type="button" onClick={() => this.props.handle_logout()}>Log Out</button>
} 
  render() {

    let buttons=this.loginbuttons();

    return (
        <div className="top">
        <h2 className="banner">System Apteka</h2>
        <div className="user-login">
        <p>{this.props.user_name}</p>
        {buttons}
        </div>
        <nav className="navbar">
        <li className="navbar-item">
            <Link to={'/'}>Home</Link>
        </li>
        <li className="navbar-item">
            <Link to={'med'}>Medicine</Link>
        </li>
        <li className="navbar-item">
            <Link to={'/ingr'}>Ingredients</Link>
        </li>
        <li className="navbar-item">
            <Link to={'/rec'}>Receipts</Link>
        </li>
        <li className="navbar-item">
            <Link to={'/storage'}>Storage</Link>
        </li>
        <li className="navbar-item">
            <Link to={'/order'}>Order</Link>
        </li>
        <li className="navbar-item"> 
            <Link to={'/users'}>Users</Link>
        </li>
        </nav>
        </div>
    );
  }
}

export default NavBarComponent;