import { useEffect } from "react";

const HeroSlider = () => {
  // Hero slider
  useEffect(() => {
    const fn_cs_slider = document.querySelectorAll(".fn_cs_slider");
    fn_cs_slider.forEach((element) => {
      let sliderTop = element.getElementsByClassName("slider_top")[0],
        sliderBottom = element.getElementsByClassName("slider_content"),
        activeIndex = 2,
        speed = 2000;

      let myInterval = setInterval(function () {
        activeIndex++;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
      }, speed);
      const prev = document.querySelector(".slider_nav .prev"),
        next = document.querySelector(".slider_nav .next"),
        li = element.getElementsByTagName("li");
      prev.addEventListener("click", function (e) {
        e.preventDefault();
        clearInterval(myInterval);
        activeIndex--;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex++;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      });
      next.addEventListener("click", (e) => {
        e.preventDefault();
        clearInterval(myInterval);
        activeIndex++;
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex--;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      });
      for (let i = 0; i < li.length; i++) {
        const liElement = li[i];
        const getClass = liElement.getAttribute("class");
        if (getClass === "next") {
          activeIndex++;
        } else if (getClass === "prev") {
          activeIndex--;
        } else {
          return false;
        }
        clearInterval(myInterval);
        activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        myInterval = setInterval(function () {
          activeIndex++;
          activeIndex = sliderDo(sliderTop, sliderBottom, activeIndex);
        }, speed);
        return false;
      }
    });
  }, []);

  const sliderDo = (sliderTop, sliderBottom, activeIndex) => {
    var topLength = sliderTop.getElementsByTagName("li").length;
    if (activeIndex > topLength) {
      activeIndex -= topLength;
    }
    var indexPrev = activeIndex - 1;
    var indexPrev2 = activeIndex - 2;
    var indexNext = activeIndex + 1;
    var indexNext2 = activeIndex + 2;
    if (indexPrev > topLength) {
      indexPrev -= topLength;
    }
    if (indexPrev2 > topLength) {
      indexPrev2 -= topLength;
    }
    if (indexNext > topLength) {
      indexNext -= topLength;
    }
    if (indexNext2 > topLength) {
      indexNext2 -= topLength;
    }
    if (indexPrev < 1) {
      indexPrev += topLength;
    }
    if (indexPrev2 < 1) {
      indexPrev2 += topLength;
    }
    if (activeIndex < 1) {
      activeIndex += topLength;
    }
    if (indexNext < 1) {
      indexNext += topLength;
    }
    if (indexNext2 < 1) {
      indexNext2 += topLength;
    }
    let li = sliderTop.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {
      const element = li[i];
      element.classList.remove("prev", "prev2", "active", "next", "next2");
      // element.setAttribute(`data-index${indexNext}`);
    }
    sliderTop
      .querySelector('li[data-index="' + indexPrev2 + '"]')
      .classList.add("prev2");
    sliderTop
      .querySelector('li[data-index="' + indexPrev + '"]')
      .classList.add("prev");
    sliderTop
      .querySelector('li[data-index="' + activeIndex + '"]')
      .classList.add("active");
    sliderTop
      .querySelector('li[data-index="' + indexNext + '"]')
      .classList.add("next");
    sliderTop
      .querySelector('li[data-index="' + indexNext2 + '"]')
      .classList.add("next2");
    return activeIndex;
  };

  return (
    <section id="home">
      <div className="container">
        {/*<h3
          className="fn__maintitle big"
          data-text="ZNF COIN"
          data-align="center"
        >
          ZNF COIN
        </h3>
        Slider */}
        <img src="/img/ZNF_logo.png" className="title_logo" />
        <div className="fn_cs_slider" data-responsive="on">
          <div className="slider_top">
            <img src="/img/1x1.jpg" alt="" />
            <ul>
              <li className="prev" data-index={1}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/1.png" />
                  </div>
                </div>
              </li>
              <li className="active" data-index={2}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/2.png" />
                  </div>
                </div>
              </li>
              <li className="next" data-index={3}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/3.png" />
                  </div>
                </div>
              </li>
              <li className="next2" data-index={4}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/4.png" />
                  </div>
                </div>
              </li>
              <li data-index={5}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/5.png" />
                  </div>
                </div>
              </li>
              <li data-index={6}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/6.png" />
                  </div>
                </div>
              </li>
              <li data-index={7}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/7.png" />
                  </div>
                </div>
              </li>
              <li data-index={8}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/8.png" />
                  </div>
                </div>
              </li>
              <li data-index={9}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/9.png" />
                  </div>
                </div>
              </li>
              <li data-index={10}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/10.png" />
                  </div>
                </div>
              </li>
              <li data-index={11}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/11.png" />
                  </div>
                </div>
              </li>
              <li data-index={12}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/12.png" />
                  </div>
                </div>
              </li>
              <li data-index={13}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/13.png" />
                  </div>
                </div>
              </li>
              <li data-index={14}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/14.png" />
                  </div>
                </div>
              </li>
              <li data-index={15}>
                <div className="item">
                  <img src="/img/1x1.jpg" alt="" />
                  <div className="item_in">
                    <div className="img" data-bg-img="/img/15.png" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="slider_nav">
            <a href="#" className="prev">
              <span className="circle" />
              <span className="icon">
                <img src="/svg/down.svg" alt="" className="fn__svg" />
              </span>
              <span className="circle" />
            </a>
            <a href="#" className="next">
              <span className="circle" />
              <span className="icon">
                <img src="/svg/down.svg" alt="" className="fn__svg" />
              </span>
              <span className="circle" />
            </a>
          </div>
        </div>
        {/* !Slider */}
        {/* Description */}
        <div className="fn_cs_desc">
          <p>
            <b>ZNF-COIN</b> represents a collection of 10,500 collectible coins
            categorized into six series, with each series holding two values.
            The first value is the <b>Initial Series Value (ISV)</b>, which
            represents the inherent worth of each NFT in the series. It remains
            stable and guarantees buyback. The second value is the{" "}
            <b>Blockchain Value (BV)</b>, which dynamically grows alongside our
            project. The ZNF-COINs are stored as ERC-721 tokens on the Ethereum
            blockchain and hosted on IPFS.
          </p>
        </div>
        {/* !Description */}
      </div>
    </section>
  );
};
export default HeroSlider;
