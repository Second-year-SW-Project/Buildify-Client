import { Facebook, Instagram, YouTube, Google, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ml-[-165px] py-8 pl-[52px]">
      <div className="container mx-auto flex flex-wrap justify-between px-8">




        {/*logo and discription*/}



        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <a href="/"><img src="https://res.cloudinary.com/ddstqdrhm/image/upload/v1746019319/logo-userfooterblue_hibbqm.png"></img></a>
          <p className="ml-14 mt-2 text-justify text-sm">
            Explore the ultimate PC customization experience! Our platform offers top-quality
            components, real-time compatibility checks, secure payments, and personalized support
            to help you build your dream PC effortlessly.
          </p>
        </div>






        {/* categories and their subs */}




        <div className="w-full md:w-[100px] ">
          <h3 className="text-white font-semibold mb-3">BUILDIFY</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/pc-building" className="hover:text-gray-400">PC Building</a></li>
            <li><a href="/laptops" className="hover:text-gray-400">Laptops</a></li>
            <li><a href="/components" className="hover:text-gray-400">Components</a></li>
          </ul>
        </div>










        <div className="w-full md:w-[110px]">
          <h3 className="text-white font-semibold mb-3">Customer Care</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/account" className="hover:text-gray-400">Manage Account</a></li>
            <li><a href="/track-order" className="hover:text-gray-400">Track Your Order</a></li>
            <li><a href="/reviews" className="hover:text-gray-400">Customer Review</a></li>
            <li><a href="/refunds" className="hover:text-gray-400">Reports & Refunds</a></li>
          </ul>
        </div>







        <div className="w-full md:w-[130px]">
          <h3 className="text-white font-semibold mb-3">Information</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/about" className="hover:text-gray-400">Our Showroom</a></li>
            <li><a href="/about" className="hover:text-gray-400">Terms & Conditions</a></li>
          </ul>
        </div>














        <div className="w-full md:w-[140px]">
          <h3 className="text-white font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">70 Washington Square South, New York, NY 10012, United States</p>
          <p className="text-sm mt-2">
            Email: <a href="mailto:MMM@gmail.com" className="hover:text-gray-400">MMM@gmail.com</a>
          </p>
          <p className="text-sm mt-1">
            Phone: <a href="tel:+11123456789" className="hover:text-gray-400">+1 1123 456 789</a>
          </p>


          <div className="flex space-x-5 mt-2">
            <a href="#" className="text-white hover:text-gray-400 text-2xl"><Facebook /></a>
            <a href="#" className="text-white hover:text-gray-400 text-2xl"><Instagram /></a>
            <a href="#" className="text-white hover:text-gray-400 text-2xl"><YouTube /></a>
            <a href="#" className="text-white hover:text-gray-400 text-2xl"><Google /></a>
            <a href="#" className="text-white hover:text-gray-400 text-2xl"><Twitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
