import "./home.css";
import ProductPhone from "../../component/productcomp/ProductPhone";
import Product2 from "../../component/productcomp/Products2";
import Laptop from "../../component/productcomp/Laptop";
import Cosmatic from "../../component/productcomp/Cosmatic";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"; 
import { BsAspectRatio } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/a49adbd289d6eedc.jpeg?q=20",
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/5147d0d4239e324e.jpg?q=20",
  "https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/004/707/493/small_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg",
];
export default function Home() {
  // gsap start
 

  // gsap end

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="homeMain">
        <div className="slider-container">
          <img
            src={images[currentIndex]}
            alt="slider"
            className="slider-image"
            style={{ height: "400px", width: "100%", objectFit: "",AspectRatio:"1"}}
          />
        </div>

        <div className="container">
          <ProductPhone />
        </div>
        <div className="container">
          <Product2 />
        </div>
        {/* gsap start  */}
        
        {/* gasap end */}
        <div className="container">
          <Laptop />
        </div>
        <div className="container">
          <Cosmatic />
        </div>
      </div>
    </>
  );
}
