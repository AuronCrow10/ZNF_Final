import Link from "next/link";
const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <div className="left_part">
            <p>
              Copyright 2024 — Designed &amp; Developed by{" "}
              <a
                href="https://www.fiverr.com/auroncrow/create-smart-contracts-nfts-token-dapp"
                target="_blank"
                rel="noreferrer"
              >
                ZNF Team
              </a>
            </p>
          </div>
          <div className="right_part">
            <ul>
              <li>
                <Link href="/terms">
                  <a className="creative_link">Terms &amp; Conditions</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
