import React from 'react'

import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar'
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer'

import Home_part1 from './Home_part1/Home_part1'
import Home_part4 from './Home_part4/Home_part4'
import Home_part2 from './Home_part2/Home_part2'

export default function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Home_part1></Home_part1>
        <Home_part2></Home_part2>
        <Home_part4></Home_part4>
        
        <Footer></Footer>

    </div>
  )
}
