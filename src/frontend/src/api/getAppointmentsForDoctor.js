/**@module getAppointmentsForDoctor */

import axios from '../axios';

/**
 * API to get appointments for a doctor
 * @param {Object} id Doctor id
 * @returns {Promise} Response for axios GET request
 */
const getAppointmentsForDoctor = (id) => {
	return axios.get('/appointmentInfoDoctor?id=' + id);
};
export default getAppointmentsForDoctor;
