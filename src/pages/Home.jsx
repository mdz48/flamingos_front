import React from 'react';
import Navbar from '../components/organisms/Navbar.jsx';
import Heading from '../components/atoms/Heading';
import CardsSection from '../components/organisms/Landing/CardsSection.jsx';
import Footer from '../components/molecules/Footer';
import HeroSection from "../components/organisms/Landing/HeroSection.jsx";
import InfoSection from "../components/organisms/Landing/InfoSection.jsx";
import SalonesSection from '../components/organisms/Landing/SalonesSection.jsx';
import { data } from '../data/data.js';

function Home() {
    const info = ["Info 1", "Info 2", "Info 3"];
    const cardsData = [
        { image: 'path/to/card1.jpg', text: 'Card 1' },
        { image: 'path/to/card2.jpg', text: 'Card 2' },
        { image: 'path/to/card3.jpg', text: 'Card 3' },
    ];




    return (
        <>
            <Navbar links={data.navhome}/>
            <HeroSection />
            <InfoSection/>
            <CardsSection />
            <section className='w-[80%] border border-blue-500 mx-auto '>
            <SalonesSection />
            </section>
            <Footer />
        </>
    );
}

export default Home;
