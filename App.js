import {BrowserRouter,Route,Routes} from "react-router-dom";
import AdminLogin from "./Admin/AdminLogin"
import HomePage from "./Component/HomePage"
import Layout from "./Component/Layout";
import AboutPage from "./Component/AboutPage";
import UserLogin from "./User/UserLogin";
import UserRegister from "./User/UserRegister";
import UserDashBoard from "./User/UserDashBoard";
import AdminHome from "./admindashboard/Admin_Home"
import Driver from './admindashboard/Driver';
import Management from "./admindashboard/ManageMent";
import Vehicles from "./admindashboard/Vehicles"



function App(){
  return (
    <div className="App">
       
      <BrowserRouter>
        <Layout> 
          <Routes >
            <Route path="/" element={<HomePage/>}/>
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/adminhome" element={<AdminHome/>}/>
            <Route path="/driver" element={<Driver/>}/>
            <Route path="/management" element={<Management/>}/>
            <Route path="/vehicles" element={<Vehicles/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/userlogin" element={<UserLogin/>}/>
            <Route path="/userregister" element={<UserRegister/>}/>
            <Route path="/userdashboard" element={<UserDashBoard/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
      
   
    </div>
  )
}

export default App;
