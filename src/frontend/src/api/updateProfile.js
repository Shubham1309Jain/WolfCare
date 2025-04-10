/**@module updateProfileAPI */

import axios from '../axios';

/**
 * API to update profile details for a user
 * @param {Object} value Object containing updated user details
 * @returns {Promise} Response for axios PUT request
 */
const updateProfileAPI = (value) => {
	return axios.put('/updateprofile', {
		name: value.name,
		email: value.email,
		password: value.pass,
		repeatpassword: value.rePass,
		bloodGroup: value.bloodGroup,
		phoneNumber: value.phoneNumber,
		userType: value.userType,
		experience: value.experience,
		specialization: value.specialization,
		address: value.address,
		userid: value.userId,
	});
};
export default updateProfileAPI;
