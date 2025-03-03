
export default function Itemcardforpc({ src="/graph1.png" , stock="In Stock" , itemname = "Player 1:Intel ARC Edition",  price = "710,000 LKR" }) {
    return (
  
      
      <div className="max-w-[300px]  mt-14 ml-14 border-2 border-[#D099FE9C] rounded-2xl shadow-lg p-4 text-center relative">
          {/* full border area up */}
        
        
        {/* stock availability area */}
        
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-purple-600 text-s font-semibold px-3 py-1 rounded-[5px] border-2 border-purple-500">
          {stock}
        </div>
  
  
  
          {/* image area */}
  
        <div>
          <img src={src} className="size-52 mx-10 my-3" alt={itemname}/>
        </div>
  
  
  
  
          {/* name area */}
          
        <div className="bg-[#d9a8ff1C] text-black -mx-4 my-2 ">
          <h2 className="text-[18px]  font-semibold">
            <p>{itemname}</p>
          </h2>
        </div>
  
  
  
  
  
        {/* price area */}
        <p className=" my-3 text-3xl font-bold text-gray-800 mt-3">{price}</p>
  
  
          
          {/* add to cart button area -- will replace with atomic button */}
          <div>
              <button className="bg-[#7315E5] hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-[12px]">
                  Add To Cart
              </button>
          </div>
          
        
      </div>
    );
  }
  
  
  
  
  //how to useee--
  
  //<Test src=yourpath stock=in or out stock itemname=.....  price=....></Test>