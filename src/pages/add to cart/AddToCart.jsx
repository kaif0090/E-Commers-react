import { useEffect, useState } from "react";
import { api } from "../../api";
import { Link } from "react-router-dom";

export default function AddToCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    api
      .get("/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error loading cart", err));
  };


  const handleRemove = async (id) => {
    try {
      await api.delete(`/cart/${id}`);
      fetchCart(); 
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

 
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <div className="container my-4">
      <div className="d-flex gap-5 justify-content-space-between">
        <div>
          <h2>🛒 My Cart ({cartItems.length} items)</h2>
        </div>
        <div className="gap-5">
          <h2>Total Price: ₹{totalPrice}</h2>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="row">
            {cartItems.map((item) => (
              <div className="col-md-4 mb-3" key={item.id}>
                <div className="card h-100">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <h6>₹{item.price}</h6>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
        </>
      )}
    </div>
  );
}
