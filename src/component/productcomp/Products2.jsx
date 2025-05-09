import { useState, useEffect } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";
import "./all.css";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

export default function Product2() {
  const [products, setProducts] = useState([]);
  const notify = () => toast("Product Added to Cart!");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await api.get("/products2");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
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
        console.log("Added to cart");
      }
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  return (
    <div className="container my-3 bg-light p-4">
      <h1 className="text-center">Cloths </h1>
      <div className="row">
        {products.map((item, index) => (
          <motion.div
            className="col-md-4 d-flex mb-4"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: item * 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div className="card w-100 hover">
              <img
                src={item.img}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <h6>₹{item.price}</h6>
                <Link
                  to={`/product/${item.id}`}
                  className="btn btn-warning me-2 w-100 mb-2"
                >
                  Buy Now
                </Link>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    handleAddToCart(item);
                    notify();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
