import { useState, useEffect } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "./all.css";
export default function ProductPhone() {
  const [products, setProducts] = useState([]);
  const notify = () => toast("Product Added to Cart!");
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await api.get("/products");
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        console.log("Error while Fetching");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleAddToCart(product) {
    try {
      const existing = await api.get(`/cart?id=${product.id}`);
      if (existing.data.length > 0) {
        alert("Product already in cart");
        return;
      }

      const res = await api.post("/cart", product);
      if (res.status === 201) {
        console.log("add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }
  return (
    <>
      <div className="container-fluid my-3 bg-light p-4" style={{}}>
        <h1 className="text-center my-4">Phones</h1>
        <div className="row d-flex justify-content-start">
          {products.length > 0 &&
            products.map((element, index) => (
              <motion.div
                className="col-md-4 d-flex"
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card mb-4 w-100 hover">
                  <img
                    src={element.img}
                    className="card-img"
                    alt={element.name}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <h5 className="card-title">{element.price}</h5>
                    <p className="card-text">{element.description}</p>
                    <Link to={`/product/${element.id}`}>
                      <button className="btn btn-warning w-100 mb-2">
                        Buy Now
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        handleAddToCart(element);
                        notify();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
