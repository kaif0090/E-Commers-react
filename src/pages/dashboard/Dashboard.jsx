import UserData from "../../component/userdata/UserData";
import ProductUpDate from "../../component/productupload/ProductUpload";
import ProductDelet from "../../component/productdelet/ProductDelet";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "./Dashboard.css";
export default function Dashboard() {

  function handelShow (){
    let hide = document.getElementById("show");
    if (hide.style.display==='none') {
      hide.style.display="block"
    } else {
      hide.style.display="none"
    }
  }

  function handelSho (){
    let hide = document.getElementById("sho");
    if (hide.style.display==='none') {
      hide.style.display="block"
    } else {
      hide.style.display="none"
    }
  }


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
             <button className="btn btn-warning text-center " onClick={handelShow}>Form</button>
             <div id="show" style={{display:"none"}}>

            <ProductUpDate />
             </div>
          </div>
          <div className="contain ">
             <button className="btn btn-warning text-center " onClick={handelSho}>Data</button>
           <div id="sho" style={{display:"none"}}>

            <ProductDelet />
           </div>
          </div> 
        </div>
      </div>
    </>
  );
}
