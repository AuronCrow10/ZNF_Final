import { Swiper, SwiperSlide } from "swiper/react";
import { roadMapProps } from "../sliderProps";
const RoadMapSlider = () => {
	return (
		<section id="roadmap">
			<div className="container">
				<h3
					className="fn__maintitle big"
					data-text="RoadMap"
					data-align="center"
				>
					RoadMap
				</h3>
				<div className="fn_cs_roadmap">
					<div className="step_holder">
						<div className="step_in" />
					</div>
					<div className="slider_holder">
						<Swiper {...roadMapProps} className="swiper-container">
							<div className="swiper-wrapper">
								<SwiperSlide className="swiper-slide">
									<div className="item">
										<span className="icon" />
										<span className="phase">Phase 01</span>
										<div className="item_in">
											{/*<p className="date">October 09, 2022</p>*/}
											<h3 className="title"><b>The Adventure Begins</b>, Launch Preparation Community Building</h3>
											<p className="desc">
												<ul>
													<li>Grow our Discord and social media following, fostering an engaged and enthusiastic community.</li>
													<li>Introduce our official project website for information, updates, and FAQs.</li>
													<li>Publish a detailed whitepaper explaining our vision, technology, and future plans.</li>
												</ul>
											</p>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="swiper-slide">
									<div className="item">
										<span className="icon" />
										<span className="phase">Phase 02</span>
										<div className="item_in">
											<h3 className="title">Lift-off! The Official Launch and NFT Drop</h3>
											<p className="desc">
												<ul>
													<li>Lights, Camera, Action! Reveal the details of our first NFT collection, including themes, total supply, and minting process</li>
													<li>Early Bird Perks: Be among the first to embark on this adventure! Our inaugural minting event will offer exclusive benefits for our earliest supporters, rewarding their unwavering belief in our vision.</li>
												</ul>
											</p>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="swiper-slide">
									<div className="item">
										<span className="icon" />
										<span className="phase">Phase 03</span>
										<div className="item_in">
											<h3 className="title">Expansion and Utility - Building a Thriving Ecosystem</h3>
											<p className="desc">
												<ul>
													<li>Our NFTs will take flight! We'll ensure they're listed on leading secondary
marketplaces, allowing seamless trading and fostering a thriving community.</li>
													<li>Your voice matters! We'll introduce governance features, allowing NFT holders to actively participate in shaping the future of our project through voting on key developments.</li>
												</ul>
											</p>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="swiper-slide">
									<div className="item">
										<span className="icon" />
										<span className="phase">Phase 04</span>
										<div className="item_in">
											<h3 className="title">Ecosystem Growth Merchandise Line</h3>
											<p className="desc">
												<ul>
													<li>Begin integrating utility features, and launch an exclusive merchandise line available only for NFT holders.</li>
													<li>Expand the utility of NFTs within our ecosystem, including new experiences and rewards.</li>
													<li>Forge new partnerships to bring additional value and opportunities to our community</li>
												</ul>
											</p>
										</div>
									</div>
									</SwiperSlide>

							</div>
						</Swiper>
					</div>
				</div>
			</div>
		</section>
	);
};
export default RoadMapSlider;
