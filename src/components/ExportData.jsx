import React from 'react';
import { CSVLink } from "react-csv";

function ExportData() {

    const headers = [
        { label: "First Name", key: "firstName" },
        { label: "Last Name", key: "lastName" },
        { label: "Email", key: "email" },
        { label: "Age", key: "age" }
    ];
    
    const data = [
        { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
        { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
        { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
        { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
        { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
        { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
        { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
        { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
        { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
        { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
        { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
    ];


    

    return (
        <div classname="App">
            <h3>Export data to CSV in React - <a href="https://cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
            <CSVLink data={data} headers={headers}>
            Download me
            </CSVLink>
        </div>
    );
}

export default ExportData;