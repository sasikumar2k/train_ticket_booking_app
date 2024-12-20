import React from 'react'
import {FaQuoteLeft } from 'react-icons/fa';

export default function Card({ blogPosts, keys, company,testimonials }) {

    return (
        <>
            {keys === 1 ?
                blogPosts.map((post) => (
                    <div
                        key={post.id}
                        className="w-1/4 flex-shrink-0 px-4"
                        role="article"
                        aria-label={post.title}
                    >
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full transition-transform duration-300 ">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="h-40 m-auto carousel_img"
                            />
                            <div className="p-6">
                                <h2 className="mt-4 text-xl font-bold text-gray-900 leading-tight">
                                    {post.title}
                                </h2>
                                <p className="mt-2 text-gray-600">{post.description}</p>
                            </div>
                        </div>
                    </div>
                )) : keys === 2 ?
                    company.map((post) => (
                        <div
                            key={post.id}
                            className="w-1/4 flex-shrink-0 px-4"
                            role="article"
                            aria-label={post.title}
                        >
                            <div className="bg-white rounded-lg  overflow-hidden h-full transition-transform duration-300 ">
                                <img
                                    src={post.image}
                                    className="h-32 m-auto "
                                />
                            </div>
                        </div>
                    )) : keys === 3 ? testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className={`${testimonial.backgroundColor} p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500`}
                            aria-label={`Testimonial from ${testimonial.name}`}
                            tabIndex="0"
                        >
                            <div className="flex items-start">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <FaQuoteLeft className="text-gray-400 mb-2" />
                                    <p className="text-gray-800 mb-4">{testimonial.review}</p>
                                    <p className="font-semibold">{testimonial.name}</p>
                                </div>
                            </div>
                        </div>
                    )) : null
            }
        </>
    )
}
