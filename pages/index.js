import About from "../src/components/About";
import Collection from "../src/components/Collection";
import FunFacts from "../src/components/FunFacts";
import HeroSlider from "../src/components/HeroSlider";
import RoadMapSlider from "../src/components/RoadMapStep";
import SectionDivider from "../src/components/SectionDivider";
import Layout from "../src/layout/Layout";
import { About2 } from "../src/components/About";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { useWeb3Modal, useWeb3ModalState } from "@web3modal/ethers/react";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits, getAddress } from "ethers";
import ABI from "../src/components/ABI.json";
import React, { useState } from "react";
import Modal from "react-modal";

const { Alchemy, Network } = require("alchemy-sdk");
const config = {
  apiKey: "zGPmNTo5IY3XB05quux8C0HWIuDl9VMV",
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

const Index = () => {
  const contractAddress = "0x73dF0310829e4eD0AD4C82B0A117a74Cd0856e03";

  const projectId = "e1b5abe839a71edd27768a2617f23b97";

  // 2. Set chains
  const mainnet = {
    chainId: 11155111,
    name: "Sepolia",
    currency: "ETH",
    explorerUrl: "https://sepolia.etherscan.io/",
    rpcUrl: "https://sepolia.drpc.org",
  };

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

  const [isOwner, setOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [supply, setSupply] = useState(0);
  const [owners, setOwners] = useState(0);
  const [isActive, setActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [endTime, setTime] = useState([]);

  async function getData() {
    setLoading(false);
    const ethersProvider = new BrowserProvider(walletProvider);
    const signer = await ethersProvider.getSigner();
    // The Contract object
    const myContract = new Contract(contractAddress, ABI, signer);
    const total = await myContract.totalSupply();
    const owner = await myContract.owner();
    const owners = await alchemy.nft.getOwnersForContract(contractAddress);
    const balance = await myContract.balanceOf(address);
    let activated = [];
    for (let i = 0; i < 6; i++) {
      const isActive = await myContract.isSerieActive(i);
      const time = await myContract.serieToEndTime(i);
      const date = new Date(Number(time) * 1000);
      activated.push({
        active: isActive,
        endTime: date.toISOString(),
      });
    }
    setSupply(Number(total));
    setActive(activated);
    setOwners(Number(owners.owners.length));
    setBalance(balance);

    if (getAddress(owner) == address) {
      setOwner(true);
    }
  }

  if (loading && walletProvider) {
    getData();
  }

  return (
    <Layout
      pageTitle={"Home"}
      fnc={open}
      connected={isConnected}
      addr={address}
      isOwner={isOwner}
      balance={balance}
    >
      <HeroSlider />
      <FunFacts supply={supply} owners={owners} />
      {/*<About/>*/}
      <About2 isActive={isActive} />
      <SectionDivider />
      {/* <RoadMapSlider /> */}
      {/*<SectionDivider />
		<Collection />*/}
    </Layout>
  );
};
export default Index;
