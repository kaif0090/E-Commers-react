import  { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { ToastContainer, toast } from "react-toastify";
import "./buynow.css"
const Buynow = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
 
 const notify = () => toast("user  added!");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_API_KEY', // Replace with your API key
  });

 

 


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, address });
    alert('Order Placed Successfully!');
  };

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div style={{ padding:"100px",marginTop:"-100px"}} className='buymain'>

   
    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3 justify-content-center container frm' style={{marginTop:"00px" ,color:"white"}}>
      <h2>Place Your Order</h2>
      <div>
        <label className="form-lebel">Name:</label>
        <input required value={name} onChange={(e) => setName(e.target.value)}  className='form-control'/>
      </div>

      <div>
        <label className='form-label'>Address:</label>
        <input required value={address} onChange={(e) => setAddress(e.target.value)}  className='form-control'/>
      </div>

      <h3>Select your location on the map</h3>
     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30158.900556201683!2d72.8491342096087!3d19.113684054376627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c83c05b7fc89%3A0xbe87eb057f3aafda!2sAndheri%2C%20Maharashtra%20400053!5e0!3m2!1sen!2sin!4v1746994915906!5m2!1sen!2sin" width="100%" height="450" style={{  allowfullscreen:"" ,loading:"lazy", referrerpolicy:"no-referrer-when-downgrade"}}></iframe>

      <button type="submit"  onClick={notify}  className='btn btn-warning   mb-5'>Place Order</button>
    </form>
     </div>
  );
};

export default Buynow;
