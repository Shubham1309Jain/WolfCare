/**@module updateAppointmentApi */

import axios from '../axios';

/**
 * API to update appointment information
 * @param {Object} input Object containing updated appointment details
 * @returns {Promise} Response for axios PUT request
 */
const updateAppointmentApi = (input) => {
	return axios.put('/updateAppointment', {
		...input
	});
};
export default updateAppointmentApi;
