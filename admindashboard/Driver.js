import React, { useState, useEffect, Fragment } from "react";
// import "./Driver.css";
import { Button, Table ,Modal} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Driver_Service from "../service/Driver_Service";
import Dashboard from "../Component/Dashboard";
import "../App.css"

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

const Driver = () => {
  const [drivers, setDrivers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createBy, setCreateBy] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const clearTextFields = () => {
    setFirstName("");
    setLastName("");
    setDriverName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setCreateBy("");
  };
  const driver = {
    firstName,
    lastName,
    driverName,
    email,
    password,
    phoneNumber,
    createBy,
  };

  useEffect(() => {
    getAllDrivers();
  }, []);

  //searchBox
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  // Filtered users based on search query
  const filteredUsers = drivers.filter(
    (driver) =>
      driver.firstName.toLowerCase().includes(searchQuery) ||
      driver.lastName.toLowerCase().includes(searchQuery) ||
      driver.driverName.toLowerCase().includes(searchQuery) ||
      driver.email.toLowerCase().includes(searchQuery) ||
      driver.phoneNumber.toString().includes(searchQuery)
  );

  //getAll drivers
  const getAllDrivers = () => {
    Driver_Service.getAllDrivers()
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 
  //post a Driver
  const addDriver = () => {
    if(firstName && lastName && driverName && email && password && phoneNumber){
    const driver = {
      firstName,
      lastName,
      driverName,
      email,
      password,
      phoneNumber,
      createBy,
    };
    Driver_Service.createDriver(driver)
      .then((response) => {
        console.log(response.data);
        toggleFormPopup()
        getAllDrivers();
        clearTextFields();
        window.alert("Driver created Successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  }else{
    window.alert("Please Fill all the details")
  }
}

//   useEffect(() => {
//     Driver_Service.getDriverById(id)
//       .then((response) => {
//         setFirstName(response.data.firstName);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  //update a driver
  const[editingDriver,setEditingDriver]=useState(null)
  const enterEditingMode=(driver)=>{
    setEditingDriver(driver);
    setFirstName(driver.firstName);
    setLastName(driver.lastName)
    setDriverName(driver.driverName);
    setEmail(driver.email);
    setPassword(driver.password);
    setPhoneNumber(driver.phoneNumber);
    toggleFormPopup();
  }

  const updateDriver = (id) => {
    if(editingDriver){
    const updatedDriver = {
      ...editingDriver,
      firstName,
      lastName,
      driverName,
      email,
      password,
      phoneNumber
    };
      Driver_Service.updateDriver(id, updatedDriver)
        .then((response) => {
          console.log("updated",response.data);
          clearTextFields();
          window.alert("Driver Details Added");
          toggleFormPopup()
          setEditingDriver(null)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //delete a driver
  const deleteDriver = (driverId) => {
    if (driverId) {
      Driver_Service.deleteDriver(driverId).then((respose) => {
        getAllDrivers();
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
        <div>
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label className="poplabel">First Name</label>
                </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="poplabel">Last Name</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                />
                <label className="poplabel">Driver Name</label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="poplabel">Email</label>
              </div>
              <div className="input-container">
                <input
                  type="password"
                  className="popinpts"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="poplabel">Password</label>
              </div>
             
              <div className="input-container">
              <input
                  type="text"
                  className="popinpts"
                  placeholder=" "
                  value={phoneNumber}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                  />
                  <label className="poplabel">Phone Number</label>
              </div>
              <div>
                {editingDriver ? (
                  <button
                    className="update-button"
                    onClick={() => updateDriver(editingDriver.driverId)}
                  >
                    <SaveIcon />
                  </button>
                ) : (
                  <button
                    className="update-button"
                    onClick={(e) => {
                      addDriver(e);
                    }}
                  >
                    <SaveIcon />
                  </button>
                )}
              </div>
            </Modal.Body>
          </Modal>

          <input
            type="text"
            className="searchinpts"
            placeholder="search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="hadduserbtn" onClick={toggleFormPopup}>
            Add User
          </button>
          <div>
            <div className="tablecontainer">
              <Table>
                <thead>
                  <tr>
                    <th>EMPLOYEE ID</th>
                    <th>USER NAME</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>DEPARTMENT</th>
                    <th>DATE OF JOIN</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((userRole) => (
                    <tr key={userRole.userId}>
                      <td>{userRole.employeeId}</td>
                      <td>{userRole.userName}</td>
                      <td>{userRole.email}</td>
                      <td>{userRole.roleName}</td>
                      <td>{userRole.department}</td>
                      <td>{userRole.doj}</td>
                      <td>
                        <div style={{ display: "flex" }}>
                          <button
                            className="update-button"
                            onClick={() => {
                              enterEditingMode(userRole);
                            }}
                          >
                            <EditIcon />
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => {
                              deleteDriver(driver.driverId);
                            }}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Driver;
