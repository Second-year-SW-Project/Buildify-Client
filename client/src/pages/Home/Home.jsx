import React, { useRef, useEffect } from 'react';
import Navbar from '../../MoleculesComponents/User_navbar_and_footer/Navbar';
import Footer from '../../MoleculesComponents/User_navbar_and_footer/Footer';

import Home_part1 from './Home_part1/Home_part1';
import Home_part2 from './Home_part2/Home_part2';
import Home_part3 from './Home_part3/Home_part3';
import Home_part4 from './Home_part4/Home_part4';
import Home_part5 from './Home_part5/Home_part5';

export default function Home() {
  const part2Ref = useRef(null);

  const scrollToPart2 = () => {
    part2Ref.current.scrollIntoView({ behavior: 'smooth' });
  };


  //go to top when refreshing the page

  useEffect(() => {


    // 1) Disable automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2) Always scroll to top on initial load 
    window.scrollTo(0, 0);
    const onPageShow = (e) => {
      if (e.persisted) window.scrollTo(0, 0);
    };
    window.addEventListener('pageshow', onPageShow);

    const onBeforeUnload = () => window.scrollTo(0, 0);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);





  
  return (
    <div>
      <Navbar />
      <Home_part1 onShopNowClick={scrollToPart2} />
      <div ref={part2Ref}>
        <Home_part2 />
      </div>
      <Home_part3 />
      <Home_part4 />
      <Home_part5 />
      <Footer />
    </div>
  );
}
