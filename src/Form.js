import { AppContext } from './App';
import React, { useContext } from 'react';

function Form() {
	const app = useContext(AppContext);
	return (
		<>
			<div className="my-5 text-center text-white">
				<h4 class="fw-bold" >Deploy token right from your browser or mobile on <a href="https://tezos.com" className="text-decoration-none" target="_blank" rel="noreferrer">Tezos</a> with <a href="https://www.walletbeacon.io/" className="text-decoration-none" target="_blank" rel="noreferrer">Beacon.</a></h4>
			</div>
			<div className="bg-stealth p-3 rounded mt-2">
				<div className="mt-1 d-flex justify-content-between">
					<div className="text-secondary h6 p-2">Minting & Burning</div>
					<div> 
						<label className="switch">
							<input type="checkbox" id="advanced"></input>
							<span className="slider round"></span>
						</label>
					</div>
				</div>

				<div className="mt-2">
					<input type="text" id="name" className="form-control bg-dark border-0 text-white" placeholder="Bitcoin"></input>
					<small className="form-text text-muted">Name of your token. *</small>
				</div>
				<div className="mt-2">
					<input type="text" id="symbol" className="form-control bg-dark border-0 text-white" placeholder="BTC" pattern="[a-zA-Z0-9-]+{,2}" ></input>
					<small className="form-text text-muted">Symbol of your token, alphanumeric only. *</small>
				</div>
				<div className="mt-2">
					<input type="number" id="decimals" className="form-control bg-dark border-0 text-white" placeholder="8" min="2" max="16"></input>
					<small className="form-text text-muted">Smallest division of your token, 6 to 16*</small>
				</div>
				<div className="mt-2">
					<input type="number" id="supply" className="form-control bg-dark border-0 text-white" placeholder="21000000"></input>
					<small className="form-text text-muted">Supply of your token, will be placed in your wallet. *</small>
				</div>
				<div className="mt-2">
					<input type="text" id="logo" className="form-control bg-dark border-0 text-white" placeholder="ipfs://Qme7ss3ARVgxv6rXqVPiikMJ8u2NLgmgszg13pYrDKEoiu
	"></input>
					<small className="form-text text-muted">Logo of your token, IPFS or HTTP(S).</small>
				</div>
				<div className="mt-2">
					<textarea id="description" rows="5" className="form-control bg-dark border-0 text-white" placeholder="Peer to peer electronic cash system"></textarea>
					<small className="form-text text-muted">Description of your token.</small>
				</div>
				<button className="btn bg-gradient text-white fw-bold  mt-2 w-100 border-0" onClick={app.deploy}>Deploy</button>
			</div>
			<div className="text-center mt-4">
				<h5 className="text-white fw-bold">This project is open source on Gitlab</h5>
				<a href="https://gitlab.com/lauryakonguina/goforfa">
					<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#0F61FF" viewBox="0 0 16 16">
	  <path d="M15.698 7.287 8.712.302a1.03 1.03 0 0 0-1.457 0l-1.45 1.45 1.84 1.84a1.223 1.223 0 0 1 1.55 1.56l1.773 1.774a1.224 1.224 0 0 1 1.267 2.025 1.226 1.226 0 0 1-2.002-1.334L8.58 5.963v4.353a1.226 1.226 0 1 1-1.008-.036V5.887a1.226 1.226 0 0 1-.666-1.608L5.093 2.465l-4.79 4.79a1.03 1.03 0 0 0 0 1.457l6.986 6.986a1.03 1.03 0 0 0 1.457 0l6.953-6.953a1.031 1.031 0 0 0 0-1.457"/>
					</svg>
				</a>
			</div>
		</>
	);
}
export default Form;
