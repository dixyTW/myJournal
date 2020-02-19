import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { Nav,  Navbar} from "react-bootstrap";
import Routes from "./Routes";
import PropTypes from 'prop-types';
import { loadUser } from './actions/authActions'
import { connect } from 'react-redux';
import Logout from './Logout';
import './app.css'
/*
Problems/ or Problems to be checked
1. Homepage UI
4. set up loading screen
5. Login/Register spacing
*/
class App extends Component {


  componentDidMount() {
    this.props.loadUser()
  }

	static propTypes = {
		loadUser: PropTypes.func.isRequired
	  };

  render() {
    const {isAuthenticated, user} = this.props.auth;
    const authLinks = (
      <Fragment>
        
        <Navbar.Brand ><Link to="/">myJournal</Link></Navbar.Brand>
        <Nav className="ml-auto"> 
        <Logout />
        <strong>{user ? `Welcome ${user.firstName}` : ''}</strong>
        
        </Nav>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Navbar.Brand ><Link to="/">myJournal</Link></Navbar.Brand>
          <Nav className="ml-auto">
              <Link to="/login"><div className='link'>Login</div> </Link>
              <Link to="/register">Register</Link>
          </Nav>
      </Fragment>
    )

    return(
      <div >
          <Navbar bg="light" expand="lg">
            
            {isAuthenticated? authLinks : guestLinks}
            
          </Navbar>
          <Routes />
      </div>
    )
    
  }
}

const mapStatetoProps = state => ({
  auth: state.auth
})

export default connect(mapStatetoProps, {loadUser})(App);
