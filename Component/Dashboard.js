import React from 'react'
import "./Dashboard.css"
import HomeIcon from '@mui/icons-material/Home';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "./contact.png"

const loggedInUser=localStorage.getItem("authToken");
const userName =loggedInUser? loggedInUser.userName: null;

const Dashboard=({children})=> {
  const SideBarData=[
    {
      title:"HOME",
      icon: <HomeIcon/>,
      link:"/adminhome"
    },
    {
      title:"CAB",
      icon: <LocalTaxiIcon/>,
      link:"/vehicles"
    },
    {
      title:"DRIVER",
      icon: <GroupAddIcon/>,
      link:"/driver"
    },
    {
      title:"SERVICE",
      icon: <HomeRepairServiceIcon/>,
      link:"/management"
    },
    {
      title:"LOGOUT",
      icon:<LogoutIcon/>,
      link:"/adminlogin"
    }
  ];

  return (
    <div className="main">
    <div className="sidebar">
    <div className="topbar">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <div>
        <h1 className="hh1">{userName}</h1>
      </div>
        <ul className="sidebarlist">
        {SideBarData.map((val,key)=>{
        return(
            <li key={key} className="row" id={window.location.pathname==val.link ? "active" : " "}onClick={()=>{
            window.location.pathname=val.link}}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
            </li>
        );
    })}</ul>
        </div>
        <main>{children}</main>
        </div>
  )
}

export default Dashboard;

