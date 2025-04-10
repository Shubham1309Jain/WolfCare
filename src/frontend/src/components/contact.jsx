import React from 'react';

/**
 * React component for ContactUs
 * @extends React.Component
 */
class ContactUs extends React.Component {
	/**
	 * Render ContactUs component
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
				<p style={ { marginTop: '2%', fontSize: '20px', marginLeft: '2%', marginRight: '2%' } }>If you would like to get in touch with us, feel free to drop an email to any of the following emails:
					<ul style={ { marginTop: '2%' } }>
						<li>Akash Gupta (agupta57@ncsu.edu)</li>
						<li>Arun Srinivasan P (apartha4@ncsu.edu)</li>
						<li>Nagaraj Madamshetti (nmadams@ncsu.edu)</li>
						<li>Nitesh Mishra (nmishra4@ncsu.edu)</li>
						<li>Sumit Singh (ssingh57@ncsu.edu)</li>
					</ul>
				</p>
			</div>
		);
	}
}

export default ContactUs;
