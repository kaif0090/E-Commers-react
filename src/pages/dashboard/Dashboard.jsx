import UserData from "../../component/userdata/UserData";
import ProductUpDate from "../../component/productupload/ProductUpload";
import ProductDelet from "../../component/productdelet/ProductDelet";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <>
      <div className="maindash gap-5">
        <NavLink to="/Home" className="link home ">
          <FaHome size={25} color="white" style={{marginTop:"-50px"}} />
          <p className="addto mx-4">Home </p>
        </NavLink>
        <div className="contain mb-5 ">
          <UserData />
        </div>
        <div className=" d-flex  gap-5 ">
          <div className="contain ">
            <ProductUpDate />
          </div>
          <div className="contain ">
            <ProductDelet />
          </div>
        </div>
      </div>
    </>
  );
}
