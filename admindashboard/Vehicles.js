import React, { useEffect, useState } from "react";
import Dashboard from "../Component/Dashboard";
import { Table,Modal } from "react-bootstrap";
import VehicleService from "../service/VehicleService";
// import "./Vehicle.css";
import "../App.css"

//Icons
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from "@mui/icons-material/Save";

const Vehicles=() =>{
  const [vehicles, setVehicles] = useState([]);

  const [vehicleno, setVehicleno] = useState("");
  const [vehiclename, setVehiclename] = useState("");
  const [cab_color, setcab_color] = useState("");
  const [seat, setSeat] = useState("");

  const clearTextFields = () => {
    setVehicleno("");
    setVehiclename("");
    setcab_color("");
    setSeat("");
  };

  useEffect(()=>{
    getAllVehicles();
  })

  const getAllVehicles = () => {
    VehicleService.getAllVehicles()
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  //Add A Vehicle
  const addVehicle = () => {
    if(vehicleno && vehiclename && cab_color && seat){
    const vehicle = {
      vehicleno,
      vehiclename,
      cab_color,
      seat,
    };
    VehicleService.createVehicle(vehicle)
      .then((response) => {
        console.log(response.data);
        clearTextFields();
        setVehicles(response.data);
        window.alert("Details Add Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }else{
    window.alert("Fill All details")
  }
}

const[editingVehicle,setEditingvehicle]=useState(null);
const enterEditngmode=(vehicle)=>{
  setEditingvehicle(vehicle);
  setVehicleno(vehicle.vehicleno);
  setVehiclename(vehicle.vehiclename);
  setcab_color(vehicle.cab_color);
  setSeat(vehicle.seat);
  toggleFormPopup();
}

const updateVehicle =(id)=>{
  if(editingVehicle){
    const updatedVehicle={
      ...editingVehicle,
      vehicleno,
      vehiclename,
      cab_color,
      seat
    }
    VehicleService.updateVehicle(id,updatedVehicle).then((response)=>{
      console.log(response.data);
      toggleFormPopup();
      clearTextFields();
      getAllVehicles();
      setEditingvehicle(null);
      window.alert("Vehicle Updated Successfully")
    }).catch((error)=>{
      console.log(error);
    })
  }else{
    window.alert("No vehicle selected ");
  }
}



//Delete A Vehicle
  const deleteVehicle = (vehicleno) => {
    if (vehicleno) {
      VehicleService.deleteVehicle(vehicleno).then((response) => {
        getAllVehicles();
      });
    }
  };

  const [showFormPopup, setShowFormPopup] = useState(false);
  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  return (
    <div>
      <Dashboard>
      <Modal show={showFormPopup} onHide={toggleFormPopup}>
            <Modal.Header>
              <button
                className="update-button"
                onClick={() => setShowFormPopup(false)}
              >
                <ExitToAppIcon />
              </button>
            </Modal.Header>
            <Modal.Body>
              
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={vehicleno}
                  onChange={(e) => setVehicleno(e.target.value)}
                />
                <label className="poplabel">Vehicle No</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={vehiclename}
                  onChange={(e) => setVehiclename(e.target.value)}
                />
                <label className="poplabel">Vehicle Name</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={cab_color}
                  onChange={(e) => setcab_color(e.target.value)}
                />
                <label className="poplabel">Email</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  className="popinpts"
                  placeholder=" "
                  value={seat}
                  onChange={(e) => setSeat(e.target.value)}
                />
                <label className="poplabel">Seats</label>
              </div>
             
              <div>
                {editingVehicle ? (
                  <button
                    className="update-button"
                    onClick={() => updateVehicle(editingVehicle.driverId)}
                  >
                    <SaveIcon />
                  </button>
                ) : (
                  <button
                    className="update-button"
                    onClick={(e) => {
                      addVehicle(e);
                    }}
                  >
                    <SaveIcon />
                  </button>
                )}
              </div>
            </Modal.Body>
          </Modal>
          <button className="hadduserbtn" onClick={toggleFormPopup}>
           <AddIcon/><DirectionsCarIcon/>
          </button>
        <br />
        <div className="tablecontainer">
          <Table >
            <thead>
              <tr>
                <th>VehicleId</th>
                <th>Vehicle Number</th>
                <th>Vehicle Name</th>
                <th>Color</th>
                <th>Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vehicleid}>
                  <td>{vehicle.vehicleid}</td>
                  <td>{vehicle.vehicleno}</td>
                  <td>{vehicle.vehiclename}</td>
                  <td>{vehicle.cab_color}</td>
                  <td>{vehicle.seat}</td>
                  <td>
                    <button className="vtupdate-btn"
                    onClick={()=>enterEditngmode(vehicle)}>update</button>
                    <button
                      className="vdelete-btn"
                      onClick={() => deleteVehicle(vehicle.vehicleno)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Dashboard>
    </div>
  );
}

export default Vehicles;
