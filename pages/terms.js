import Layout from "../src/layout/Layout";
import PageBanner from "../src/layout/PageBanner";
const TermsConditions = () => {
  return (
    <Layout pageTitle={"Terms & Conditions"}>
      <PageBanner pageName={"Terms & Conditions"} />

      <div className="metaportal_fn_privacy">
        <div className="container small">
          <h3
            className="fn__maintitle"
            data-text="Acceptance of this Privacy Policy"
          >
            Acceptance of this Privacy Policy
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            Welcome to ZNF-COIN. These Terms and Conditions govern your
            purchase, ownership, and use of the non-fungible tokens (NFTs) from
            ZNFCOIN. By purchasing an NFT from this project, you agree to be
            bound by these Terms and Conditions, as well as any terms
            incorporated by reference.<br></br>
            <br></br>
            We may update or modify these Terms at our discretion. If we do so,
            we will post the changes on this page and indicate the date of the
            last revision. We will also notify you through the Site user
            interface, email, or other reasonable means. Your continued use of
            the Site, Services, or any NFTs after the effective date of such
            changes constitutes your acceptance of the new Terms of Use
          </p>
          <h3 className="fn__maintitle" data-text="Ownership">
            Ownership
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            The NFTs provided on the Website are digital assets created by the
            ZNF-COIN team. These assets are deployed on blockchain networks that
            maintain ledgers of all transactions, including NFT transfers. NFT
            ownership is determined by controlling the private key associated
            with a public address on the relevant network. Once purchased, you
            own the NFT, represented by a digital certificate of ownership on
            the blockchain. ZNF-COIN does not have custody or control over the
            NFTs once minted
          </p>
          <p>
            NFTs purchased on this website can be bought, sold, and traded on
            third-party NFT marketplaces (“secondary markets”) that support
            NFTs. Any secondary transactions on such markets will be subject to
            the terms and conditions of those markets. ZNF-COIN is not a party
            to any secondary transactions and does not guarantee the
            availability or functionality of any secondary market. Secondary
            transactions involving NFTs created by us require the payment of a
            5% royalty.
          </p>
          <h3 className="fn__maintitle" data-text="Usage Rights">
            Usage Rights
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            Upon completing the payment process for an NFT purchase, users
            become rightful owners of the corresponding NFT. However,
            intellectual property rights related to NFTs remain the property of
            ZNF-COIN.
          </p>
          <p>
            Users have the right to use the NFTs, subject to the following
            restrictions:
          </p>
          <ul style={{ listStyleType: "circle" }}>
            <li>Users may use NFTs as their profile pictures</li>
            <li>
              Users may not infringe on ZNF’s intellectual property rights
            </li>
            <li>
              Users may not copy, distribute, display, or use NFTs for
              commercial purposes without express permission from ZNF-COIN.
            </li>
            <li>
              Users may not use NFTs in a manner that is illegal, infringes on
              any third party’s intellectual property rights, or is otherwise
              objectionable or damaging to ZNF-COIN or any third party.
            </li>
          </ul>
          <h3 className="fn__maintitle" data-text="Termination">
            Termination
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            ZNF-COIN may terminate this license at any time if you breach these
            Terms and Conditions. For the sake of clarity, a breach of these
            Terms and Conditions includes, but is not limited to, failing to pay
            for an NFT, using an NFT for illegal purposes, or commercially
            exploiting an NFT without permission
          </p>
          <h3 className="fn__maintitle" data-text="Disclaimers">
            Disclaimers
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            ZNF-COIN is not responsible for service interruptions caused by
            technical failures or losses resulting from force majeure events,
            such as natural disasters or war.
          </p>
          <h3 className="fn__maintitle" data-text="Limitation of Liability">
            Limitation of Liability
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          ZNF-COIN will not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits or
          revenues, whether incurred directly or indirectly.
          <h3 className="fn__maintitle" data-text="Governing Law">
            Governing Law
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            These Terms will be governed by and interpreted in accordance with
            the laws of USA.
          </p>
          <h3 className="fn__maintitle" data-text="Dispute Resolution">
            Dispute Resolution
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <p>
            In the event of a dispute arising out of or relating to these Terms
            and Conditions, the parties agree to attempt to resolve the dispute
            through informal negotiation. If the parties are unable to resolve
            the dispute through informal negotiation, they agree to binding
            arbitration in accordance with the rules of the American Arbitration
            Association. The arbitration shall be held in Santa Clara County,
            California, and the decision of the arbitrator shall be final and
            binding on the parties.
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default TermsConditions;
