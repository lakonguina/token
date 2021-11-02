import { AppContext } from './App';
import React, { useContext } from 'react';

function Navbar() {
	const app  = useContext(AppContext);
	return (
		<nav className="navbar navbar-light">
			<div className="container-fluid">
				<span className="navbar-brand text-white fw-bold">goforfa.</span>
				<span className="d-flex">
					<button className="btn bg-gradient text-white fw-bold border-0" onClick={app.connect} id="connect">Connect</button>
				</span>
			</div>
		</nav>
	);
}
export default Navbar;
