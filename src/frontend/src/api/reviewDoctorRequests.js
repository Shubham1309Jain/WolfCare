/**@module reviewDoctorRequests */

import axios from '../axios';

/**
 * API to review unapproved doctor requests
 * @param {Object} value Object of review
 * @returns {Promise} Response for axios PUT request
 */
const reviewDoctorRequests = (value) => {
	return axios.put('/approvedoctors', {
		...value
	});
};
export default reviewDoctorRequests;
