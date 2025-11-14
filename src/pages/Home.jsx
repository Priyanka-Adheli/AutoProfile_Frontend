import React from "react";
import Banner from "../components/home/Banners";
import Hero from "../components/home/Hero";
import FeatureSection from "../components/home/Features";
import Testimonial from "../components/home/Testimonial";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/home/Footer";

const Home = () =>{
    return(
        <>
        <Banner/>
        <Hero/>
        <FeatureSection/>
        <Testimonial/>
        <CallToAction/>
        <Footer/>
        </>
    )
}

export default Home;