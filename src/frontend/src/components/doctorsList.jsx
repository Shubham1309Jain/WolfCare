import React from 'react';
import { Select, Button, Space, Table } from 'antd';
import { Spinner } from 'reactstrap';
import { DatePicker, Modal } from 'antd';
import {
	CalendarOutlined,
	UserOutlined,
	MedicineBoxOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD hh:mm';
const dayFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

/**
 * React component for listing all doctors
 * @extends React.Component
 */
class DoctorsList extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			showAppointmentDescription: false,
			selectedAppointment: {}
		};
	}

	/**
	 * React lifecycle method to load all available doctors
	 */
	componentDidMount = () => {
		this.populateHospitals();
		this.populateDoctors();
	};

	/**
	 * Get and save list of doctors in state
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	populateDoctors = async () => {
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			await this.props.parentProps.onGetDoctors();
			if (this.props.parentProps.getDoctorsApiStatus) {
				this.setState({
					loading: false,
					doctors: this.props.parentProps.doctors
				});
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.getHospitalsApiMessage || 'Could not get list of hospitals, please try again.');
				return false;
			}
		}
	};

	/**
	 * Get and save list of hospitals in state
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	populateHospitals = async () => {
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			await this.props.parentProps.onGetHospitals();
			if (this.props.parentProps.getHospitalsApiStatus) {
				const hospitalData = this.props.parentProps.hospitals.map((hospital) => {
					return {
						value: hospital.hospitalid,
						label: hospital.name
					};
				});
				this.setState({
					loading: false,
					hospitals: hospitalData
				});
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.getHospitalsApiMessage || 'Could not get list of hospitals, please try again.');
				return false;
			}
		}
	};

	/**
	 * Validate input values and call onAppointmentCreate API to create appointment
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async () => {
		if (Object.keys(this.props).length > 0 && Object.keys(this.props.parentProps).length > 0) {
			const apiInput = {
				doctorid: this.state.selectedAppointment.doctorid,
				hospitalid: this.state.selectedAppointment.selectedHospitalId,
				date: moment(this.state.selectedAppointment.appointDateTime).format(dayFormat),
				timeslot: moment(this.state.selectedAppointment.appointDateTime).format(timeFormat),
				userid: this.props.parentProps.userId
			};
			this.setState({
				loading: true
			});
			await this.props.parentProps.onAppointmentCreate(apiInput);
			if (this.props.parentProps.createAppointmentApiStatus) {
				this.setState({
					loading: false
				});
				this.props.redirectToPath('/home/appointments');
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.createAppointmentApiMessage || 'Appointment creation failed. Please try again.');
				return false;
			}
		}
		return false;
	};

	/**
	 * Set state to show describe appointment model
	 * @param {Boolean} val True/False to view or not view modal
	 */
	setAppointmentDescriptionStatus = (val) => {
		this.setState({
			showAppointmentDescription: val
		});
	};

	/**
	 * Set currently selected appointment in state
	 * @param {Boolean} val Selected appointment
	 */
	setSelectedAppointment = (val) => {
		this.setState({
			selectedAppointment: val
		});
	};

	/**
	 * Dropdown value change for hospital
	 * @param {String} value Update value
	 */
	onChange = (value) => {
		this.setState({
			selectedHospital: value
		});
		this.setState({
			selectedAppointment: { ...this.state.selectedAppointment, selectedHospitalId: value, }
		});
	};

	/**
	 * Add date in state
	 * @param {Object} event Dropdown change event
	 */
	handleDateChange = (event) => {
		if (event < dayjs()) {
			alert('Entered date is older than current time, please fix that.');
		} else {
			this.setState({
				selectedAppointment: { ...this.state.selectedAppointment, appointDateTime: moment(event).format(dateFormat) }
			});
		}
	};

	/**
	 * Render doctors list component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		const { Column } = Table;
		if (!this.props.userLogonDetails || !this.props.userLogonDetails.signInStatus) {
			return (
				<div className='container' style={ { position: 'absolute', width: '45%', height: '40%', top: '25%', right: '25%', opacity: '90%' } }>
					<div>
						<h1 style={ { width: '100%', marginTop: '15%', marginRight: '5%', textAlign: 'center' } }>Uh oh! Something went wrong</h1>
						<h2 style={ { width: '100%', marginTop: '5%', marginRight: '5%', textAlign: 'center' } }><b>Please login to see appointments</b></h2>
						<Button shape='round' type='primary' size='small' style={ { height: '40px', position: 'relative', marginTop: '5%', marginLeft: '45%' } } onClick={ () => this.props.setLoginClicked(true) }><p style={ { float: 'left', marginTop: '0.5em' } }>Login</p></Button>
					</div>
				</div>
			);
		}
		return (
			<section>
				{ this.state.showAppointmentDescription ? (
					<>
						<Modal
							title={ <h2>Schedule appointment</h2> }
							open={ true }
							onOk={ () => this.setAppointmentDescriptionStatus(false) }
							onCancel={ () => this.setAppointmentDescriptionStatus(false) }
							width={ 800 }
							height={ 700 }
							footer={ null }
						>
							<div className='signup-content'>
								<div className='signup-form'>
									<form className='register-form' id='register-form'>
										<div className='form-group'>
											<UserOutlined style={ { marginTop: '4%' } } />
											<input type='text' name='name' id='name' placeholder='Doctor Name' style={ { float: 'right' } } value={ this.state.selectedAppointment.name } disabled />
										</div>
										<div className='form-group'>
											<MedicineBoxOutlined style={ { marginTop: '4%' } } />
											<Select
												showSearch
												placeholder='Select a hospital'
												optionFilterProp='label'
												filterOption={ (input, option) =>
													(option && option.label).toLowerCase().includes(input.toLowerCase())
												}
												options={ this.state.hospitals }
												style={ { width: '90%', marginLeft: '5%' } }
												value={ this.state.selectedHospital }
												onChange={ (event) => this.onChange(event) }
											/>
										</div>
										<div className='form-group'>
											<CalendarOutlined />
											<DatePicker
												format={ dateFormat }
												showTime
												style={ { marginLeft: '5%' } }
												placeholder={ 'Select date and time' }
												required
												disabledDate={ this.disabledDate }
												disabledTime={ this.disabledTime }
												value={ moment(this.state.selectedAppointment.appointDateTime) }
												onOk={ this.handleDateChange }
											/>
										</div>
										<div className='form-group form-button'>
											{ this.state.loading ? <Spinner /> : <input type='submit' name='submit-appointment' id='submit-appointment' className='form-submit' value='Submit' onClick={ this.handleSubmit } /> }
										</div>
									</form>
								</div>
								<div className='appointment-image'>
									<figure><img src='../appointment2.jpg' alt='edit-appointment' /></figure>
								</div>
							</div>
						</Modal>
					</>
				) : null }
				<Table
					dataSource={ this.props.parentProps.doctors }
					bordered={ true }
					showHeader
					scroll={ {
						y: 435
					} }
					pagination={ {
						position: [ 'bottomCenter' ],
						showQuickJumper: true
					} }
					loading={ this.state.loading }
				>
					{/* <Column title='Id' dataIndex='key' key='key' width='5%' /> */ }
					<Column title='Doctor' dataIndex='name' key='name' />
					<Column title='Specialization' dataIndex='specialization' key='specialization' />
					<Column title='Experience' dataIndex='experience' key='experience' />
					<Column
						title='Action'
						key='action'
						render={ (_, record) => {
							return (<Space size='middle'>
								<a className='link' onClick={ () => {
									this.setSelectedAppointment(record);
									this.setAppointmentDescriptionStatus(true);
								} }>Schedule</a>
							</Space>);
						} }
					/>
				</Table>
			</section>
		);
	}
}

export default DoctorsList;
