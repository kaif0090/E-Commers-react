import { useEffect } from "react";
import { api } from "../../api";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";


export default function UserData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get("/user");
      if (response.status == 200) {
        console.log(response.data);
        setData(response.data);
      } else {
        console.log("Error while Fetching");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleDelete(id) {
    try {
      const response = await api.delete(`/user/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
     <h1 className="text-center">User Profile </h1> <hr />
      <div>
        <div>
          {loading ? (
            <h2>Loading Data.......</h2>
          ) : (
            <table className="table text-center" style={{ }}>
              <thead>
                <tr>
                  <th scope="col">SrNo</th>
                  <th scope="col">name</th>
                  <th scope="col">email</th>
                  <th scope="col">password</th>
                  <th scope="col">Handles</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 &&
                  data.map((element, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{element?.name}</td>
                      <td>{element?.email}</td>
                      <td>{element?.password}</td>
                      <td>
                        {/* <Link to={element?.id} className="p-2">
                          <IoEyeSharp size={27} />
                        </Link> */}
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
          )}
        </div>
      </div>
    </>
  );
}
