import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { navigationToggle, walletToggle } from "../redux/actions/siteSettings";
import { stickyNav } from "../utilits";

const Header = ({
  navigationToggle,
  open,
  isConnected,
  address,
  owner,
  balance,
}) => {
  useEffect(() => {
    stickyNav();
  }, []);

  let string = "Connect Wallet";

  if (isConnected) {
    string = address.slice(0, 4) + "..." + address.slice(36, 42);
  }

  return (
    <header id="header">
      <div className="header">
        <div className="header_in">
          <div className="trigger_logo">
            <div className="trigger" onClick={() => navigationToggle(true)}>
              <span />
            </div>
            <div className="logo">
              <Link href="/">
                <a>
                  <img src="/img/ZNF_logo.png" alt="" />
                </a>
              </Link>
            </div>
          </div>
          <div className="nav" style={{ opacity: 1 }}>
            <ul>
              <li>
                <Link href="/#home">
                  <a className="creative_link">Home</a>
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
          <div className="wallet">
            <a
              href="#"
              onClick={() => open()}
              className="metaportal_fn_button wallet_opener"
            >
              <span>{string}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { walletToggle, navigationToggle })(
  Header
);
