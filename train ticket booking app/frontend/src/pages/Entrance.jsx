import React, { useState, useEffect, useCallback } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FiChevronLeft, FiChevronRight, FiPlay, FiPause } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaQuoteLeft, FaExpand } from 'react-icons/fa';
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import train from '../assets/trainlogo.png'
import Card from './Card';
export default function Entrance() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scrollPOsition, setScrollPosition] = useState(0)
    const [activeVideo, setActiveVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const position = window.pageYOffset;
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setScrollPosition(position)
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    window.addEventListener("scroll", toggleVisible);
    const video =
        { id: 1, src: 'https://videos.pexels.com/video-files/7429830/7429830-hd_1920_1080_25fps.mp4' } 

    const handleVideoClick = (video) => {
        setActiveVideo(video);
        setIsPlaying(true);
    };


    const blogPosts = [
        {
            id: 1,
            image: "https://cdn-icons-png.flaticon.com/512/3770/3770310.png",
            title: "Calculated Weather",
            description: "Built Wicket longer admire do barton vanity itself do in it."
        },
        {
            id: 2,
            image: "https://cdn.townweb.com/pelicanrapids.com/wp-content/uploads/2023/08/Pelican-Airport.png",
            title: "Best Flight",
            description: "Engrossed listening. Park gate sell they west hard for the"
        },
        {
            id: 3,
            image: "https://png.pngtree.com/element_our/20240624/6cc2e65895f22deb7c9e6c03edb63b32.png",
            title: "Local Events",
            description: "Barton vanity itself do in it engrossed listening."
        },
        {
            id: 4,
            image: "https://cdn-icons-png.flaticon.com/512/771/771203.png",
            title: "Customization",
            description: "We deliver outsourced aviation services for military customers."
        }, {
            id: 5,
            image: "https://cdn-icons-png.flaticon.com/512/3770/3770310.png",
            title: "Calculated Weather",
            description: "Built Wicket longer admire do barton vanity itself do in it."
        },
        {
            id: 6,
            image: "https://cdn.townweb.com/pelicanrapids.com/wp-content/uploads/2023/08/Pelican-Airport.png",
            title: "Best Flight",
            description: "Engrossed listening. Park gate sell they west hard for the"
        }
    ];
    const company = [
        {
            id: 1,
            image: "https://www.financialexpress.com/wp-content/uploads/2024/04/Wipro-Logo-PR-handout.png?w=440",
        },
        {
            id: 2,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgis1F4ulSuj4dJ3gS5I6AIx6nn1rp7sXtYQ&s",
        },
        {
            id: 3,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/2560px-Infosys_logo.svg.png",
        },
        {
            id: 4,
            image: "https://upload.wikimedia.org/wikipedia/commons/a/ac/ZOHO_New.png",
        }, {
            id: 5,
            image: "https://logos-marques.com/wp-content/uploads/2023/09/Accenture-logo-thmb-1280x720.png",
        },
        {
            id: 6,
            image: "https://brandeps.com/logo-download/T/TATA-Consultancy-Services-logo-01.png",
        }
    ];
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            review: "This product has completely transformed the way I work. It's intuitive, efficient, and a game-changer for my productivity.",
            backgroundColor: "bg-blue-100",
        },
        {
            id: 2,
            name: "Jane Smith",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            review: "I'm impressed with the level of customer support. The team goes above and beyond to ensure customer satisfaction.",
            backgroundColor: "bg-green-100",
        },
        {
            id: 3,
            name: "Mike Johnson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            review: "The quality of this product exceeded my expectations. It's durable, well-designed, and worth every penny.",
            backgroundColor: "bg-purple-100",
        },
    ];

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === blogPosts.length - 3 ? 0 : prevIndex + 1
        );
    }, [blogPosts.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? blogPosts.length - 3 : prevIndex - 1
        );
    };


    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(nextSlide, 3000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);


    return (
        <div className='parent'>
            {scrollPOsition > 700 && <button onClick={scrollToTop} class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full ms-4 fixed right-5 bottom-5">
                <i class="ri-arrow-up-line"></i>
            </button>}
            <header>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <div className='flex items-center'>
                        <img src={train} alt='train Logo' className=' h-14 sm:h-24' />
                    </div>
                    <nav className='sm:flex space-x-8'>
                        <a href='#5' className='hover:bg-yellow-500 hover:text-white px-3 py-3 rounded-md text-sm font-medium'>Destination</a>
                        <a href='#' className='hover:bg-yellow-500 hover:text-white px-3 py-3 rounded-md text-sm font-medium'>Hotels</a>
                        <a href='#' className='hover:bg-yellow-500 hover:text-white px-3 py-3 rounded-md text-sm font-medium'>Flight</a>
                        <a href='#' className='hover:bg-yellow-500 hover:text-white px-3 py-3 rounded-md text-sm font-medium'>Booking</a>
                        <a href='#' className='hover:bg-yellow-500 hover:text-white px-3 py-3 rounded-md text-sm font-medium'>Login</a>
                        <button className='font-bold py-2 px-4 rounded flex align-center gap-2 border-solid border-2'>Sign up</button>
                        <Menu as="div" className="text-left flex items-center">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    En
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a

                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            EN
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Hin
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </nav>
                </div>
            </header>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <article className="text-wrap ">
                    <h1 className='text-xl text-orange-500'>BEST DESTINATIONS AROUND THE WORLD</h1>
                    <h1 className='text-8xl mt-5'>Travel, enjoy and live a new and full life</h1>
                    <h1 className='text-base my-6'>Built Wicket longer admire do barton vaity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the travel.</h1>
                    <button class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded">
                        Find out more
                    </button>
                    <button onClick={() => handleVideoClick(video)} class="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full ms-4">
                        <i class="ri-play-large-fill"></i>
                    </button><h1 className='inline text-2xl ms-2'>Play Demo</h1>
                </article>
                {activeVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="relative w-full max-w-4xl">
                            <video
                                id="activeVideo"
                                src={activeVideo.src}
                                className="w-full rounded-lg shadow-2xl"
                                autoPlay={isPlaying}
                                controls
                            >
                                Your browser does not support the video tag.
                            </video>

                            <button
                                onClick={() => setActiveVideo(null)}
                                className="absolute top-4 right-4 text-white text-2xl font-bold"
                                aria-label="Close"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
                <div>
                    <img src="https://trueme.in/wp-content/uploads/2024/04/Traveller-1.svg" style={{ width: '180vw' }} alt="" />
                </div>
            </div>
            <div id='5' className='max-w-7xl mx-auto flex flex-col justify-center items-center mt-24'>
                <h1 className='text-3xl text-gray-500 mb-3'>Category</h1>
                <h1 className='text-5xl'>We Offer Best Services</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 linear"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 6)}%)`
                            }}
                        >
                            <Card blogPosts={blogPosts} keys={1} />
                        </div>
                    </div>
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Previous slide"
                    >
                        <FiChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Next slide"
                    >
                        <FiChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </div>
            <div className='max-w-7xl mx-auto flex flex-col justify-center items-center mt-24'>
                <h1 className='text-3xl text-gray-500 mb-3'>Top Selling</h1>
                <h1 className='text-5xl'>Top Destinations</h1>
            </div>
            <div className='max-w-7xl mx-auto flex justify-between items-center mt-24 mb-24'>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="h-96 w-96" src="https://assets.voxcity.com/uploads/blog_images/Iconic%20Landmarks%20in%20Rome_original.jpg" alt="Rome" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 flex justify-between">
                            <h1>Rome, Italy</h1>
                            <p>$50k</p>
                        </div>
                        <p class="text-gray-700 text-base">
                            <i class="ri-send-plane-fill"></i> 10 Days Trip
                        </p>
                    </div>
                </div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="h-96 w-96" src="https://thumbs.dreamstime.com/b/big-ben-london-england-uk-clock-tower-famous-icon-photo-taken-juillet-rd-57374380.jpg" alt="Rome" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 flex justify-between">
                            <h1>London, UK</h1>
                            <p>$5.4k</p>
                        </div>
                        <p class="text-gray-700 text-base">
                            <i class="ri-send-plane-fill"></i> 8 Days Trip
                        </p>
                    </div>
                </div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="h-96 w-96" src="https://stephentravels.com/wp-content/uploads/2019/07/finland_helsinki_uspenski-cathedral.jpg" alt="Rome" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2 flex justify-between">
                            <h1>Full Europe</h1>
                            <p>$15k</p>
                        </div>
                        <p class="text-gray-700 text-base">
                            <i class="ri-send-plane-fill"></i> 30 Days Trip
                        </p>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto flex justify-between items-center mb-24'>
                <div className='w-5/12'>
                    <h1 className='mb-3 text-3xl'>Easy and Fast</h1>
                    <h1 className='text-6xl'>Book your next trip in 3 easy steps</h1>
                    <div className='flex items-center my-5'>
                        <button className='bg-yellow-300 h-14 w-20 rounded mr-5'><i class="ri-shape-2-line"></i></button>
                        <div>
                            <h1>Choose Destination</h1>
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit totam repellendus id molestias. </h1>
                        </div>
                    </div>
                    <div className='flex items-center my-5'>
                        <button className='bg-orange-500 h-14 w-20 rounded mr-5'><i class="ri-wallet-3-line"></i></button>
                        <div>
                            <h1>Make Payment</h1>
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit totam repellendus id molestias. </h1>
                        </div>
                    </div>
                    <div className='flex items-center my-5'>
                        <button className='bg-violet-500 h-14 w-20 rounded mr-5'><i class="ri-roadster-line"></i></button>
                        <div>
                            <h1>Reach Airport on Selected Date</h1>
                            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit sit totam repellendus id molestias. </h1>
                        </div>
                    </div>
                </div>
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                    <img class="w-80 h-48 p-5 rounded-3xl" src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/07/1d/98/74.jpg" alt="Sunset in the mountains" />
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">Trip to Greece</div>
                        <p class="text-gray-700 text-base">
                            14-25 June | By Sk
                        </p>
                    </div>
                    <div className='flex justify-evenly'>
                        <button className='bg-gray-200 h-10 w-10 rounded-full'><i class="ri-leaf-fill"></i></button>
                        <button className='bg-gray-200 h-10 w-10 rounded-full'><i class="ri-map-2-line"></i></button>
                        <button className='bg-gray-200 h-10 w-10 rounded-full'> <i class="ri-send-plane-fill"></i></button>
                    </div>
                    <div className='mx-7 my-7 flex justify-between'>
                        <h1><i class="ri-group-line"></i> 24 people going</h1>
                        <i class="ri-heart-line"></i>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center mb-4">What Our Customers Say</h2>
                <p className="text-xl text-gray-600 text-center mb-12">Don't just take our word for it - hear from our satisfied customers</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card testimonials={testimonials} keys={3} />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / 6)}%)`
                            }}
                        >
                            <Card company={company} keys={2} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-40 py-24 border rounded-tl-3xl rounded-br-3xl news_letter'>
                <h3 className='font-bold  text-center text-5xl mb-16'>Subscribe to get information, latest news and other interesting offers about Cobham</h3>
                <form className='mt-4 flex justify-center'>
                    <input type='email' placeholder='Your email' className='p-2 rounded-l-lg border w-96' />
                    <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-lg'>Subscribe</button>
                </form>
            </div>
            <footer className="max-w-7xl mx-auto py-16">
                <div className="container mx-auto flex justify-between">
                    <div className="flex flex-col">
                        <img src={train} className='h-32 w-32 ' alt="" />
                        <p className="mb-4">Book your ticket in minute</p>
                    </div>

                    <nav className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Company</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400 transition">About</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Careers</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Mobile</a></li>
                        </ul>
                    </nav>
                    <nav className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Contact</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400 transition">Help/FAQ</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Press</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Affiliates</a></li>
                        </ul>
                    </nav>
                    <nav className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">More</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-gray-400 transition">Airlinefees</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Airline</a></li>
                            <li><a href="#" className="hover:text-gray-400 transition">Low fare tips</a></li>
                        </ul>
                    </nav>

                    <div className="flex flex-col">
                        <div className="flex space-x-4 mb-5">
                            <FaFacebook className="w-6 h-6 hover:text-gray-400 transition" />
                            <FaTwitter className="w-6 h-6 hover:text-gray-400 transition" />
                            <FaInstagram className="w-6 h-6 hover:text-gray-400 transition" />
                        </div>
                        <h2 className="text-xl font-bold ">Discover our app</h2>
                        <img src="https://static.vecteezy.com/system/resources/previews/024/237/966/non_2x/badge-google-play-and-app-store-button-download-free-vector.jpg" className='h-20' alt="" />
                    </div>

                </div>
                <div className="text-center mt-8 text-gray-400">
                    &copy; 2023 Ticket Booking Application. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
