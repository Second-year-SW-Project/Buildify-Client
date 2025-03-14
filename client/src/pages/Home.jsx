import React from 'react'
import Home_part1 from './Home/Home_part1'
import Home_part2 from './Home/Home_part2/Home_part2'
import Home_part4 from './Home/Home_part4/Home_part4'
import Navbar from '../MoleculesComponents/User_navbar_and_footer/Navbar'
import Footer from '../MoleculesComponents/User_navbar_and_footer/Footer'

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
