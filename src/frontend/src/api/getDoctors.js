/**@module getDoctorsApi */

import axios from '../axios';

/**
 * API to get doctors details
 * @returns {Promise} Response for axios GET request
 */
const getDoctorsApi = () => {
	return axios.get('/getDoctors');
};
export default getDoctorsApi;
