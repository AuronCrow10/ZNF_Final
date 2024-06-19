import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
import { getNfts } from "../src/redux/actions/nfts";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
const Collection = ({ getNfts, nfts }) => {
  const contractAddress = "0x384514A553304a14DBFF07F146dF497D4d787a35";

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

  useEffect(() => {
    getNfts();
  }, []);
  const getSplitData = (type) => {
    return type.split(" ").join("-");
  };
  return (
    <Layout
      pageTitle={"Collection"}
      fnc={open}
      connected={isConnected}
      addr={address}
    >
      <PageBanner pageName={"Collection"} />

      {/* Collection Page */}
      <div className="metaportal_fn_collectionpage">
        <div className="container">
          <div className="metaportal_fn_collection">
            {/* Filters */}

            {/* !Filters */}
            <div className="metaportal_fn_clist">
              {/* Result Box */}
              {/* Result List */}
              <div className="metaportal_fn_result_list">
                <div className="metaportal_fn_drops">
                  <ul className="grid">
                    {nfts &&
                      nfts.map((nft, i) => (
                        <li
                          className={
                            getSplitData(nft.type) +
                            " " +
                            getSplitData(nft.special) +
                            " " +
                            getSplitData(nft.clothing)
                          }
                          key={i}
                        >
                          <div className="nft__item">
                            <div className="img_holder">
                              <img src={nft.image} alt="" />
                              <Link href="#">
                                <a className="full_link" />
                              </Link>
                            </div>
                            <div className="title_holder">
                              <h3 className="fn_title">
                                <Link href="#">{nft.title}</Link>
                                {/* {`/nft/${nft.id}`} */}
                              </h3>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              {/* !Result List */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  nfts: state.nfts.data,
});

export default connect(mapStateToProps, { getNfts })(Collection);
