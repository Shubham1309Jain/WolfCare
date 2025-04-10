/**@module reviewHospitalRequests */

import axios from '../axios';

/**
 * API to review unapproved hospital requests
 * @param {Object} value Object of review
 * @returns {Promise} Response for axios PUT request
 */
const reviewHospitalRequests = (value) => {
	return axios.put('/approvehospital', {
		...value
	});
};
export default reviewHospitalRequests;
