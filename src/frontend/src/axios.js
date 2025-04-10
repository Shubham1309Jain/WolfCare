/**@module axiosClient */

import axios from 'axios';

/**
 * Create axios client
 * @returns {Object} Object of axios client
 */
const fetchClient = () => {
	const defaultOptions = {
		baseURL: 'https://db15-107-13-178-32.ngrok-free.app/',
		// baseUrl: 'http://localhost:3000/',
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Create instance
	let instance = axios.create(defaultOptions);

	// Set the token for any request
	instance.interceptors.request.use(function (config) {
		const token = localStorage.getItem('token');
		config.headers.token = token ? token : '';
		return config;
	});

	return instance;
};

export default fetchClient();