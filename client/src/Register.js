import React, {Component} from 'react'
import {Form, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { registerUser } from './actions/authActions';
import { clearErrors } from './actions/errorActions'

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstName: "",
			lastName: "",
			email: "test",
			password: "",
			msg: "this is cool"
		}
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this)


	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		registerUser: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	  };

	  componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
		  // Check for register error
		  if (error.id === 'REGISTER_FAIL') {
			this.setState({ msg: error.msg.msg });
		  } else {
			this.setState({ msg: null });
		  }
		}
		if (isAuthenticated) {
			this.props.history.push("/")
		}
	  }

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	

	handleSubmit(event) {
		event.preventDefault();
		const {firstName, lastName, email, password} = this.state
		const newUser = {
			firstName,
			lastName,
			email,
			password
		}
		this.props.registerUser(newUser);
		
	}

	render() {
		return(
			<div className="center">
			<Form>
			<Form.Group controlId="formFName"> 
			 <Form.Label>First Name</Form.Label>
   			 <Form.Control name="firstName" onChange={this.onChange}/>
   			</Form.Group>
   			<Form.Group controlId="formLName"> 
			 <Form.Label>Last Name</Form.Label>
   			 <Form.Control name="lastName" onChange={this.onChange}/>
   			</Form.Group>
		  <Form.Group controlId="formBasicEmail">
		    <Form.Label>Email</Form.Label>
		    <Form.Control placeholder="Enter email" name="email" onChange={this.onChange}/>
		  </Form.Group>
		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Password</Form.Label>
		    <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange} />
		  </Form.Group>
		  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
		    Create Account
		  </Button>
		</Form>
		</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
})

export default connect(
	mapStateToProps,
	{ registerUser, clearErrors}
)(Register)