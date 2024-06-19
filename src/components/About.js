import Link from "next/link";
import Countdown from "../components/Countdown";

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

const targetDate = new Date("2024-12-31T23:59:59").getTime();

export const About2 = (isActive) => (
  <section id="about2">
    <div className="fn_cs_collection_info">
      <h3 className="fn__gradient_title">10,500</h3>
      <h3 className="fn__maintitle upper" data-text="Total Items in Collection">
        Total Items in Collection
      </h3>
    </div>

    <div className="container small">
      <div className="fn_cs_shortabout">
        <div className="about_left">
          <h3 className="fn__maintitle" data-text="The Rise of Legends">
            The Rise of Legends
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <div className="desc">
            <p>
              Our journey with coins began around 1000 BC, not just as clinking
              currency, but as miniature works of art and halls of history into
              cultures. Imagine these gleaming discs of gold, silver, and
              bronze, meticulously crafted with intricate designs that
              whispering tales of their worth and origin. As empires rose and
              trade routes snaked across continents, coins became the lifeblood
              of commerce, greasing the wheels of economic exchange. Collecting
              coins, known as numismatics, are often referred to as History you
              can hold in your hands. has become a popular hobby and a way to
              preserve and study the history and artistry of coinage, and it is
              a fascinating hobby that combines history, art, and investment
              potential.{" "}
            </p>
            <p>
              The ZNF team is pioneering a new era in collectibles within the
              NFT world. We’re introducing ZNF-COIN Collectible NFTs, aiming to
              write a new chapter in blockchain history. We’re kicking things
              off with 10,500 unique ZNF-COINs across six distinct series, and
              we use only 10% of the power of AI. These cater to collectors
              interested in both collectible coins and blockchain investment.
              Our focus is on fostering a vibrant community and social
              interaction. This will revolutionize the world of collectible
              coins within the blockchain and create next-generation
              intellectual properties.{" "}
            </p>
            <p>
              ZNF presents a dual value proposition. We combine two essential
              components.
            </p>
            <ul>
              <li>
                The Initial Series Value (ISV) which represents the inherent
                worth of each NFT in the series. It unlocks future benefits and
                provides peace of mind, as this value remains constant, and
                comes with buyback option. This means the NFT holders have the
                option to sell back their NFTs at predetermined price, give them
                option ensures liquidity and flexibility.
              </li>
              <li>
                The Blockchain Value (BV) dynamically grows alongside our
                project, reflecting the overall success and development.
                <div
                  style={{
                    textAlign: "center",
                    width: "100%",
                    display: "block",
                    margin: "10px auto 20px",
                  }}
                >
                  ISV + BV = NFT Value
                </div>
                Become an owner and embark on an exciting journey into the world
                of collectible, generational intellectual properties embodied in
                collectible coins, and explore the fascinating world of ZNF-
                COIN. Let’s create a legacy — one ZNT-COIN at a time.
              </li>
            </ul>
          </div>
          <a
            href=""
            className="metaportal_fn_button"
            target="_blank"
            rel="noreferrer"
          >
            <span>Buy on Opensea</span>
          </a>
        </div>
        <div className="about_right">
          <div className="abs_img" data-bg-img="/img/chest.png" />
        </div>
      </div>
    </div>

    {/* !About Shortcode */}
    <div className="container">
      {/* Mint Shortcode */}
      <div className="fn_cs_mint">
        <div className="left_part">
          <h3 className="fn__maintitle" data-text="How to Mint">
            How to Mint
          </h3>
          <div className="fn_cs_divider">
            <div className="divider">
              <span />
              <span />
            </div>
          </div>
          <div className="desc">
            <p>
              The ZNF-COIN collection comprises over 10,500 unique collectible
              coins. These coins were meticulously cratied using Photoshop, with
              less than 10% of generative AI utilized for the entire project.{" "}
            </p>
            <p>
              Within this collection, there are six series, each NFT carrying
              two distinct values. The first value, known as the Initial Series
              Value (ISV), remains stable and guarantees buyback. The second
              value, the Blockchain Value (BV), dynamically grows alongside our
              project.{" "}
            </p>
            <p>
              The process to own one of our NFTs is simple: first, choose the
              series you’d like to own, and then mint your NFT to start your
              journey in the new world of NFTs.
            </p>
          </div>
        </div>
        <div className="right_part">
          {/* Steps Shortcode */}
          <div className="fn_cs_steps">
            <ul>
              {isActive.isActive.map((active, index) => (
                <li key={index}>
                  <div
                    className={active.active ? "item " + array[index] : "item"}
                  >
                    <div className="item_in">
                      <h3 className="fn__gradient_title">{names[index]}</h3>
                      {active.active ? (
                        <>
                          <Countdown targetTimestamp={active.endTime} />
                          <Link
                            href={{
                              pathname: "/nft-single",
                              query: { data: index },
                            }}
                          >
                            <a className="buttoncustomwhite">
                              <span>MINT</span>
                            </a>
                          </Link>
                        </>
                      ) : (
                        <h4>Not available!</h4>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* !Mint Shortcode */}
    </div>

    <div className="container">
      {/* !Steps Shortcode */}
      <div className="fn_cs_join">
        <div className="join_in">
          <h3 className="fn__maintitle upper" data-text="Join Our Community">
            Join Our Community
          </h3>
          <p>
            Are you ready to dive into the captivating world of collectible
            NFTs? Whether you’re a seasoned expert or just embarking on this
            journey, our vibrant community awaits you. Connect with like-minded
            individuals who share your enthusiasm, and together, let’s forge a
            legacy. These NFT coins aren’t just tokens; they’re gateways to
            creativity, innovation, and generational impact. Join us today, and
            let’s create something extraordinary—one NFT at a time!
          </p>
          <div className="buttons">
            <a
              href="https://x.com/znf_world"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>Find us on X</span>
            </a>
            <a
              href="https://discord.gg/Xwv7M8XjtY"
              className="metaportal_fn_button"
              target="_blank"
              rel="noreferrer"
            >
              <span>Find us on Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
