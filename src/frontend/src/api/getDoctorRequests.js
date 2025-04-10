/**@module getDoctorRequests */

import axios from '../axios';

/**
 * API to get unapproved doctor requests
 * @returns {Promise} Response for axios GET request
 */
const getDoctorRequests = () => {
	return axios.get('/approvedoctors');
};
export default getDoctorRequests;
