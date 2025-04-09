export default function Logo({ src = "/logo.png", alt = "Logo", width = "150px", height = "50px" }) {
    return (
      <img src={src} alt={alt} style={{ width, height, objectFit: "contain" }} />
    );
  }


// how to useeee:
// <Logo src="/images/my-logo.png" width="200px" height="60px" />