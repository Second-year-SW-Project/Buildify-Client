import PCcardhome from "./Pccardhome";




const pcs = [
  { name: "Player: One", specs: "RTX 4060, Ryzen 5 5600", price: "325,000 LKR" },

  { name: "Player: One Prime", specs: "RTX 4060 Ti, Ryzen 7 5800X", price: "420,000 LKR" },

  { name: "Player: Two",  specs: "RTX 4070, Intel i5-13600K", price: "620,000 LKR" },

  { name: "Player: Two Prime",  specs: "RTX 4070 Ti, Intel i7-13700K", price: "820,000 LKR" },

  { name: "Player: Three", specs: "RTX 4080, Ryzen 9 7900X", price: "940,000 LKR" },

  { name: "Player: Three Prime",  specs: "RTX 4080 Super, Ryzen 9 7950X", price: "1,100,000 LKR" },

  { name: "Player: Four",  specs: "RTX 4090, Intel i9-14900K", price: "1,750,000 LKR" },

  { name: "Player: Four Prime",  specs: "RTX 4090, Ryzen 9 7950X3D", price: "1,900,000 LKR" },
];






export default function Home_part2() {
  return (


    <div className="w-full py-16 px-4">




      {/* Title */}


      <h2 className="text-3xl md:text-4xl font-bold text-center">Prebuilt Gaming PCs</h2>
      <p className="text-center text-gray-600 text-lg mb-8">
        We use the latest generation performance components and configurations to get you gaming fast.
      </p>






      {/* Cards with mapping*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
        
        
        {pcs.map((pc, index) => (

          <div key={index} className="flex justify-center">
            <PCcardhome name={pc.name} image={pc.image} specs={pc.specs} price={pc.price} />
          </div>

        ))
        
        }



      </div>







    </div>
  );
}


//for this i add one image to all the cars.its in the pccard componet.
//if you change the location of pccard component you have to update the import directory


//i removed some image attrbutes from some objects for testing


// one card props like this --->   { name: "Player: One", specs: "RTX 4060 Ryzen 5 5600",image ="./.pc1png" ,price: "325,000 LKR" },