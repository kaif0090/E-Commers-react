import "./home.css";
import ProductPhone from "../../component/productcomp/ProductPhone";
import Product2 from "../../component/productcomp/Products2";
import Laptop from "../../component/productcomp/Laptop";
import Cosmatic from "../../component/productcomp/Cosmatic";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import LoadingScreen from "../loading/Loading";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/40d230632436a96b.jpg?q=20",
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/5147d0d4239e324e.jpg?q=20",
  "https://static.vecteezy.com/system/resources/previews/004/299/812/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg",
  "https://rukminim1.flixcart.com/fk-p-flap/1620/270/image/1a28fa02ce9f2cd8.jpg?q=20",
];
export default function Home() {
  // gsap start

  // gsap end
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <div className="homeMain">
        <div className="slider-container" style={{ marginTop: "-100px" }}>
          <img
            src={images[currentIndex]}
            alt="slider"
            className="slider-image"
            style={{
              height: "200px",
              width: "100%",
              objectFit: "cover",
              AspectRatio: "1",
            }}
          />
        </div>

        <div className="container-fluid">
          <ProductPhone />
        </div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/174/590/non_2x/fashion-advertising-web-banner-illustration-vector.jpg"
          alt=""
          style={{ width: "100%", height: "400px" }}
        />
        <div className="container-fluid">
          <Product2 />
        </div>
        {/* gsap start  */}

        {/* gasap end */}
        <div style={{ width: "100%" }}>
          <img
            src="https://www.cyberwala.com/wp-content/uploads/2022/05/refurbished-laptops.jpg"
            alt=""
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div>
        <div className="container-fluid">
          <Laptop />
        </div>
        <div className="container-fluid">
          <Cosmatic />
        </div>
      </div>
    </>
  );
}
