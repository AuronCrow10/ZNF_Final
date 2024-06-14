import dynamic from "next/dynamic";

const Counter = dynamic(() => import("./Counter"), {
  ssr: false,
});

const FunFacts = (supply, owners) => {
  return (
    <section id="fun_facts">
      <div className="container">
        <div className="fn_cs_counter_list">
          <ul>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={supply.supply} />
                  <span className="suffix" />
                </h3>
                <p>Total Items</p>
                <div className="divider" />
              </div>
            </li>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={supply.owners} />
                </h3>
                <p>Total Owners</p>
                <div className="divider" />
              </div>
            </li>
            <li>
              <div className="item">
                <h3 className="fn__gradient_title">
                  <span className="prefix" />
                  <Counter end={0.5} decimals={2} />
                  <span className="suffix" />
                </h3>
                <p>Base Price (ETH)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default FunFacts;
