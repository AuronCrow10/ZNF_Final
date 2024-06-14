import Link from "next/link";
import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
const MobileNavigation = ({
  walletToggle,
  navigationToggle,
  open,
  isConnected,
  address,
  owner,
  balance,
}) => {
  const [toggle, setToggle] = useState(false);

  let string = "Connect Wallet";

  if (isConnected) {
    string = address.slice(0, 4) + "..." + address.slice(36, 42);
  }

  return (
    <Fragment>
      <div className="metaportal_fn_mobnav">
        <div className="mob_top">
          <div className="social_trigger">
            <div className="trigger" onClick={() => navigationToggle(true)}>
              <span />
            </div>
          </div>
          <div className="wallet">
            <a
              href="#"
              className="metaportal_fn_button wallet_opener"
              onClick={() => open()}
            >
              <span>{string}</span>
            </a>
          </div>
        </div>
        <div className="mob_mid">
          <div className="logo">
            <Link href="/">
              <a>
                <img src="/img/ZNF_logo.png" alt="" />
              </a>
            </Link>
          </div>
          <div
            className={`trigger ${toggle ? "active" : ""}`}
            onClick={() => setToggle(!toggle)}
          >
            <span />
          </div>
        </div>
        <div className="mob_bot" style={{ display: toggle ? "block" : "none" }}>
          <ul>
            <li>
              <a className="creative_link" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="creative_link" href="#roadmap">
                Roadmap
              </a>
            </li>
            <li>
              <Link className="creative_link" href="/collection">
                Collection
              </Link>
            </li>
            {balance > 0 ? (
              <li>
                <Link href="/profile">
                  <a className="creative_link">Profile</a>
                </Link>
              </li>
            ) : (
              ""
            )}
            {owner ? (
              <li>
                <Link href="/Admin">
                  <a className="creative_link">Admin Panel</a>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  navigation: state.site.navigation,
});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  MobileNavigation
);
