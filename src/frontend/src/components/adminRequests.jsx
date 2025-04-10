import React from 'react';
import { Button, Modal, Radio, Space, Popconfirm, Table } from 'antd';
import NotFound from './404';

/**
 * React component for Admin panel
 * @extends React.Component
 */
class AdminRequests extends React.Component {
	/**
	 * Set initial state
	 * @param {Object} props Props for the component
	 */
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			doctorRequests: props.parentProps.doctorRequests,
			hospitalRequests: props.parentProps.hospitalRequests,
			userType: props.userLogonDetails.userType,
			tab: 'doctor',
			isDenied: false,
			comments: '',
			selectedRecord: {}
		};
	}

	/**
	 * React lifecycle method to load unapproved requests
	 */
	componentDidMount() {
		this.handleSubmit();
	}

	/**
	 * Get both doctors and hospitals unapproved requests and save in state
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleSubmit = async () => {
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			await this.props.parentProps.onGetDoctorRequests();
			if (this.props.parentProps.getDoctorRequestsApiStatus) {
				this.setState({
					loading: false,
					doctorRequests: this.props.parentProps.doctorRequests.map((request) => {
						return ({
							...request,
							appointStatus: <Button disabled shape='round' size='small' style={ { height: '40px', color: 'white', backgroundColor: request.approvalstatus === 'FALSE' && request.isactive === 'TRUE' ? 'gray' : request.isactive === 'TRUE' ? 'green' : 'red', float: 'right', marginRight: '39%' } }><p style={ { float: 'left', marginTop: '0.5em' } }>{ request.approvalstatus === 'FALSE' && request.isactive === 'TRUE' ? 'Waiting' : request.isactive === 'TRUE' ? 'Active' : 'Denied' }</p></Button>
						});
					})
				});
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.getDoctorRequestsApiMessage || 'Could not get list of doctor requests, please try again.');
				return false;
			}
			await this.props.parentProps.onGetHospitalRequests();
			if (this.props.parentProps.getHospitalRequestsApiStatus) {
				this.setState({
					loading: false,
					hospitalRequests: this.props.parentProps.hospitalRequests.map((request) => {
						return ({
							...request,
							appointStatus: <Button disabled shape='round' size='small' style={ { height: '40px', color: 'white', backgroundColor: request.approvalstatus === 'FALSE' && request.isactive === 'TRUE' ? 'gray' : request.isactive === 'TRUE' ? 'green' : 'red', float: 'right', marginRight: '39%' } }><p style={ { float: 'left', marginTop: '0.5em' } }>{ request.approvalstatus === 'FALSE' && request.isactive === 'TRUE' ? 'Waiting' : request.isactive === 'TRUE' ? 'Active' : 'Denied' }</p></Button>
						});
					})
				});
			} else {
				this.setState({
					loading: false
				});
				alert(this.props.parentProps.getHospitalRequestsApiMessage || 'Could not get list of hospital requests, please try again.');
				return false;
			}
		}
	};

	/**
	 * Update tab in state when switched between hospital and doctor requests
	 * @param {Object} event Radio button click event
	 */
	onRadioChange = (event) => {
		this.setState({
			tab: event.target.value
		});
	};

	/**
	 * Update backend if request is approved
	 * @param {Object} record Selected request
	 * @param {String} type Type of request between hospital and doctor
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	confirmApprovals = async (record, type) => {
		// Delete appointment
		const comments = 'Approved';
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			if (type === 'doctor') {
				const apiInput = {
					id: record.doctorid,
					comments,
					status: 'Approved'
				};
				await this.props.parentProps.onReviewDoctorRequest(apiInput);
				if (this.props.parentProps.reviewDoctorRequestApiStatus) {
					this.setState({
						loading: false
					});
					location.reload();
					return true;
				} else {
					this.setState({
						loading: false
					});
					alert(this.props.parentProps.reviewDoctorRequestApiMessage || 'Request review failed. Please try again.');
					return false;
				}
			} else {
				const apiInput = {
					id: record.hospitalid,
					comments,
					status: 'Approved'
				};
				await this.props.parentProps.onReviewHospitalRequest(apiInput);
				if (this.props.parentProps.reviewHospitalRequestApiStatus) {
					this.setState({
						loading: false
					});
					location.reload();
					return true;
				} else {
					this.setState({
						loading: false
					});
					alert(this.props.parentProps.reviewHospitalRequestApiMessage || 'Request review failed. Please try again.');
					return false;
				}
			}
		}
		return false;
	};

	/**
	 * Update backend if request is denied
	 * @param {String} type Type of request between hospital and doctor
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	confirmDenials = async (type) => {
		const record = this.state.selectedRecord;
		if (Object.keys(this.props.parentProps).length > 0) {
			this.setState({
				loading: true
			});
			if (type === 'doctor') {
				const apiInput = {
					id: record.doctorid,
					comments: this.state.comments,
					status: 'Denied'
				};
				await this.props.parentProps.onReviewDoctorRequest(apiInput);
				if (this.props.parentProps.reviewDoctorRequestApiStatus) {
					this.setState({
						loading: false
					});
					location.reload();
					return true;
				} else {
					this.setState({
						loading: false
					});
					alert(this.props.parentProps.reviewDoctorRequestApiMessage || 'Request review failed. Please try again.');
					return false;
				}
			} else {
				const apiInput = {
					id: record.hospitalid,
					comments: this.state.comments,
					status: 'Denied'
				};
				await this.props.parentProps.onReviewHospitalRequest(apiInput);
				if (this.props.parentProps.reviewHospitalRequestApiStatus) {
					this.setState({
						loading: false
					});
					location.reload();
					return true;
				} else {
					this.setState({
						loading: false
					});
					alert(this.props.parentProps.reviewHospitalRequestApiMessage || 'Request review failed. Please try again.');
					return false;
				}
			}
		}
		return false;
	};

	/**
	 * Update denial comments in state
	 * @param {Object} event Textarea update event
	 * @returns {Boolean} True if everything succeeds, false otherwise
	 */
	handleComments = (event) => {
		this.setState({
			comments: event.target.value
		});
	};

	/**
	 * Render Admin panel component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		if (this.state.userType !== 'admin') {
			return (
				<NotFound />
			);
		}
		const { Column } = Table;
		return (
			<section style={ { margin: '2% 2% 2% 2%' } }>
				<Modal title='Basic Modal' open={ this.state.isDenied } onOk={ () => { this.setState({ isDenied: false }); this.confirmDenials(this.state.tab); } } onCancel={ () => this.setState({ isDenied: false }) }>
					<h2>Why denying?</h2>
					<textarea maxLength={ 256 } onChange={ this.handleComments }></textarea>
				</Modal>
				<h2 style={ { float: 'left' } }>Admin Panel</h2>
				<Radio.Group onChange={ this.onRadioChange } value={ this.state.tab } style={ { float: 'right' } }>
					<Radio.Button value='doctor'>Doctors</Radio.Button>
					<Radio.Button value='hospital'>Hospitals</Radio.Button>
				</Radio.Group>
				{ this.state.tab === 'doctor' ? <Table
					dataSource={ this.state.doctorRequests }
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
					style={ { marginTop: '2%' } }
				>
					<Column title='First name' dataIndex='firstname' key='firstname' />
					<Column title='Last name' dataIndex='lastname' key='lastname' />
					<Column title='Email' dataIndex='email' key='email' />
					<Column title='Degree' dataIndex='degree' key='degree' />
					<Column title='Phone' dataIndex='phone' key='phone' />
					<Column title='Primary Spec' dataIndex='primaryspecialty' key='primaryspecialty' />
					<Column title='Secondary Spec' dataIndex='secondaryspecialty' key='secondaryspecialty' />
					<Column title='YOE' dataIndex='yoe' key='yoe' />
					<Column title='Status' dataIndex='appointStatus' key='appointStatus' />
					<Column
						title='Action'
						key='action'
						render={ (_, record) => {
							return (<Space size='middle'>
								<a className='link' onClick={ () => {
									this.setState({
										isDenied: true,
										selectedRecord: record
									});
								} }>Deny</a>
								<Popconfirm
									title='Are you sure to approve this request?'
									onConfirm={ () => this.confirmApprovals(record, 'doctor') }
									okText='Yes'
									cancelText='No'
								>
									<a className='link'>Approve</a>
								</Popconfirm>
							</Space>);
						} }
					/>
				</Table> : <Table
					dataSource={ this.state.hospitalRequests }
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
					style={ { marginTop: '2%' } }
				>
					<Column title='Name' dataIndex='name' key='name' />
					<Column title='Address' dataIndex='addressline1' key='addressline1' />
					<Column title='Email' dataIndex='email' key='email' />
					<Column title='Phone' dataIndex='phone' key='phone' />
					<Column title='Status' dataIndex='appointStatus' key='appointStatus' />
					<Column
						title='Action'
						key='action'
						render={ (_, record) => {
							return (<Space size='middle'>
								<a className='link' onClick={ () => {
									this.setState({
										isDenied: true,
										selectedRecord: record
									});
								} }>Deny</a>
								<Popconfirm
									title='Are you sure to approve this request?'
									onConfirm={ () => this.confirmApprovals(record, 'hospital') }
									okText='Yes'
									cancelText='No'
								>
									<a className='link'>Approve</a>
								</Popconfirm>
							</Space>);
						} }
					/>
				</Table> }
			</section>
		);
	}
}

export default AdminRequests;
