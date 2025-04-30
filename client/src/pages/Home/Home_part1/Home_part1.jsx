import Button from "@mui/material/Button";

export default function Home_part1({onShopNowClick}) {
  return (
    <div className="relative h-screen w-full ">


      {/*image */}
      <img
        src="https://res.cloudinary.com/ddstqdrhm/image/upload/v1745421086/Home1_qma1wq.jpg"
        alt="Gaming Setup"
        className="absolute inset-0 w-full h-full object-cover"
      />




      {/*content */}
      <div className="top-[-0px] mt- absolute  inset-0 flex flex-col justify-center items-center text-center px-4  bg-black bg-opacity-50">

        <h1 className="text-white text-4xl md:text-5xl font-bold mb-5 mt-[-300px]">
          Desk Deals Done Right.
        </h1>


        <p className="text-white text-lg md:text-xl mb-5">
          Save big on gaming gear bundles and deck out your desk.
        </p>

        {/* button that redirect to pcbuilds */}
        <Button
          onClick={onShopNowClick}
          variant="contained"
          color="primary"
          className="!font-semibold !px-6 !py-3 !rounded-lg"
          sx={{
            backgroundColor: "primary100",
            "&:hover": {
              backgroundColor: "primary900",
            },
          }}
        >
          Shop PCs
        </Button>



      </div>


    </div>
  );
}



//i divided home to 5 parts.5components.this is first component
//for change image pass the prop and add propcall to image src//<--for future work