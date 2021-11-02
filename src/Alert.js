import { AppContext } from './App';
import React, { useContext } from 'react';

function Alert() {
	const app = useContext(AppContext);
	return (
		<div className="alert alert-warning alert-dismissible fixed-bottom container hide" role="alert" id="alert">
			<span id="error"></span>
			<button type="button" className="btn-close" onClick={app.dismiss}></button>
		</div>
	);
}
export default Alert;
