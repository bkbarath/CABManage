import axios from "axios";

const DRIVER_BASE_REST_API_URL="http://localhost:9000/driver/";
const DRIVER_ALL="http://localhost:9000/driver/all"
const DRIVER_ADD="http://localhost:9000/driver/add"

class DriverService{

    getAllDrivers(){
        return axios.get(DRIVER_ALL)
    }
    // getDriverById(id){
    //     return axios.get(DRIVER_BASE_REST_API_URL +"/"+id);
    // }    
    // getDriverByName(username){
    //     return axios.get(DRIVER_BASE_REST_API_URL+"/"+username)
    // }
    // getDriverByCreateDate(startSate,endDate){
    //     return axios.get(DRIVER_BASE_REST_API_URL+"/"+startSate+"/"+endDate);
    // }
    createDriver(driver){
        return axios.post(DRIVER_ADD,driver)
    }
    updateDriver(id,driver){
        return axios.put(DRIVER_BASE_REST_API_URL+"/"+id,driver)
    }
    deleteDriver(id){
        return axios.delete(DRIVER_BASE_REST_API_URL+"/"+id)
    }
}

export default new DriverService();