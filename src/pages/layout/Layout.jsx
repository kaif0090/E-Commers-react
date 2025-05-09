import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Layout.css";

export default function Layout() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3, res4] = await Promise.all([
          axios.get("http://localhost:3000/products"),
          axios.get("http://localhost:3000/products2"),
          axios.get("http://localhost:3000/laptops"),
          axios.get("http://localhost:3000/cosmetics"),
        ]);
        setAllProducts([
          ...res1.data,
          ...res2.data,
          ...res3.data,
          ...res4.data,
        ]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = allProducts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="bg-warning">
        <div className="container ">
          <nav className="navbar navbar-expand-lg navbar text-light">
            <div className="container-fluid">
              <div className="h1box">
                <h1
                  className="text-center h1"
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                   <div class="my_animation">
      <p className="pr">Bazar </p>
  </div>

                </h1>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <form className="d-flex mx-auto mb-lg-0" role="search">
                  <input
                    className="form-control d-none d-xl-block me-2 serchbox"
                    type="text"
                    placeholder="Search products"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <input
                    className="form-control me-2 serchbo d-xl-none"
                    type="text"
                    placeholder="Search products"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row align-items-center">
                  <li className="nav-item mx-3">
                    <NavLink to="/AddToCart" className="link">
                      <FaCartArrowDown size={25} />
                      <p className="addto">Add To Cart</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn text-light"
                      onClick={() => navigate("/Signup")}
                    >
                      <IoLogOut size={29} />
                      <p className="addto mx-4">LogOut</p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {search && (
        <div className="container bg-light p-3 my-3">
          <h5>Search Results:</h5>
          {filteredProducts.length > 0 ? (
            <div className="row">
              {filteredProducts.map((item) => (
                <div className="col-md-4 mb-3" key={item.id}>
                  <div className="card h-100">
                    <img
                      src={item.img}
                      className="card-img-top"
                      alt={item.name}
                      height="200"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">
                        <strong>Price:</strong> ₹{item.price}
                      </p>
                      <p className="card-text">
                        <strong>Category:</strong> {item.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No matching products found.</p>
          )}
        </div>
      )}

      <Outlet />
    </>
  );
}
