/**@module getAppointmentsForUser */

import axios from '../axios';

/**
 * API to get appointments for a user
 * @param {Object} id User id
 * @returns {Promise} Response for axios GET request
 */
const getAppointmentsForUser = (id) => {
	return axios.get('/appointmentInfoUser?id=' + id);
};
export default getAppointmentsForUser;
