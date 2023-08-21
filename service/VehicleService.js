import axios from "axios";


const VEHICLE_BASE_API_URL="http://localhost:8080/api/v1/cab_vehicle";

class VehicleService{

    getAllVehicles(){
        return axios.get(VEHICLE_BASE_API_URL);
    }
    createVehicle(vehicle){
        return axios.post(VEHICLE_BASE_API_URL,vehicle);
    }
    getVehiclesById(vehicleid){
        return axios.get(VEHICLE_BASE_API_URL+"/"+vehicleid);
    }
    updateVehicle(vehicleid,vehiclename){
        return axios.put(VEHICLE_BASE_API_URL+"/"+vehicleid,vehiclename);
    }
    deleteVehicle(vehicleid){
        return axios.delete(VEHICLE_BASE_API_URL+"/"+vehicleid);
    }
}

export default new VehicleService();