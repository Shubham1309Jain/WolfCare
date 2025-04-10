import React from 'react';
import { Spinner } from 'reactstrap';

/**
 * React component for login
 * @extends React.Component
 */
class LoginUser extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			email: '',
			pass: '',
			loading: false
		};
	}

	/**
	 * Update state with user entered values
	 * @param {Object} event Event sent for onChange event
	 */
	handleInput = (event) => {
		if (event.type === 'change') {
			if (event.target) {
				this.setState({
					[ event.target.id ]: event.target.value
				});
			}
		}
	};

	/**
	 * Validate input values and call onSubmitLogin API to authenticate the user
	 * @param {Object} event Button click event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async (event) => {
		const keys = [ 'email', 'pass' ];
		for (let i = 0; i < keys.length; i++) {
			if (this.state[ keys[ i ] ] === '') return false;
		}
		event.preventDefault();
		const emailRegex = new RegExp('\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})');
		if (!this.state.email.match(emailRegex)) {
			alert('Email format not correct. Enter email in correct format');
			return false;
		}
		if (Object.keys(this.props.parentProps).length > 0) {
			const apiInput = {
				email: this.state.email,
				pass: this.state.pass
			};
			this.setState({
				loading: true
			});
			await this.props.parentProps.onSubmitLogin(apiInput);
			if (this.props.parentProps.loginApiStatus) {
				this.setState({
					loading: false
				});
				this.props.setLoginClicked(false);
				location.reload();
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.loginApiMessage || 'Invalid email or password. Enter correct email and password, and try again.');
				return false;
			}
		}
		return false;
	};

	/**
	 * Render Login component
	 * @returns {React.Component} Form with login related HTML tags
	 */
	render() {
		return (
			<section>
				<div className='signin-content'>
					<div className='signin-image'>
						<figure><img src='../signin-image.jpg' alt='sign in' /></figure>
					</div>
					<div className='signin-form'>
						<form className='register-form' id='login-form'>
							<div className='form-group'>
								<img src='../signup-email.png' alt='signin email' />
								<input autoFocus type='email' name='email' id='email' placeholder='Your Email' value={ this.state.email } onChange={ this.handleInput } required />
							</div>
							<div className='form-group'>
								<img src='../signup-pass.png' alt='signin password' />
								<input type='password' name='pass' id='pass' placeholder='Password' value={ this.state.pass } onChange={ this.handleInput } required />
							</div>
							<div className='form-group form-button'>
								{ this.state.loading ? <Spinner /> : <input type='submit' onClick={ this.handleSubmit } name='signin' id='signin' className='form-submit' value='Log in' /> }
							</div>
						</form>
					</div>
				</div>
			</section>
		);
	}
}

export default LoginUser;
