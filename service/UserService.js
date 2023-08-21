import axios from "axios";

const USER_BASE_API_URL="http://localhost:8080/api/v1/cab_users";

class UserService{

    getAllUsers(){
        return axios.get(USER_BASE_API_URL);
    }
    createUser(user){
        return axios.post(USER_BASE_API_URL,user);
    }
    getUserByUserNameAndPassword(username,password) {
        return axios.get(USER_BASE_API_URL+"/"+username,password);
    }
    deleteUser(username){
        return axios.delete(USER_BASE_API_URL+"/"+username);
    }
}

export default new UserService();