import React, {Component} from 'react';
import { Button, Form } from "react-bootstrap";
import './login.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {login} from './actions/authActions'
import { clearErrors } from './actions/errorActions'

class Login extends Component {
	constructor(props) {
		super(props)


		this.state = {
			email: "",
			password: ""
		}

		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	  };

	  componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
		  // Check for register error
		  if (error.id === 'LOGIN_FAIL') {
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
		const {email, password} = this.state
		const user = {
			email,
			password
		}
		this.props.login(user);
	} 

render() {
	return (
		<div className="center">
			<Form>
		  <Form.Group controlId="formBasicEmail">
		    <Form.Label>Email</Form.Label>
		    <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.onChange}/>
		  </Form.Group>

		  <Form.Group controlId="formBasicPassword">
		    <Form.Label>Password</Form.Label>
		    <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange}/>
		  </Form.Group>
		  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
		    Submit
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

export default connect(mapStateToProps,{ login, clearErrors})(Login)