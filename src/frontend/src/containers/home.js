/**@module homeContainer */

import { connect } from 'react-redux';
import Home from '../components/home';
import onSubmitLoginAPI from '../api/login';
import registerUserApi from '../api/registerUser';
import updateAppointmentApi from '../api/updateAppointment';
import deleteAppointmentApi from '../api/deleteAppointment';
import getHospitalsApi from '../api/getHospitals';
import scheduleAppointmentAPI from '../api/scheduleAppointment';
import getDoctorsApi from '../api/getDoctors';
import getAppointmentsForUser from '../api/getAppointmentsForUser';
import getAppointmentsForDoctor from '../api/getAppointmentsForDoctor';
import getDoctorRequests from '../api/getDoctorRequests';
import reviewDoctorRequests from '../api/reviewDoctorRequests';
import getHospitalRequests from '../api/getHospitalRequests';
import reviewHospitalRequests from '../api/reviewHospitalRequests';
import updateProfileApi from '../api/updateProfile';

/**
 * Map actions to props
 * @returns  {Object} Item addition action that triggers relevant API
 */

const homeMapDispatchToProps = dispatch => {
	return {
		onSubmitLogin: async (value) => {
			try {
				let res = await onSubmitLoginAPI(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITLOGIN' : 'LOGINFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onSubmitSignOut: async () => {
			try {
				dispatch({
					type: 'SUBMITSIGNOUT'
				});
			} catch (error) {
				console.error('Some error occurred while calling signout dispatch', error);
			}
		},
		onSubmitRegister: async (value) => {
			try {
				let res = await registerUserApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITREGISTER' : 'REGISTERFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onAppointmentCreate: async (value) => {
			try {
				//console.log(value);
				let res = await scheduleAppointmentAPI(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITCREATEAPPOINTMENT' : 'UPDATEAPPOINTMENTFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onAppointmentUpdate: async (value) => {
			try {
				let res = await updateAppointmentApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITUPDATEAPPOINTMENT' : 'UPDATEAPPOINTMENTFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onAppointmentDelete: async (value) => {
			try {
				let res = await deleteAppointmentApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITDELETEAPPOINTMENT' : 'DELETEAPPOINTMENTFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onGetHospitals: async () => {
			try {
				let res = await getHospitalsApi();
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETHOSPITALS' : 'GETHOSPITALSFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onGetDoctors: async () => {
			try {
				let res = await getDoctorsApi();
				//console.log(res);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETDOCTORS' : 'GETDOCTORSFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling get doctors axios API', error);
			}
		},
		onGetAppointmentsForUser: async (id) => {
			try {
				let res = await getAppointmentsForUser(id);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETAPPOINTMENTSFORUSER' : 'GETAPPOINTMENTSFORUSERFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onGetAppointmentsForDoctor: async (id) => {
			try {
				let res = await getAppointmentsForDoctor(id);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETAPPOINTMENTSFORDOCTOR' : 'GETAPPOINTMENTSFORDOCTORFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onGetDoctorRequests: async () => {
			try {
				let res = await getDoctorRequests();
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETDOCTORREQUESTS' : 'GETDOCTORREQUESTSFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling get doctors axios API', error);
			}
		},
		onReviewDoctorRequest: async (val) => {
			try {
				let res = await reviewDoctorRequests(val);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITREVIEWDOCTORREQUEST' : 'REVIEWDOCTORREQUESTFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onGetHospitalRequests: async () => {
			try {
				let res = await getHospitalRequests();
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITGETHOSPITALREQUESTS' : 'GETHOSPITALREQUESTSFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling get doctors axios API', error);
			}
		},
		onReviewHospitalRequest: async (val) => {
			try {
				let res = await reviewHospitalRequests(val);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITREVIEWHOSPITALREQUEST' : 'REVIEWHOSPITALREQUESTFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
		onUpdateProfile: async (value) => {
			try {
				let res = await updateProfileApi(value);
				dispatch({
					type: res && res.data && res.data.status === 200 ? 'SUBMITUPDATEPROFILE' : 'UPDATEPROFILEFAILURE',
					payload: res.data
				});
			} catch (error) {
				console.error('Some error occurred while calling axios API', error);
			}
		},
	};
};

/**
 * Map state to props
 * @returns  {Object} Props
 */
const homeMapStateToProps = state => {
	const localStorageUserInfo = JSON.parse(localStorage.getItem('userLogonDetails'));
	return ({
		loginApiStatus: state.home.loginApiSuccess || localStorageUserInfo.signInStatus,
		loginApiMessage: (localStorageUserInfo.signInStatus && 'Logged in Successfully') || state.home.loginApiMessage,
		registerApiStatus: state.home.registerApiSuccess,
		registerApiMessage: state.home.registerApiMessage,
		createAppointmentApiStatus: state.home.createAppointmentApiSuccess,
		createAppointmentApiMessage: state.home.createAppointmentApiMessage,
		getAppointmentsForUserStatus: state.home.getAppointmentsForUserApiSuccess,
		getAppointmentsForUserMessage: state.home.getAppointmentsForUserApiMessage,
		userAppointments: state.home.userAppointments,
		getAppointmentsForDoctorStatus: state.home.getAppointmentsForDoctorApiSuccess,
		getAppointmentsForDoctorMessage: state.home.getAppointmentsForDoctorApiMessage,
		doctorAppointments: state.home.doctorAppointments,
		updateAppointmentApiStatus: state.home.updateAppointmentApiSuccess,
		updateAppointmentApiMessage: state.home.updateAppointmentApiMessage,
		deleteAppointmentApiStatus: state.home.deleteAppointmentApiSuccess,
		deleteAppointmentApiMessage: state.home.deleteAppointmentApiMessage,
		getHospitalsApiStatus: state.home.getHospitalsApiSuccess,
		getHospitalsApiMessage: state.home.getHospitalsApiMessage,
		hospitals: state.home.hospitals,
		getDoctorsApiStatus: state.home.getDoctorsApiSuccess,
		getDoctorsApiMessage: state.home.getDoctorsApiMessage,
		doctors: state.home.doctors,
		getDoctorRequestsApiStatus: state.home.getDoctorRequestsApiSuccess,
		getDoctorRequestsApiMessage: state.home.getDoctorRequestsApiMessage,
		doctorRequests: state.home.doctorRequests,
		getHospitalRequestsApiStatus: state.home.getHospitalRequestsApiSuccess,
		getHospitalRequestsApiMessage: state.home.getHospitalRequestsApiMessage,
		hospitalRequests: state.home.hospitalRequests,
		reviewDoctorRequestApiStatus: state.home.reviewDoctorRequestApiSuccess,
		reviewDoctorRequestApiMessage: state.home.reviewDoctorRequestApiMessage,
		reviewHospitalRequestApiStatus: state.home.reviewHospitalRequestApiSuccess,
		reviewHospitalRequestApiMessage: state.home.reviewHospitalRequestApiMessage,
		userId: localStorageUserInfo && localStorageUserInfo.userId,
		userType: localStorageUserInfo && localStorageUserInfo.userType,
		userInfo: localStorageUserInfo && localStorageUserInfo.userInfo || {},
		updateProfileApiStatus: state.home.updateProfileApiSuccess,
		updateProfileApiMessage: state.home.updateProfileApiMessage,
	});
};

/**
 * Using connect, subscribe home component to redux store
 */
export default connect(homeMapStateToProps, homeMapDispatchToProps)(Home);
