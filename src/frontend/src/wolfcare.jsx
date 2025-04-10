import React from 'react';
import Home from './containers/home';
import { Provider } from 'react-redux';
import store from './app/store';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';

/**
 * Root component to connect child components with redux store and render them
 * @extends React.Component
 */
class Wolfcare extends React.Component {
	/**
	 * Create and return a router to render the respective component based on the path in URL
	 * @returns {React.Component} Router with respective component subscribed to the shared redux store
	 * <br/>
	 */

	render() {
		const router = createBrowserRouter([
			{
				path: '*',
				element: <Home />
			},
			{
				path: '/home',
				element: <Home />
			},
			{
				path: '/home/doctors',
				element: <Home tab={ 'doctors' } />
			},
			{
				path: '/home/hospitals',
				element: <Home tab={ 'hospitals' } />
			},
			{
				path: '/home/appointments',
				element: <Home tab={ 'appointments' } />
			},
			{
				path: '/home/symptoms',
				element: <Home tab={ 'symptoms' } />
			},
			{
				path: '/home/about',
				element: <Home tab={ 'about' } />
			},
			{
				path: '/home/contact',
				element: <Home tab={ 'contact' } />
			}
		]);

		return (
			<Provider store={ store }>
				<RouterProvider router={ router } />
			</Provider>
		);
	}
}

export default Wolfcare;
