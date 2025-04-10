/**@module getHospitalsApi */

import axios from '../axios';

/**
 * API to get list of hospitals
 * @returns {Promise} Response for axios GET request
 */
const getHospitalsApi = () => {
	return axios.get('/getHospitals');
};
export default getHospitalsApi;
