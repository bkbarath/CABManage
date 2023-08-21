import React ,{Fragment}from "react";
import { Button,Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserDashBoard.css"

function UserDashBoard(){
    return(
        <div style={{margin:"10rem"}}>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            Vehicle No.
                        </th>
                        <th>
                            Vehicle Name
                        </th>
                        <th>
                            DriverId
                        </th>
                        <th>
                            Driver Name
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Book
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </Table>
        </div>
    )
}

export default UserDashBoard;