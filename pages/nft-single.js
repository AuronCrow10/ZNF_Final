import Link from "next/link";
import Layout from "../src/layout/Layout";
import { useEffect } from "react";
import { useState } from "react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { formatEther, parseEther, parseUnits } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import ABI from "../src/components/ABI.json";
import Countdown from "../src/components/Countdown";
import Modal from "../src/components/popup/Modal";

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

let isv = [100, 200, 500, 1000, 2000, 5000];

const targetDate = new Date("2024-12-31T23:59:59").getTime();

const NftSingle = () => {
  const [serie, setSerie] = useState("");
  const [loading, setLoading] = useState(true);
  const [canLoad, setLoad] = useState(false);
  const [load, setLd] = useState(true);
  const [item, setItem] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(0);
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);

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
  const [errDesc, setErrDesc] = useState(
    "There was an issue with your transaction, please check your balance or try again later!"
  );
  const [errString, setErr] = useState("Something went wrong!");

  const getQueryParams = (query) => {
    return query
      ? (/^[?#]/.test(query) ? query.slice(1) : query)
          .split("&")
          .reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value
              ? decodeURIComponent(value.replace(/\+/g, " "))
              : "";
            return params;
          }, {})
      : {};
  };
  useEffect(() => {
    const { data } = getQueryParams(window.location.search);
    setSerie(data);
    setImage(Number(data) + 101);
    setLoading(false);
  }, []);

  if (
    !loading &&
    serie != "0" &&
    serie != "1" &&
    serie != "2" &&
    serie != "3" &&
    serie != "4" &&
    serie != "5"
  ) {
    setLoad(true);
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  async function getData() {
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // The Contract object
    const myContract = new Contract(contractAddress, ABI, signer);
    const price = await myContract.calculatePrice(serie);
    const available = 3000;
    const sold = await myContract.serieToSells(serie);
    const eTime = await myContract.serieToEndTime(serie);
    const date = new Date(Number(eTime) * 1000);
    const sPrice = await myContract.getETHPrice();
    const balance = await myContract.balanceOf(address);
    let items = {
      price: formatEther(price).slice(0, 4),
      available: available - Number(serie) * 500,
      sold: available - Number(serie) * 500 - Number(sold),
      toMint: formatEther(price),
      endTime: date.toISOString(),
    };
    setLd(false);
    setItem(items);
    setPrice(sPrice);
    setBalance(balance);
  }

  async function mint() {
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // The Contract object
    const myContract = new Contract(contractAddress, ABI, signer);
    const price = calculate();
    console.log(serie);
    try {
      await (
        await myContract.mint(quantity, serie, {
          value: parseEther(price),
        })
      ).wait();
      getData();
      setErr("Minted Succesfully!");
      setErrDesc(
        "Your NFT has been minted succesfully. You can view it on your profile page!"
      );
      handleOpenModal();
    } catch (error) {
      if (error.info.error.message != undefined) {
        setErrDesc(error.info.error.message.slice(0, 50) + "...");
      } else if (error.reason != undefined) {
        setErrDesc(error.reason);
      }
      handleOpenModal();
    }
  }

  function calculate() {
    const price = item.toMint * quantity;
    let fPrice = 0;
    for (let i = 0; i < 10; i++) {
      if (parseEther(price.toFixed(8 + i)) > parseEther(price.toString())) {
        fPrice = price.toFixed(8 + i);
        break;
      }
    }
    return fPrice;
  }

  function increase() {
    if (quantity < 5) {
      setQuantity(quantity + 1);
    }
  }

  function decrease() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  if (load && walletProvider) {
    getData();
  }

  return (
    <Layout
      pageTitle={"Minting"}
      fnc={open}
      connected={isConnected}
      addr={address}
      balance={balance}
    >
      <div className="metaportal_fn_mintpage">
        <div className="container small">
          {/* Mint Top */}
          <div className="metaportal_fn_mint_top">
            <div className="mint_left">
              <div className="img">
                <div className="img_in">
                  <img src={"/img/" + image + ".png"} />
                </div>
              </div>
              <div>
                <Modal show={showModal} onClose={handleCloseModal}>
                  <h2>{errString}</h2>
                  <p>{errDesc}</p>
                </Modal>
              </div>
            </div>
            <div className="mint_right">
              <h3
                className="fn__maintitle"
                data-text={names[serie]}
                data-align="left"
              >
                {names[serie]}
              </h3>
              <div className="desc">
                <p>
                  This revolutionary and unique NFT combines two distinct values
                  within a single token—the Initial Series Value (ISV) and the
                  Blockchain Value (BV). By acquiring this NFT, you not only
                  join a groundbreaking movement but also contribute to a new
                  chapter in blockchain history.{" "}
                </p>
                <p>
                  Let’s forge a legacy together and enhance the value of your
                  personal collection!
                </p>
              </div>
            </div>
          </div>
          {/* !Mint Top */}
          {/* Mint Box */}
          {canLoad ? (
            <h2>Wrong Series Selected</h2>
          ) : (
            <div className="metaportal_fn_mintbox">
              <div className="mint_left">
                <div className="mint_title">
                  <span className={array[serie]}>Mint is Live</span>
                </div>
                <div className="mint_list">
                  <ul>
                    <li>
                      <div className="item">
                        <h4>Price </h4>
                        <h3>{Number(item.price) + " ETH"}</h3>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <h4>Remaining</h4>
                        <h3>{item.sold + "/" + item.available}</h3>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <h4>Quantity</h4>
                        <div className="qnt">
                          <span
                            className="decrease"
                            onClick={decrease}
                            style={{ fontWeight: "bold", marginRight: "2%" }}
                          >
                            -
                          </span>
                          <span className="summ" data-price="2.25">
                            {quantity}
                          </span>
                          <span
                            className="increase"
                            onClick={increase}
                            style={{ fontWeight: "bold", marginLeft: "2%" }}
                          >
                            +
                          </span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="item">
                        <h4>Total Price</h4>
                        <h3>
                          <span className="total_price">
                            {(
                              Number(item.toMint) *
                              Number(price) *
                              quantity
                            ).toFixed(2)}
                          </span>{" "}
                          USD + GAS
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="mint_desc">
                  <span className="metaportal_fn_button" onClick={mint}>
                    Mint Now
                  </span>
                  <p>
                    By clicking “MINT NOW” button, you agree to our{" "}
                    <a href="#">Terms of Service</a> and our{" "}
                    <a href="#">Privacy Policy</a>.
                  </p>
                </div>
              </div>
              <div className="mint_right">
                <div className="mright">
                  <div className="mint_time">
                    <h4>Mint Ends In</h4>
                    <Countdown
                      targetTimestamp={
                        item.endTime == undefined ? targetDate : item.endTime
                      }
                    />
                  </div>
                  <div className="mint_checked"></div>
                  <div className="mint_info">
                    <p>
                      You need to pay a GAS fee during minting. We allow max 5
                      mints per wallet. The entire amount will be deducted in
                      ETH.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default NftSingle;
