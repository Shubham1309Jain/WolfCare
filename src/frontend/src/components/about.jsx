import React from 'react';
import { Button } from 'antd';

/**
 * React component for AboutUs
 * @extends React.Component
 */
class AboutUs extends React.Component {
	/**
	 * Render AboutUs component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		return (
			<div>
				<a href='/home' style={ { float: 'right', marginRight: '40%' } }>
					<img style={ { height: '150px', width: '150px', position: 'relative', float: 'left', marginTop: '0.5em' } } src='../wolf.png' alt='wolf'></img>
					<b style={ { color: 'black', marginLeft: '0.5em', float: 'left', fontSize: '50px', marginTop: '0.5em' } }>WOLF</b><b style={ { color: 'red', float: 'left', fontSize: '50px', marginTop: '0.5em' } }>CARE</b>
					<br></br>
					<p style={ { color: 'black', float: 'left', fontSize: '25px', marginLeft: '2em' } }>Your pocket doctor</p>
				</a>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<h3 style={ { textAlign: 'center' } }>Online Doctor Appointment and Symptoms Checker</h3>
				<p style={ { marginTop: '2%', fontSize: '20px', marginLeft: '2%', marginRight: '2%' } }>
					WolfCare is an online application that manages the health portfolio of the patient and provides doctors assistance through an online portal. A virtual doctor appointment booking system overrides
					the problems of booking an appointment manually. It is convenient, helps in better resource management and aids in syncing of calender schedules. This project provides a platform for the users to
					create an account, search for doctors at a given location, view the doctors background and book appointments. Additionally, we have included a symptoms check where users can add or test report
					values and view the results of a medical condition.
				</p>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '10%' } } onClick={ () => this.props.redirectToPath('/home/doctors') }><p style={ { float: 'left', marginTop: '0.5em' } }>Book appointment</p></Button>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '5%' } } onClick={ () => this.props.redirectToPath('/home/doctors') }><p style={ { float: 'left', marginTop: '0.5em' } }>Find doctor</p></Button>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '5%' } } onClick={ () => this.props.redirectToPath('/home/hospitals') }><p style={ { float: 'left', marginTop: '0.5em' } }>Find hospital</p></Button>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '5%' } } onClick={ () => this.props.redirectToPath('/home/symptoms') }><p style={ { float: 'left', marginTop: '0.5em' } }>Check symptoms</p></Button>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '5%' } } onClick={ () => this.props.setRegisterClicked(true, true) }><p style={ { float: 'left', marginTop: '0.5em' } }>Join as Doctor</p></Button>
				<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '2%', marginLeft: '5%' } } onClick={ () => this.props.setRegisterClicked(true, true) }><p style={ { float: 'left', marginTop: '0.5em' } }>Add hospital</p></Button>
			</div>
		);
	}
}

export default AboutUs;
