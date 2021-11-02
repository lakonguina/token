import { createContext } from 'react';
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

import mintable from "./assets/mintable.json";
import notMintable from "./assets/notMintable.json";

export const AppContext = createContext();

class LambdaViewSigner {
  async publicKeyHash() {
    const acc = await wallet.client.getActiveAccount();
    if (!acc) {
      document.getElementById('error').innerText = "Not connected";
      document.getElementById('alert').style.display = 'block';
      throw new Error('Not connected');
    }
    return acc.address;
  }
  async publicKey() {
    const acc = await wallet.client.getActiveAccount();
    if (!acc) {
      document.getElementById('error').innerText = "Not connected";
      document.getElementById('alert').style.display = 'block';
      throw new Error('Not connected');
    }
    return acc.publicKey;
  }
  async secretKey() {
    document.getElementById('error').innerText = "Secret key cannot be exposed";
    document.getElementById('alert').style.display = 'block';
    throw new Error('Secret key cannot be exposed');
  }
  async sign() {
    document.getElementById('error').innerText = "Cannot sign";
    document.getElementById('alert').style.display = 'block';
    throw new Error('Cannot sign');
  }
}

const Tezos = new TezosToolkit("https://florencenet.api.tez.ie");
const wallet = new BeaconWallet({name : "GoForFA"});
Tezos.setWalletProvider(wallet);
Tezos.setSignerProvider(new LambdaViewSigner());

export const AppProvider = ({ children }) => {
	(async () => {
		try {
			await wallet.disconnect();
			await wallet.clearActiveAccount();
		} catch (error) {
			console.log("Got error:", error);
		}
	})();
	const connect = async () => {
		try {
			await wallet.disconnect();
			await wallet.clearActiveAccount();
			const permissions = await wallet.client.requestPermissions({
				network: {
					type: NetworkType.MAINNET,
				},
			});
			document.getElementById('connect').innerText = `${permissions.address.slice(0,5)}...${permissions.address.slice(-5)}`;
		} catch (error) {
			document.getElementById('connect').innerText = "Connect";
			console.log("Got error:", error);
		}
	};
	const deploy = async () => {
		try {
			const activeAccount = await wallet.client.getActiveAccount();
			if (!activeAccount) {
				document.getElementById('error').innerText = "Not connected";
				document.getElementById('alert').style.display = 'block';
				throw new Error('Not connected')
			}
			var name = document.getElementById("name").value;
			var symbol = document.getElementById("symbol").value;
			var supply = document.getElementById("supply").value;
			var decimals = document.getElementById("decimals").value;
			var description = document.getElementById("description").value;
			var logo = document.getElementById("logo").value;
			var content = `{"version":"v0.0.1","description":"${description}","authors":["goforfa"],"source":{"tools":["SmartPy"],"location":"https://gitlab.com/smondet/fa2-smartpy.git"},"interfaces":["TZIP-012","TZIP-016"],"errors":[],"views":[]}`;
			if ( name.length > 0 && symbol.length > 0 && supply.length > 0 && decimals.length > 0) {
				var name = new Buffer(name, "ascii").toString("hex");
				var symbol = new Buffer(symbol, "ascii").toString("hex");
				var decimals =  new Buffer(decimals, "ascii").toString("hex");
				var logo = new Buffer(logo, "ascii").toString("hex");
				var content =  new Buffer(content, "ascii").toString("hex");

				const accountPkh = activeAccount.address;

				await Tezos.wallet
					.originate({
						code : (document.getElementById('advanced').checked) ? mintable : notMintable,
						init : `(Pair (Pair "${accountPkh}" (Pair 1 {Elt (Pair "${accountPkh}" 0) ${supply}})) (Pair (Pair {Elt "" 0x74657a6f732d73746f726167653a636f6e74656e74; Elt "content" 0x${content}} {}) (Pair {Elt 0 (Pair 0 {Elt "decimals" 0x${decimals}; Elt "name" 0x${name}; Elt "symbol" 0x${symbol}; Elt "thumbnailUri" 0x${logo}})} ${supply})))`,
					})
					.send();
			} else {
				document.getElementById('error').innerText = "Fill mendatory fields";
				document.getElementById('alert').style.display = 'block';
			}
		} catch (error) {
			console.log(error)
		}
	};
	const dismiss = async () => {
		document.getElementById('alert').style.display = 'none';
	}
	return (
		<AppContext.Provider value={{
			connect,
			deploy,
			dismiss

		}}>
		<div className="col-lg-5 col-sm-8 mx-auto my-3">
		{ children }
		</div>
		</AppContext.Provider>
	);
}

