import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  async function fetchData() {
    const endpoints = ["products", "products2", "laptops", "cosmetics"];

    for (const endpoint of endpoints) {
      try {
        const response = await api.get(`/${endpoint}/${id}`);
        if (response.status === 200 && response.data) {
          setData(response.data);
          return;
        }
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    toast.error("Product not found!");
  }

  const handleBuyNow = () => {
    toast.success("🎉 Order placed successfully!");
  };

  return (
    <div className="container my-5 ">
      <ToastContainer />
      {data ? (
        <motion.div
          className="card shadow-lg border-0"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="row g-0 p-4">
            <div className="col-md-5">
              <motion.img
                src={data.img}
                className="img-fluid rounded-start w-100 h-100 w-100"
                alt={data.name}
                style={{ objectFit: "contain" }}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="col-md-7 p-4">
              <h2 className="fw-bold mb-3">{data.name}</h2>
              <h4 className="text-muted">{data.brand}</h4>
              <p className="lead">{data.description}</p>
              <p>
                <strong>Price:</strong>{" "}
                <span className="text-danger fs-4">₹{data.price}</span>
              </p>
              <p>
                <strong>Category:</strong> {data.category}
              </p>
              <p>
                <strong>Stock:</strong>{" "}
                {data.stock > 0 ? `${data.stock} Available` : "Out of stock"}
              </p>
              <p>
                <strong>Rating:</strong>{" "}
                <span className="text-warning">{data.rating} ★</span>
              </p>
              <hr />
              <h5>Specifications:</h5>
              <ul>
                {data.specs &&
                  Object.entries(data.specs).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}:</strong> {value}
                    </p>
                  ))}
              </ul>
              <motion.button
                className="btn btn-warning w-100 mt-3 px-4"
                whileTap={{ scale: 0.9 }}
                onClick={handleBuyNow}
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h4>Loading product details...</h4>
        </motion.div>
      )}
    </div>
  );
}
