import React from 'react';
import { Spinner } from 'reactstrap';
import { DatePicker, Modal, Select, TimePicker } from 'antd';
import {
	CalendarOutlined,
	ClockCircleOutlined,
	MedicineBoxOutlined,
	UserOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';
const dummySchedule = { Monday: { StartTime: '10:00:00', EndTime: '16:00:00' }, Tuesday: { StartTime: '11:00:00', EndTime: '16:00:00' } };

/**
 * React component for describing an appointment
 * @extends React.Component
 */
class DescribeAppointment extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			selectedAppointment: props.selectedAppointment,
			allowedDoctors: [],
			selectedDoctor: props.selectedAppointment.doctorName,
			allowedHospitals: [],
			selectedHospital: props.selectedAppointment.hospitalName,
			allowedDays: [],
			selectedDate: props.selectedAppointment.appointDate,
			allowedTime: [],
			selectedTime: props.selectedAppointment.appointTime
		};
	}

	/**
	 * React lifecycle method to load all available doctors
	 */
	componentDidMount = () => {
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
				const allowedDoctors = this.props.parentProps.doctors.map((doctor) => {
					return {
						value: doctor.doctorid,
						label: doctor.name
					};
				});
				this.setState({
					loading: false,
					allowedDoctors
				}, () => {
					this.populateHospitals();
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
					allowedHospitals: hospitalData
				}, () => {
					this.populateDates();
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
	 * Get and save list of available dates in state
	 */
	populateDates = () => {
		const dayMap = {
			Sunday: 0,
			Monday: 1,
			Tuesday: 2,
			Wednesday: 3,
			Thursday: 4,
			Friday: 5,
			Saturday: 6
		};
		const allowedDays = [];
		Object.keys(dummySchedule).forEach((sch) => {
			allowedDays.push(dayMap[ sch ]);
		});
		this.setState({
			allowedDays
		}, () => {
			this.populateHours();
		});
	};

	/**
	 * Get and save list of available times in state
	 */
	populateHours = () => {
		const dayMap = {
			0: 'Sunday',
			1: 'Monday',
			2: 'Tuesday',
			3: 'Wednesday',
			4: 'Thursday',
			5: 'Friday',
			6: 'Saturday'
		};
		let day = moment(this.state.selectedDate).day();
		if (!this.state.allowedDays.includes(day)) {
			day = this.state.allowedDays[ 0 ];
		}
		let dayString = dayMap[ day ];
		const startTime = dummySchedule[ dayString ].StartTime.split(':')[ 0 ];
		const endTime = dummySchedule[ dayString ].EndTime.split(':')[ 0 ];
		const allowedHours = [];
		for (let i = startTime; i <= endTime; i++) {
			allowedHours.push(i);
		}
		this.setState({
			allowedHours,
			selectedDate: moment().day(day).format(dateFormat)
		});
	};

	/**
	 * Disable unavailable dates for DatePicker
	 * @returns {Boolean} True if date needs to be disabled, false otherwise
	 */
	disabledDate = (current) => {
		return current < dayjs().endOf('day').subtract(1, 'day') || !this.state.allowedDays.includes(moment(current).day());
	};

	/**
	 * Disable unavailable hours for TimePicker
	 * @returns {Array} List of disabled hours
	 */
	disabledTime = () => ({
		disabledHours: () => {
			const disabledHours = [];
			for (let i = 0; i <= 23; i++) {
				if (!this.state.allowedHours.includes(i)) {
					disabledHours.push(i);
				}
			}
			return disabledHours;
		}
	});

	/**
	 * Populate doctors, hospitals and time, and update in state
	 * @param {String} value Update value
	 * @param {String} type Type of value changed, i.e., doctor or hospital
	 */
	onChange = (value, type) => {
		switch (type) {
			case 'doctor':
				this.populateHospitals();
				this.setState({
					selectedDoctor: value,
					selectedHospital: null,
					selectedDate: this.selectedDate
				});
				break;
			case 'hospital':
				this.populateDates();
				this.setState({
					selectedHospital: value,
					selectedDate: this.selectedDate
				});
				break;
			default:
				break;
		}
	};

	/**
	 * Update date in state if changed
	 * @param {Object} value Dropdown change event
	 */
	handleDateChange = (event) => {
		if (moment(event).format(dateFormat) === this.state.selectedAppointment.appointDate) {
			alert('No change in date. Please update the date, else click on cancel.');
		} else {
			this.setState({
				selectedDate: event,
				selectedTime: moment(Date.now()).format(timeFormat)
			}, this.populateHours());
		}
	};

	/**
	 * Update time in state if changed
	 * @param {Object} value Dropdown change event
	 */
	handleTimeChange = (event) => {
		if (moment(event).format(timeFormat) === this.state.selectedAppointment.appointTime) {
			alert('No change in date. Please update the date, else click on cancel.');
		} else {
			this.setState({
				selectedTime: event
			});
		}
	};

	/**
	 * Validate input values and call onAppointmentUpdate API to update appointment
	 * @param {Object} event Button click event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async (event) => {
		event.preventDefault();
		if (Object.keys(this.props).length > 0 && Object.keys(this.props.parentProps).length > 0) {
			const apiInput = await {
				...this.state.selectedAppointment,
				// doctorid:this.state.selectedDoctor,
				date: moment(this.state.selectedDate).format(dateFormat),
				timeslot: moment(this.state.selectedTime).format(timeFormat),
				hospitalid: this.state.selectedHospital,
			};
			this.setState({
				loading: true
			});
			await this.props.parentProps.onAppointmentUpdate(apiInput);
			if (this.props.parentProps.updateAppointmentApiStatus) {
				this.setState({
					loading: false
				});
				this.props.setAppointmentDescriptionStatus(false);
				location.reload();
				this.props.parentProps.redirectToPath('/home/appointments');
				return true;
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.updateAppointmentApiMessage || 'Appointment update failed. Please try again.');
				return false;
			}
		}
		return false;
	};

	/**
	 * Render appointment edit component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		return (
			<Modal
				title={ <h2>Edit appointment</h2> }
				open={ true }
				onOk={ () => this.props.setAppointmentDescriptionStatus(false) }
				onCancel={ () => this.props.setAppointmentDescriptionStatus(false) }
				width={ 800 }
				height={ 700 }
				footer={ null }
			>
				<div className='signup-content'>
					<div className='signup-form'>
						<form className='register-form' id='register-form'>
							<div className='form-group'>
								<UserOutlined style={ { marginTop: '4%' } } />
								<Select
									showSearch
									placeholder='Select a doctor'
									optionFilterProp='label'
									filterOption={ (input, option) =>
										(option && option.label).toLowerCase().includes(input.toLowerCase())
									}
									options={ this.state.allowedDoctors }
									style={ { width: '90%', marginLeft: '5%' } }
									value={ this.state.selectedDoctor }
									onChange={ (event) => this.onChange(event, 'doctor') }
								/>
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
									options={ this.state.allowedHospitals }
									style={ { width: '90%', marginLeft: '5%' } }
									value={ this.state.selectedHospital }
									onChange={ (event) => this.onChange(event, 'hospital') }
								/>
							</div>
							<div className='form-group'>
								<CalendarOutlined />
								<DatePicker
									format={ dateFormat }
									style={ { width: '90%', marginLeft: '5%' } }
									placeholder={ 'Select date' }
									required
									disabledDate={ this.disabledDate }
									value={ moment(this.state.selectedDate) }
									onChange={ (event) => this.handleDateChange(event) }
									onOk={ (event) => this.handleDateChange(event) }
								/>
							</div>
							<div className='form-group'>
								<ClockCircleOutlined />
								<TimePicker
									format={ timeFormat }
									style={ { width: '90%', marginLeft: '5%' } }
									placeholder={ 'Select time' }
									required
									minuteStep={ 30 }
									disabledTime={ this.disabledTime }
									value={ moment(this.state.selectedTime, 'hh:mm') }
									onChange={ (event) => this.handleTimeChange(event) }
									onOk={ (event) => this.handleTimeChange(event) }
								/>
							</div>
							<div className='form-group form-button'>
								{ this.state.loading ? <Spinner /> : <input type='submit' name='update-appointment' id='update-appointment' className='form-submit' value='Update' onClick={ this.handleSubmit } /> }
							</div>
						</form>
					</div>
					<div className='appointment-image'>
						<figure><img src='../appointment2.jpg' alt='edit-appointment' /></figure>
					</div>
				</div>
			</Modal>
		);
	}
}

export default DescribeAppointment;
