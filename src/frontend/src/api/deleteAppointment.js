/**@module deleteAppointmentApi */

import axios from '../axios';

/**
 * API to delete an appointment
 * @param {Object} input Object containing appointment details
 * @returns {Promise} Response for axios PUT request
 */
const deleteAppointmentApi = (input) => {
	return axios.put('/updateAppointment', {
		...input
	});
};
export default deleteAppointmentApi;
