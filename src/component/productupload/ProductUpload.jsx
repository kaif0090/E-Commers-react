import { useParams } from "react-router-dom";
import { api } from "../../api";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { LuBookPlus } from "react-icons/lu";

export default function ProductUpload() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("products");

  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchDetailData();
  }, [id]);

  async function fetchDetailData() {
    try {
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      setValues({
        name: product.name,
        img: product.img,
        price: product.price,
        description: product.description,
        category: product.category,
        brand: product.brand,
        rating: product.rating,
        stock: product.stock,
        color: product.color,
        features: product.features?.join(", "),
        specs: {
          display: product.specs?.display || "",
          battery: product.specs?.battery || "",
          processor: product.specs?.processor || "",
          camera: product.specs?.camera || "",
          ram: product.specs?.ram || "",
          storage: product.specs?.storage || "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  const { handleSubmit, handleChange, handleReset, values, setValues } =
    useFormik({
      initialValues: {
        name: "",
        img: "",
        price: "",
        description: "",
        category: "",
        brand: "",
        rating: "",
        stock: "",
        color: "",
        features: "",
        specs: {
          display: "",
          battery: "",
          processor: "",
          camera: "",
          ram: "",
          storage: "",
        },
      },
      onSubmit: submitHandler,
    });

  async function submitHandler(values) {
    try {
      setLoading(true);
      const payload = {
        ...values,
        features: values.features.split(",").map((f) => f.trim()),
      };
      const response = await api.post(`/${selectedEndpoint}`, payload);
      console.log("Data Added", response.statusText);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    handleReset();
  }

  return (
    <>
      <h1 className="text-center">Upload Product</h1>
      <div className="container text-dark p-3">
        <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="endpoint" className="form-label">
              Select Category:
            </label>
            <select
              id="endpoint"
              value={selectedEndpoint}
              onChange={(e) => setSelectedEndpoint(e.target.value)}
              className="form-select"
            >
              <option value="products">Phones</option>
              <option value="products2">Clothes</option>
              <option value="laptops">Laptops</option>
              <option value="cosmetics">Cosmetics</option>
            </select>
          </div>
          {/* Simple Fields */}
          {[
            "name",
            "img",
            "price",
            "description",
            "category",
            "brand",
            "color",
          ].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="form-label">
                {field}:
              </label>
              <input
                type="text"
                name={field}
                id={field}
                value={values[field]}
                onChange={handleChange}
                className="form-control"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="form-label">
              Rating:
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              value={values.rating}
              onChange={handleChange}
              step="0.1"
              className="form-control"
              placeholder="Enter rating (e.g. 4.5)"
            />
          </div>

          {/* Stock */}
          <div>
            <label htmlFor="stock" className="form-label">
              Stock:
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              value={values.stock}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Features */}
          <div>
            <label htmlFor="features" className="form-label">
              Features (comma separated):
            </label>
            <input
              type="text"
              name="features"
              id="features"
              value={values.features}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., AMOLED Display, 5G Support"
            />
          </div>

          {/* Specs */}
          <h5>Specifications</h5>
          {["display", "battery", "processor", "camera", "ram", "storage"].map(
            (spec) => (
              <div key={spec}>
                <label htmlFor={`specs.${spec}`} className="form-label">
                  {spec}:
                </label>
                <input
                  type="text"
                  name={`specs.${spec}`}
                  value={values.specs[spec] || ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      specs: {
                        ...prev.specs,
                        [spec]: e.target.value,
                      },
                    }))
                  }
                  className="form-control"
                  placeholder={`Enter ${spec}`}
                />
              </div>
            )
          )}

          {/* Submit */}
          <div>
            <button className="btn btn-dark">
              {loading ? (
                "Uploading..."
              ) : (
                <span>
                  Upload <LuBookPlus />
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
