import React from 'react';

const iframe = () => {
	return {
		__html: '<iframe src="../medical-rules/index.html" width="100%" height="650"></iframe>'
	};
};

/**
 * React component for symptoms checker
 * @extends React.Component
 */
class SymptomsChecker extends React.Component {
	/**
	 * Render symptoms checker component
	 * @returns {React.Component} Form with register user related HTML tags
	 */
	render() {
		return (
			<div style={ { margin: '2% 2% 2% 2%' } }>
				<div dangerouslySetInnerHTML={ iframe() } />
			</div>
		);
	}
}

export default SymptomsChecker;
