import React from 'react';
import { Avatar, Button, Dropdown, Layout, Menu, Modal } from 'antd';
import {
	CalendarOutlined,
	CheckCircleOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	MedicineBoxOutlined,
	PlusSquareOutlined,
	PhoneOutlined,
	UserOutlined
} from '@ant-design/icons';
import LoginUser from './login';
import RegisterUser from './register';
import MainPage from './main';
import DoctorsList from './doctorsList';
import HospitalsList from './hospitalsList';
import AppointmentsList from './appointmentsList';
import SymptomsChecker from './symptomsChecker';
import AboutUs from './about';
import ContactUs from './contact';
import AdminRequests from './adminRequests';


/**
 * React component for Home
 * @extends React.Component
 */
class Home extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			tab: '',
			userLogonDetails: {},
			isLoginClicked: false,
			isRegisterClicked: false,
			userType: props.userType || 'patient',
			isProfileViewClicked: false
		};
	}

	/**
	 * React lifecycle method to route to correct tab on the home page
	 */
	componentDidMount() {
		const userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
		this.setState({
			userLogonDetails: userLogonDetails || {},
		});
		if (this.state.userLogonDetails.userType) {
			this.setState({ userType: this.state.userLogonDetails.userType });
		}
		const url = new URL(document.location.href);
		const pathWithoutHome = url.pathname.split('/')[ 2 ];
		if (url.pathname === '/') {
			this.redirectToPath('/home');
		} else if (url.pathname === '/home') {
			this.setState({
				tab: 'home'
			});
		} else {
			const paths = [ 'doctors', 'hospitals', 'appointments', 'symptoms', 'about', 'contact', 'requests' ];
			if (paths.includes(pathWithoutHome)) {
				this.setState({
					tab: pathWithoutHome
				});
			}
		}
	}

	/**
	 * Redirect to specified path
	 * @param {String} path Path to redirect
	 */
	redirectToPath = (value) => {
		const url = new URL(document.location.href);
		document.location.href = `${url.origin}${value}`;
	};

	/**
	 * Set state to show login model
	 * @param {Boolean} val True/False to view or not view modal
	 */
	setLoginClicked = (val) => {
		const userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
		this.setState({
			userLogonDetails: userLogonDetails || {},
			isLoginClicked: val
		});
	};

	/**
	 * Set state to show register model
	 * @param {Boolean} val True/False to view or not view modal
	 */
	setRegisterClicked = (val, userType) => {
		const userLogonDetails = JSON.parse(localStorage.getItem('userLogonDetails'));
		this.setState({
			userLogonDetails: userLogonDetails || {},
			userType: userType || 'patient',
			isRegisterClicked: val,
		});
	};

	/**
	 * Get user type from state
	 * @returns {String} User type
	 */
	getUserType = () => {
		return this.props.userType || this.state.userType;
	};

	/**
	 * Set user type to state
	 * @param {String} val User type
	 */
	setUserType = (val) => {
		this.setState({
			userType: val
		});
	};

	/**
	 * Set state to show profile model
	 * @param {Boolean} val True/False to view or not view modal
	 */
	setProfileView = (val) => {
		this.setState({
			isProfileViewClicked: val
		});
	};

	/**
	 * Render respective component when its tab is selected
	 * @returns {Object} React component
	 */
	renderContent = () => {
		switch (this.state.tab) {
			case 'home':
				return <MainPage redirectToPath={ this.redirectToPath } setRegisterClicked={ this.setRegisterClicked } userType={ this.state.userType } />;
			case 'doctors':
				return <DoctorsList userLogonDetails={ this.state.userLogonDetails } setLoginClicked={ this.setLoginClicked } redirectToPath={ this.redirectToPath } parentProps={ this.props } />;
			case 'hospitals':
				return <HospitalsList parentProps={ this.props } />;
			case 'appointments':
				return <AppointmentsList userLogonDetails={ this.state.userLogonDetails } setLoginClicked={ this.setLoginClicked } redirectToPath={ this.redirectToPath } parentProps={ this.props } />;
			case 'symptoms':
				return <SymptomsChecker />;
			case 'about':
				return <AboutUs redirectToPath={ this.redirectToPath } setRegisterClicked={ this.setRegisterClicked } />;
			case 'contact':
				return <ContactUs />;
			case 'requests':
				return <AdminRequests userLogonDetails={ this.state.userLogonDetails } parentProps={ this.props } />;
			default:
				return <MainPage redirectToPath={ this.redirectToPath } setRegisterClicked={ this.setRegisterClicked } userType={ this.state.userType } />;
		}
	};

	/**
	 * Render home page component
	 * @returns {React.Component} Form with login related HTML tags
	 */
	render() {
		const { Header, Content, Footer } = Layout;
		let items = [
			{
				key: 'home',
				icon: <HomeOutlined />,
				label: 'Home',
				onClick: () => this.redirectToPath('/home')
			},
			{
				key: 'appointments',
				icon: <CalendarOutlined />,
				label: 'Appointments',
				onClick: () => this.redirectToPath('/home/appointments')
			},
			{
				key: 'doctors',
				icon: <MedicineBoxOutlined />,
				label: 'Doctors',
				onClick: () => this.redirectToPath('/home/doctors')
			},
			{
				key: 'hospitals',
				icon: <PlusSquareOutlined />,
				label: 'Hospitals',
				onClick: () => this.redirectToPath('/home/hospitals')
			},
			{
				key: 'symptoms',
				icon: <CheckCircleOutlined />,
				label: 'Symptom checker',
				onClick: () => this.redirectToPath('/home/symptoms')
			}
		];
		if (this.state.userType !== 'admin' || !this.state.userLogonDetails.signInStatus) {
			items = [ ...items, {
				key: 'about',
				icon: <InfoCircleOutlined />,
				label: 'About us',
				onClick: () => this.redirectToPath('/home/about')
			},
			{
				key: 'contact',
				icon: <PhoneOutlined />,
				label: 'Contact us',
				onClick: () => this.redirectToPath('/home/contact')
			} ];
		} else {
			items = [ ...items, {
				key: 'requests',
				icon: <InfoCircleOutlined />,
				label: 'Requests',
				onClick: () => this.redirectToPath('/home/requests')
			} ];
		}
		return (
			<section>
				<Modal
					title={ <h2>Sign in</h2> }
					open={ this.state.isLoginClicked }
					onOk={ () => this.setLoginClicked(false) }
					onCancel={ () => this.setLoginClicked(false) }
					width={ 800 }
					height={ 700 }
					footer={ null }
				>
					<LoginUser setLoginClicked={ this.setLoginClicked } parentProps={ this.props } />
				</Modal>
				<Modal
					title={ <h2>Sign up</h2> }
					open={ this.state.isRegisterClicked }
					onOk={ () => this.setRegisterClicked(false, 'patient') }
					onCancel={ () => this.setRegisterClicked(false, 'patient') }
					width={ 800 }
					height={ 700 }
					style={ { top: 20 } }
					footer={ null }
				>
					<RegisterUser setRegisterClicked={ this.setRegisterClicked } getUserType={ this.getUserType } setUserType={ this.setUserType } clearUserType={ this.clearUserType } parentProps={ this.props } />
				</Modal>
				<Modal
					title={ <h2>Profile</h2> }
					open={ this.state.isProfileViewClicked }
					onOk={ () => this.setProfileView(false) }
					onCancel={ () => this.setProfileView(false) }
					width={ 800 }
					height={ 700 }
					footer={ null }
				>
					<RegisterUser setRegisterClicked={ this.setRegisterClicked } getUserType={ this.getUserType } setUserType={ this.setUserType } clearUserType={ this.clearUserType } parentProps={ this.props } isUpdate={ true } />
				</Modal>
				<Layout className='layout'>
					<Header style={ { backgroundColor: '#DFDFDF', height: '5.5em' } }>
						<a href='/home' style={ { float: 'left' } }>
							<img style={ { height: '70px', width: '70px', position: 'relative', float: 'left', marginTop: '0.5em' } } src='../wolf.png' alt='wolf'></img>
							<b style={ { color: 'black', marginLeft: '0.5em', float: 'left', fontSize: '25px' } }>WOLF</b><b style={ { color: 'red', float: 'left', fontSize: '25px' } }>CARE</b>
							<br></br>
							<p style={ { color: 'black', float: 'left', fontSize: '15px', marginLeft: '1em', marginTop: '-2.5em' } }>Your pocket doctor</p>
						</a>
						{
							this.props.userId && this.state.userLogonDetails.signInStatus ? <div
								style={ { float: 'right' } }>
								<Dropdown
									placement='bottom'
									menu={ {
										items: [
											{
												key: 'profile',
												label: (
													<a rel='noopener noreferrer' onClick={ () => {
														this.setProfileView(true);
													} }>
														Profile
													</a>
												)
											},
											{
												key: 'appointmentHistory',
												label: (
													<a rel='noopener noreferrer' href='/home/appointments'>
														Appointment History
													</a>
												)
											},
											{
												key: 'signout',
												label: (
													<a rel='noopener noreferrer' onClick={ () => {
														let userLogonDetails = this.state.userLogonDetails;
														userLogonDetails.signInStatus = false;
														userLogonDetails.userId = null;
														userLogonDetails.userType = '';
														userLogonDetails.userInfo = {};
														localStorage.setItem('userLogonDetails', JSON.stringify(userLogonDetails));
														this.props.onSubmitSignOut();
														this.redirectToPath('/home');
													} }>
														Sign Out
													</a>
												)
											}
										]
									} }
								>
									<Avatar style={ { backgroundColor: '#87d068', marginTop: '20px' } } size={ 50 } icon={ <UserOutlined /> } />
								</Dropdown>
							</div> : <div
								style={ { float: 'right' } }>
								<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', float: 'left', marginRight: '1em', marginTop: '1.5em' } } onClick={ () => this.setLoginClicked(true) }><p style={ { float: 'left', marginTop: '0.5em' } }>Login</p></Button>
								<Button shape='round' size='small' style={ { height: '40px', position: 'relative', float: 'left', marginTop: '1.5em' } }><p style={ { float: 'left', marginTop: '0.5em' } } onClick={ () => this.setRegisterClicked(true) }>Join Now</p></Button>
							</div>
						}
						<Menu
							style={ { backgroundColor: '#DFDFDF', float: 'right', marginRight: '3em', marginTop: '0.5em' } }
							mode='horizontal'
							items={ items }
							disabledOverflow={ true }
							selectedKeys={ [ this.state.tab || 'home' ] }
						/>
					</Header>
					<Content style={ { height: '650px' } }>
						{ this.renderContent() }
					</Content>
					<Footer style={ { paddingTop: '1em', width: '100%', height: '10px', backgroundColor: '#DFDFDF', bottom: '0.5%', position: 'absolute' } }>Copyright (c) 2022 Group 22</Footer>
				</Layout>
			</section>
		);
	}
}

export default Home;
