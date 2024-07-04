import Link from "next/link";
import Layout from "../src/layout/Layout";
import { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { dataLength, formatEther, getAddress, parseEther } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../src/components/ABI.json";

let array = [
  "active_bg_red",
  "active_bg_green",
  "active_bg_cyan",
  "active_bg_purple",
  "active_bg_yellow",
  "active_bg_organge",
];

let names = [
  "Serie 100",
  "Serie 200",
  "Serie 500",
  "Serie 1000",
  "Serie 2000",
  "Serie 5000",
];

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [isOwner, setOwner] = useState(false);
  const [wAddress, setWAddress] = useState("");
  const [aAddress, setAAddress] = useState("");
  const [serie, setSerie] = useState(0);
  const [items, setItems] = useState([]);
  const [fee1, setFee1] = useState("");
  const [fee2, setFee2] = useState("");
  const [perc1, setPerc1] = useState(1);
  const [perc2, setPerc2] = useState(1);
  const [myContract, setContract] = useState({});
  const [eTime, setETime] = useState("");
  const [royaltyA, setRA] = useState("");
  const [royaltyF, setRF] = useState(0);
  const [price, setPrice] = useState(0);
  const [decimals, setDecimals] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [isWhitelist, setWhitelist] = useState(false);
  const [amount, setAmount] = useState("");

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  // 2. Set chains

  const mainnet = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io/",
    rpcUrl: "https://sepolia.drpc.org",
  };

  /*
  const mainnet = {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  };
  */

  // 3. Create a metadata object
  const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
  };

  // 4. Create Ethers config
  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: "...", // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
  });

  // 5. Create a Web3Modal instance
  createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
  });

  const { isConnected, address } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { walletProvider } = useWeb3ModalProvider();

  async function getData() {
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // The Contract object
    const contract = new Contract(contractAddress, ABI, signer);
    const owner = await contract.owner();
    if (getAddress(owner) == address) {
      setOwner(true);
      const wlist = await contract.isWhitelist();
      setWhitelist(wlist);
      let tArray = [];
      for (let i = 0; i < 6; i++) {
        const result = Number(await contract.serieToSells(i));
        const result2 = await contract.isSerieActive(i);
        const result3 = Number(await contract.serieToAirdrop(i));
        console.log(result3);
        tArray.push({
          sold: result,
          active: result2,
          name: names[i],
          airdropped: result3,
        });
      }
      setItems(tArray);
    }
    setLoading(false);
    setContract(contract);
  }

  if (loading && walletProvider) {
    getData();
  }

  function handleWAChange(e) {
    setWAddress(e.target.value);
    console.log(wAddress);
  }

  function handleAAChange(e) {
    setAAddress(e.target.value);
    console.log(aAddress);
  }

  function handleSerieChange(e) {
    setSerie(e.target.value);
    console.log(serie);
  }

  function handleFeeW1(e) {
    setFee1(e.target.value);
    console.log(fee1);
  }

  function handleFeeW2(e) {
    setFee2(e.target.value);
    console.log(fee2);
  }

  function handlePerc1(e) {
    setPerc1(e.target.value);
  }

  function handlePerc2(e) {
    setPerc2(e.target.value);
  }

  function handleETimeChange(e) {
    let date = new Date(e.target.value);
    setETime(Math.floor(date.getTime() / 1000));
    console.log(eTime);
  }

  function handleRoyaltyA(e) {
    setRA(e.target.value);
  }

  function handleRoyaltyF(e) {
    setRF(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function handleDecimalsChange(e) {
    setDecimals(e.target.value);
    console.log(e.target.value);
  }

  function handleReceiverChange(e) {
    setReceiver(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  async function updateReceiver() {
    try {
      await myContract.setNFTReceiver(receiver);
    } catch (error) {
      alert(error);
    }
  }

  async function updatePrice() {
    try {
      await myContract.setPrice(price, decimals);
    } catch (error) {
      alert(error);
    }
  }

  async function pause() {
    try {
      await myContract.pause();
    } catch (error) {
      alert(error);
    }
  }

  async function unpause() {
    try {
      await myContract.unpause();
    } catch (error) {
      alert(error);
    }
  }

  async function toggle() {
    try {
      await myContract.toggleWhitelist();
      getData();
    } catch (error) {
      alert(error);
    }
  }

  async function insertWhite() {
    try {
      await myContract.addToWhitelist(wAddress);
    } catch (error) {
      alert(error);
    }
  }

  async function airdrop() {
    try {
      await myContract.airdrop(aAddress, serie);
    } catch (error) {
      alert(error);
    }
  }

  async function insertFee1() {
    try {
      await myContract.setFeeW1(fee1);
    } catch (error) {
      alert(error);
    }
  }

  async function insertFee2() {
    try {
      await myContract.setFeeW2(fee2);
    } catch (error) {
      alert(error);
    }
  }

  async function insertPerc() {
    if (Number(perc1) + Number(perc2) == 100) {
      try {
        await myContract.setPercent(perc1, perc2);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Wrong Percentages. Perc1 + Perc2 must be equal to 100!");
    }
  }

  async function withdraw() {
    try {
      await myContract.withdraw(parseEther(amount));
    } catch (error) {
      alert(error);
    }
  }

  async function start(id) {
    try {
      await (await myContract.startSerie(eTime, id)).wait();
      getData();
    } catch (error) {
      alert(error);
    }
  }

  async function stop(id) {
    try {
      await (await myContract.stopSerie(id)).wait();
      getData();
    } catch (error) {
      alert(error);
    }
  }

  async function insertRoyalty() {
    try {
      await (await myContract.setDefaultRoyalty(royaltyA, royaltyF)).wait();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Layout
      pageTitle={"Admin Panel"}
      fnc={open}
      connected={isConnected}
      addr={address}
    >
      {!isOwner ? (
        <h2>Restricted Access</h2>
      ) : (
        <div className="metaportal_fn_mintpage" style={{ marginTop: "15%" }}>
          <div className="container small">
            {/* Mint Top */}
            {/* !Mint Top */}
            {/* Mint Box */}
            <div className="metaportal_fn_mintbox">
              <div className="mint_left">
                <div className="mint_title">
                  <span className={array[1]}>Basic Settings</span>
                </div>
                <div className="mint_list">
                  <div className="mint_desc">
                    <span className="metaportal_fn_button" onClick={pause}>
                      Pause
                    </span>
                    <p>
                      By clicking "PAUSE" button, you will pause all the
                      contract sells.
                    </p>
                  </div>
                  <div className="mint_desc">
                    <span
                      className="metaportal_fn_button"
                      onClick={unpause}
                      style={{ marginTop: "5%" }}
                    >
                      Unpause
                    </span>
                    <p>
                      By clicking “UNPAUSE” button, you will restore all the
                      sells previously available
                    </p>
                  </div>
                  <div className="mint_desc">
                    <span
                      className="metaportal_fn_button"
                      onClick={toggle}
                      style={{ marginTop: "5%" }}
                    >
                      Toggle Whitelist
                    </span>
                    <p>
                      By clicking “TOGGLE WHITELIST” button, you will toggle
                      whitelist state, from false to true and viceversa.
                      Whitelist enabled allows a 10% discount to the wallets
                      marked as whitelisted.
                    </p>
                  </div>
                  <div className="mint_desc">
                    <p>
                      Current Whitelist state:{" "}
                      {isWhitelist ? (
                        <p style={{ color: "green" }}> Enabled</p>
                      ) : (
                        <p style={{ color: "red" }}> Disabled</p>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mint_right">
                <div className="mright">
                  <div className="mint_time">
                    <h4>Insert Wallet Address to Whitelist</h4>
                    <input
                      type="text"
                      placeholder="Address"
                      onChange={(e) => handleWAChange(e)}
                    ></input>
                    <span
                      className="metaportal_fn_button"
                      onClick={insertWhite}
                    >
                      Insert
                    </span>
                  </div>
                  <div className="mint_info">
                    <h4>Airdrop NFT to Wallet Address</h4>
                    <input
                      type="text"
                      placeholder="Address"
                      onChange={(e) => handleAAChange(e)}
                    ></input>
                    <input
                      type="number"
                      onChange={(e) => handleSerieChange(e)}
                      value={serie}
                    ></input>
                    <span className="metaportal_fn_button" onClick={airdrop}>
                      Airdrop
                    </span>
                  </div>
                  <div className="mint_info" style={{ marginTop: "5%" }}>
                    <h4>Change Base Price</h4>
                    <input
                      type="number"
                      placeholder="Base Price"
                      onChange={(e) => handlePriceChange(e)}
                    ></input>
                    <input
                      type="number"
                      placeholder="Decimals"
                      onChange={(e) => handleDecimalsChange(e)}
                    ></input>
                    <span
                      className="metaportal_fn_button"
                      onClick={updatePrice}
                    >
                      Set Price
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="metaportal_fn_mintbox">
              <div className="mint_left">
                <div className="mint_title">
                  <span className={array[1]}>Series Settings</span>
                </div>
                <div className="mint_list">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "8%",
                    }}
                  >
                    <input
                      type="date"
                      placeholder="Set End Time"
                      onChange={(e) => handleETimeChange(e)}
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[0]}
                      onClick={() => start(0)}
                    >
                      Start 100 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(0)}
                    >
                      Stop 100 Serie
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[1]}
                      onClick={() => start(1)}
                    >
                      Start 200 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(1)}
                    >
                      Stop 200 Serie
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[2]}
                      onClick={() => start(2)}
                    >
                      Start 500 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(2)}
                    >
                      Stop 500 Serie
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[3]}
                      onClick={() => start(3)}
                    >
                      Start 1000 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(3)}
                    >
                      Stop 1000 Serie
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[4]}
                      onClick={() => start(4)}
                    >
                      Start 2000 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(4)}
                    >
                      Stop 2000 Serie
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "5%",
                    }}
                  >
                    <span
                      className={"metaportal_fn_button " + array[5]}
                      onClick={() => start(5)}
                    >
                      Start 5000 Serie
                    </span>
                    <span
                      className="metaportal_fn_button"
                      onClick={() => stop(5)}
                    >
                      Stop 5000 Serie
                    </span>
                  </div>
                </div>
              </div>
              <div className="mint_right">
                <div className="mright">
                  <div className="mint_time">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "3%",
                        marginBottom: "8%",
                        justifyContent: "space-around",
                      }}
                    >
                      <h4>Sold</h4>
                      <h4>Ardrop</h4>
                      <h4>Status</h4>
                    </div>
                  </div>
                  <div className="mint_time">
                    {items.map((item, index) => (
                      <>
                        <span>
                          <h3>{item.name}</h3>
                        </span>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "3%",
                            marginBottom: "8%",
                            justifyContent: "space-around",
                          }}
                        >
                          <h5>{item.sold}</h5>
                          <h5 style={{ marginLeft: "3%" }}>
                            {item.airdropped}
                          </h5>
                          {item.active ? (
                            <h5 style={{ color: "green", marginLeft: "15%" }}>
                              Enabled
                            </h5>
                          ) : (
                            <h5 style={{ color: "red", marginLeft: "15%" }}>
                              Disabled
                            </h5>
                          )}
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="metaportal_fn_mintbox">
              <div className="mint_left">
                <div className="mint_title">
                  <span className={array[1]}>Withdraw Section</span>
                </div>
                <div className="mint_list">
                  <div className="mint_desc">
                    <h4>Insert First Wallet Address to collect funds</h4>
                    <input
                      type="text"
                      placeholder="Address 1"
                      onChange={(e) => handleFeeW1(e)}
                    ></input>
                    <span className="metaportal_fn_button" onClick={insertFee1}>
                      Insert
                    </span>
                  </div>
                  <div className="mint_desc" style={{ marginTop: "8%" }}>
                    <h4>Insert Second Wallet Address to collect funds</h4>
                    <input
                      type="text"
                      placeholder="Address 2"
                      onChange={(e) => handleFeeW2(e)}
                    ></input>
                    <span className="metaportal_fn_button" onClick={insertFee2}>
                      Insert
                    </span>
                  </div>
                  <div className="mint_desc" style={{ marginTop: "8%" }}>
                    <h4>Set Percentage for both Wallets</h4>
                    <input
                      type="number"
                      placeholder="Percentage 1"
                      onChange={(e) => handlePerc1(e)}
                      min="1"
                      max="99"
                    ></input>
                    <input
                      type="number"
                      placeholder="Percentage 2"
                      onChange={(e) => handlePerc2(e)}
                      min="1"
                      max="99"
                    ></input>
                    <span className="metaportal_fn_button" onClick={insertPerc}>
                      Insert
                    </span>
                  </div>
                </div>
              </div>
              <div className="mint_right">
                <div className="mright">
                  <div className="mint_time">
                    <input
                      type="text"
                      placeholder="Amount to Withdraw"
                      onChange={(e) => handleAmountChange(e)}
                    ></input>
                    <span className="metaportal_fn_button" onClick={withdraw}>
                      Withdraw
                    </span>
                    <p style={{ marginTop: "3%" }}>
                      By clicking "WITHDRAW" button, the funds collected from
                      nft sells, will be splitted using the percentages between
                      the 2 wallets.
                    </p>
                  </div>
                  <div className="mint_time">
                    <h4>Set Royalty Info</h4>
                    <input
                      type="text"
                      placeholder="Royalty Receiver"
                      onChange={(e) => handleRoyaltyA(e)}
                    ></input>
                    <input
                      type="number"
                      placeholder="Royalty fee"
                      onChange={(e) => handleRoyaltyF(e)}
                    ></input>
                    <span
                      className="metaportal_fn_button"
                      onClick={insertRoyalty}
                    >
                      Insert
                    </span>
                  </div>
                  <div className="mint_time">
                    <h4>Set NFT Receiver</h4>
                    <input
                      type="text"
                      placeholder="NFT Receiver"
                      onChange={(e) => handleReceiverChange(e)}
                    ></input>
                    <span
                      className="metaportal_fn_button"
                      onClick={updateReceiver}
                    >
                      Set Receiver
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default AdminPanel;
