import React from 'react'
import { useRef } from "react";
import { useEffect } from 'react';

import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'

import Home_part1 from './Home_part1/Home_part1'
import Home_part4 from './Home_part4/Home_part4'
import Home_part2 from './Home_part2/Home_part2'
import Home_part3 from './Home_part3/Home_part3'
import Home_part5 from './Home_part5/Home_part5'



export default function Home() {


  const part2Ref = useRef(null);

  const scrollToPart2 = () => {
    part2Ref.current.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on reload
  }, []);






  return (
    <div>
        <Navbar></Navbar>
        <Home_part1 onShopNowClick={scrollToPart2}></Home_part1>
        <div ref={part2Ref}><Home_part2></Home_part2></div>
        <Home_part3></Home_part3>
        <Home_part4></Home_part4>
        <Home_part5></Home_part5>
        <Footer></Footer>

    </div>
  )
}
