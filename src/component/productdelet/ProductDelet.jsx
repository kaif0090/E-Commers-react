import { useEffect, useState } from "react";
import { api } from "../../api";
import { AiFillDelete } from "react-icons/ai";

export default function ProductDelet() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("products");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedEndpoint]);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get(`/${selectedEndpoint}`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("Error while fetching");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/${selectedEndpoint}/${id}`);
      fetchData();
    } catch (error) {
      console.log("Delete error:", error);
    }
  }

  return (
    <>
      <h1 className="text-center">Product List</h1>
      <hr />
      <div>
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
        <div>
          {loading ? (
            <h2>Loading Data.......</h2>
          ) : data.length > 0 ? (
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">SrNo</th>
                  <th scope="col">Name</th>
                  <th scope="col">Handles</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, index) => (
                  <tr key={element.id}>
                    <td>{index + 1}</td>
                    <td>{element?.name}</td>
                    <td>
                      <AiFillDelete
                        style={{ cursor: "pointer" }}
                        color="red"
                        size={25}
                        onClick={() => handleDelete(element?.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2>No products found</h2>
          )}
        </div>
      </div>
    </>
  );
}
