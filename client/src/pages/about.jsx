import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { FreeMode, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "../index.css"

const About = () => {
	function Content(props){
		return (
			<div className="mb-12 text-xs">
				<svg className="float-left w-10 mr-2" width="100%" height="100%" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d={props.path} fill="#00A15D"/>
				</svg>
				<p>{props.text}</p>
			</div>
		)
	}
	return (
		<div className="w-full h-full">
			<h1 className="bg-mt-green mt-6 h-14 text-white text-xl font-dm font-bold flex items-center justify-center">About us.</h1>
			<div className="mx-4">
				<div className="mt-6 mx-auto">
					<div className="relative">
						<svg className="relative w-5"width="100%" height="100%" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.74769 0.51275C6.828 0.63424 6.88221 0.769495 6.90724 0.910794C6.93226 1.05209 6.9276 1.19667 6.89353 1.33627C6.85946 1.47586 6.79664 1.60775 6.70866 1.72439C6.62068 1.84103 6.50926 1.94015 6.38077 2.01608C4.97571 2.84233 3.85985 4.04233 3.17308 5.46567C3.86756 5.41076 4.5634 5.55533 5.16957 5.88046C5.77573 6.20559 6.26398 6.69615 6.57043 7.28794C6.87689 7.87974 6.98729 8.54521 6.88717 9.1973C6.78706 9.84939 6.4811 10.4577 6.00933 10.9427C5.53756 11.4277 4.92194 11.7667 4.24303 11.9155C3.56411 12.0643 2.85351 12.0158 2.2042 11.7765C1.55489 11.5371 0.997111 11.118 0.603834 10.5741C0.210557 10.0301 0.000101008 9.38654 0 8.72762V8.69816C0.000901853 8.6137 0.00475009 8.52929 0.0115384 8.44506C0.0219231 8.28142 0.0426923 8.05232 0.0830769 7.77085C0.163846 7.2112 0.321923 6.43989 0.641538 5.57368C1.27846 3.83906 2.56846 1.69534 5.15769 0.165828C5.28618 0.0898963 5.42924 0.038638 5.57868 0.0149789C5.72813 -0.0086803 5.88104 -0.00427678 6.02868 0.027938C6.17633 0.0601528 6.31582 0.119548 6.43918 0.202732C6.56255 0.285916 6.66738 0.391261 6.74769 0.51275ZM14.8246 0.51275C14.9049 0.63424 14.9591 0.769495 14.9842 0.910794C15.0092 1.05209 15.0045 1.19667 14.9705 1.33627C14.9364 1.47586 14.8736 1.60775 14.7856 1.72439C14.6976 1.84103 14.5862 1.94015 14.4577 2.01608C13.0526 2.84228 11.9367 4.0423 11.25 5.46567C11.9445 5.41076 12.6403 5.55533 13.2465 5.88046C13.8526 6.20559 14.3409 6.69615 14.6474 7.28794C14.9538 7.87974 15.0642 8.54521 14.9641 9.1973C14.864 9.84939 14.558 10.4577 14.0863 10.9427C13.6145 11.4277 12.9989 11.7667 12.3199 11.9155C11.641 12.0643 10.9304 12.0158 10.2811 11.7765C9.63181 11.5371 9.07403 11.118 8.68076 10.5741C8.28748 10.0301 8.07702 9.38654 8.07692 8.72762V8.69816C8.07782 8.6137 8.08167 8.52929 8.08846 8.44506C8.09884 8.28142 8.11961 8.05232 8.16 7.77085C8.24077 7.2112 8.39884 6.43989 8.71846 5.57368C9.35538 3.83906 10.6454 1.69534 13.2346 0.165828C13.3631 0.0898963 13.5062 0.038638 13.6556 0.0149789C13.805 -0.0086803 13.958 -0.00427678 14.1056 0.027938C14.2533 0.0601528 14.3927 0.119548 14.5161 0.202732C14.6395 0.285916 14.7443 0.391261 14.8246 0.51275Z" fill="url(#paint0_linear_223_1519)"/>
							<defs>
								<linearGradient id="paint0_linear_223_1519" x1="7.5" y1="0" x2="8.01577" y2="25.7477" gradientUnits="userSpaceOnUse">
									<stop stop-color="#00A15D"/>
									<stop offset="1" stop-color="#222222"/>
								</linearGradient>
							</defs>
						</svg>
						<p className="text-xs text-center w-3/4 mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci temporibus, atque culpa recusandae nesciunt expedita sint, quia mollitia sapiente.</p>
						<svg className="relative w-5 me-0 ms-auto" width="100%" height="100%" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.70215 11.4872C7.6272 11.3658 7.5766 11.2305 7.55325 11.0892C7.52989 10.9479 7.53424 10.8033 7.56604 10.6637C7.59784 10.5241 7.65647 10.3923 7.73858 10.2756C7.8207 10.159 7.92469 10.0598 8.04462 9.98392C9.35601 9.15767 10.3975 7.95767 11.0385 6.53433C10.3903 6.58924 9.74082 6.44467 9.17507 6.11954C8.60932 5.79441 8.15362 5.30385 7.8676 4.71206C7.58157 4.12026 7.47853 3.45479 7.57197 2.8027C7.66541 2.15062 7.95097 1.54228 8.39129 1.0573C8.83161 0.572312 9.40619 0.23326 10.0398 0.0844994C10.6735 -0.0642605 11.3367 -0.0158014 11.9427 0.223539C12.5488 0.46288 13.0694 0.881954 13.4364 1.42593C13.8035 1.96991 13.9999 2.61346 14 3.27238V3.30184C13.9992 3.3863 13.9956 3.47071 13.9892 3.55494C13.9795 3.71858 13.9602 3.94768 13.9225 4.22915C13.8471 4.78881 13.6995 5.56011 13.4012 6.42632C12.8068 8.16094 11.6028 10.3047 9.18615 11.8342C9.06623 11.9101 8.93271 11.9614 8.79323 11.985C8.65375 12.0087 8.51103 12.0043 8.37323 11.9721C8.23543 11.9398 8.10524 11.8805 7.99009 11.7973C7.87495 11.7141 7.77711 11.6087 7.70215 11.4872ZM0.163695 11.4872C0.0887403 11.3658 0.0381403 11.2305 0.0147858 11.0892C-0.00856972 10.9479 -0.00422192 10.8033 0.0275784 10.6637C0.0593786 10.5241 0.118011 10.3923 0.200125 10.2756C0.28224 10.159 0.38623 10.0598 0.506156 9.98392C1.81759 9.15772 2.85907 7.9577 3.5 6.53433C2.85182 6.58924 2.20236 6.44467 1.63661 6.11954C1.07086 5.79441 0.615162 5.30385 0.329135 4.71206C0.043107 4.12026 -0.059927 3.45479 0.0335112 2.8027C0.12695 2.15062 0.412511 1.54228 0.852832 1.0573C1.29315 0.572312 1.86773 0.23326 2.50138 0.0844994C3.13504 -0.0642605 3.79826 -0.0158014 4.40428 0.223539C5.01031 0.46288 5.5309 0.881954 5.89796 1.42593C6.26502 1.96991 6.46145 2.61346 6.46154 3.27238V3.30184C6.4607 3.3863 6.45711 3.47071 6.45077 3.55494C6.44108 3.71858 6.42169 3.94768 6.384 4.22915C6.30862 4.78881 6.16108 5.56011 5.86277 6.42632C5.26831 8.16094 4.06431 10.3047 1.64769 11.8342C1.52777 11.9101 1.39425 11.9614 1.25477 11.985C1.11529 12.0087 0.97257 12.0043 0.834768 11.9721C0.696966 11.9398 0.566777 11.8805 0.451634 11.7973C0.336492 11.7141 0.238649 11.6087 0.163695 11.4872Z" fill="url(#paint0_linear_223_1521)"/>
							<defs>
								<linearGradient id="paint0_linear_223_1521" x1="7" y1="12" x2="6.44743" y2="-13.7462" gradientUnits="userSpaceOnUse">
									<stop stop-color="#00A15D"/>
									<stop offset="1" stop-color="#222222"/>
								</linearGradient>
							</defs>
						</svg>
					</div>
				</div>
				<h2 className="font-bold text-center mt-10">Mov'Trip, <span className="text-mt-green">more than</span> a newspaper</h2>
				<p className="text-xs mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptates atque eum suscipit earum odio corporis, modi ratione obcaecati eligendi molestias. Velit consequuntur eum animi minus sunt placeat ducimus a?</p> 
				<br />
				<p className="text-xs mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut reprehenderit dolore magni voluptates ipsum explicabo praesentium voluptatem aut earum consequatur perspiciatis nemo quos, sapiente cumque omnis sed deserunt veniam! Dolores!</p>
				<img className="mx-auto" src="https://www.indivstock.com/static21/preview1/stock-photo-live-229022.jpg" alt="img" />
			</div>
			<h2 className="font-bold text-center mt-10 mb-4">Our values</h2>
			<div className="w-10/12 mx-auto">
				<Swiper
					freeMode={true}
					pagination={{clickable:true}}
					modules={[Pagination]}
					className="mySwiper"
				>
					<SwiperSlide>
						<Content
							path="M4.608 23V5.272L0.928 6.136V3L6.336 0.599998H8.864V23H4.608ZM13.9113 23.224C13.1646 23.224 12.5459 22.9893 12.0553 22.52C11.5859 22.0507 11.3513 21.4853 11.3513 20.824C11.3513 20.1413 11.5859 19.5653 12.0553 19.096C12.5459 18.6267 13.1646 18.392 13.9113 18.392C14.6579 18.392 15.2659 18.6267 15.7352 19.096C16.2259 19.5653 16.4713 20.1413 16.4713 20.824C16.4713 21.4853 16.2259 22.0507 15.7352 22.52C15.2659 22.9893 14.6579 23.224 13.9113 23.224Z"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit labore repellendus deleniti voluptas nihil amet tenetur dolores et obcaecati! Consequatur sint labore magni nisi, voluptatum earum. Cum labore expedita repudiandae!"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Content
							path="M0.632 23V20.024C1.99733 18.8933 3.32 17.7733 4.6 16.664C5.90133 15.5547 7.05333 14.456 8.056 13.368C9.08 12.28 9.89067 11.224 10.488 10.2C11.1067 9.15467 11.416 8.14133 11.416 7.16C11.416 6.24267 11.16 5.432 10.648 4.728C10.1573 4.024 9.336 3.672 8.184 3.672C7.01067 3.672 6.12533 4.056 5.528 4.824C4.93067 5.592 4.632 6.52 4.632 7.608H0.664C0.706667 5.96533 1.06933 4.6 1.752 3.512C2.43467 2.40267 3.34133 1.58133 4.472 1.048C5.60267 0.493333 6.872 0.216 8.28 0.216C10.5627 0.216 12.3333 0.845332 13.592 2.104C14.872 3.34133 15.512 4.952 15.512 6.936C15.512 8.17333 15.224 9.37867 14.648 10.552C14.0933 11.7253 13.3573 12.856 12.44 13.944C11.5227 15.032 10.5307 16.056 9.464 17.016C8.39733 17.9547 7.36267 18.8293 6.36 19.64H16.056V23H0.632ZM20.1613 23.224C19.4146 23.224 18.7959 22.9893 18.3053 22.52C17.8359 22.0507 17.6013 21.4853 17.6013 20.824C17.6013 20.1413 17.8359 19.5653 18.3053 19.096C18.7959 18.6267 19.4146 18.392 20.1613 18.392C20.9079 18.392 21.5159 18.6267 21.9853 19.096C22.4759 19.5653 22.7213 20.1413 22.7213 20.824C22.7213 21.4853 22.4759 22.0507 21.9853 22.52C21.5159 22.9893 20.9079 23.224 20.1613 23.224Z"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit labore repellendus deleniti voluptas nihil amet tenetur dolores et obcaecati! Consequatur sint labore magni nisi, voluptatum earum. Cum labore expedita repudiandae!"
						/>
					</SwiperSlide>
					<SwiperSlide>
						<Content
							path="M8.504 23.384C7.032 23.384 5.69867 23.128 4.504 22.616C3.30933 22.0827 2.34933 21.272 1.624 20.184C0.898667 19.096 0.514667 17.7307 0.472 16.088H4.504C4.52533 17.176 4.87733 18.0933 5.56 18.84C6.264 19.5653 7.24533 19.928 8.504 19.928C9.69867 19.928 10.616 19.5973 11.256 18.936C11.896 18.2747 12.216 17.4427 12.216 16.44C12.216 15.2667 11.7893 14.3813 10.936 13.784C10.104 13.1653 9.02667 12.856 7.704 12.856H6.04V9.496H7.736C8.824 9.496 9.73067 9.24 10.456 8.728C11.1813 8.216 11.544 7.45867 11.544 6.456C11.544 5.624 11.2667 4.96266 10.712 4.472C10.1787 3.96 9.432 3.704 8.472 3.704C7.42667 3.704 6.60533 4.01333 6.008 4.632C5.432 5.25067 5.112 6.008 5.048 6.904H1.048C1.13333 4.83467 1.848 3.20267 3.192 2.008C4.55733 0.813333 6.31733 0.216 8.472 0.216C10.008 0.216 11.2987 0.493333 12.344 1.048C13.4107 1.58133 14.2107 2.296 14.744 3.192C15.2987 4.088 15.576 5.08 15.576 6.168C15.576 7.42667 15.224 8.49333 14.52 9.368C13.8373 10.2213 12.984 10.7973 11.96 11.096C13.2187 11.352 14.2427 11.9707 15.032 12.952C15.8213 13.912 16.216 15.128 16.216 16.6C16.216 17.8373 15.9173 18.968 15.32 19.992C14.7227 21.016 13.848 21.8373 12.696 22.456C11.5653 23.0747 10.168 23.384 8.504 23.384ZM20.9425 23.224C20.1958 23.224 19.5772 22.9893 19.0865 22.52C18.6172 22.0507 18.3825 21.4853 18.3825 20.824C18.3825 20.1413 18.6172 19.5653 19.0865 19.096C19.5772 18.6267 20.1958 18.392 20.9425 18.392C21.6892 18.392 22.2972 18.6267 22.7665 19.096C23.2572 19.5653 23.5025 20.1413 23.5025 20.824C23.5025 21.4853 23.2572 22.0507 22.7665 22.52C22.2972 22.9893 21.6892 23.224 20.9425 23.224Z"
							text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit labore repellendus deleniti voluptas nihil amet tenetur dolores et obcaecati! Consequatur sint labore magni nisi, voluptatum earum. Cum labore expedita repudiandae!"
						/>
					</SwiperSlide>
				</Swiper>
				{/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem ab omnis nisi ratione eum corporis, expedita, perspiciatis aperiam incidunt fuga animi tempora, voluptatibus blanditiis! Ipsa nihil a consectetur incidunt ullam!</p> */}
			</div>
			<div className="flex justify-center mt-12">
				<button className="bg-mt-green text-white font-bold rounded-full py-2 px-12">Contact us</button>
			</div>
		</div>
	)
}

export default About;