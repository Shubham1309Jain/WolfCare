/**@module scheduleAppointmentApi */

import axios from '../axios';

/**
 * API to schedule appointment for a user
 * @param {Object} value Object containing appointment details
 * @returns {Promise} Response for axios POST request
 */
const scheduleAppointmentApi = (value) => {
	console.log(value);
	return axios.post('/addAppointment', {
		...value
	});
};
export default scheduleAppointmentApi;
