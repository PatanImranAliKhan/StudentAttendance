import React, { useState, useEffect } from 'react'
import styles from './style.css';
import { Link } from 'react-router-dom';
import { CSVLink } from "react-csv";

export default function Normal() {
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);
    const [headers, setheaders] = useState([])
    const [attendance, setattendance] = useState([])
    const [count, setcount] = useState(0)
    const [csvheaders, setcsvheaders] = useState([])
    const [csvdata, setcsvdata] = useState([])
    const [showlink, setshowlink] = useState(false)
    const [today, settoday] = useState()


    function fillattendance(arr) {
        var att = []
        for (let i = 0; i < arr.length; i++) {
            att[i] = false;
        }
        // att[0]=false;
        setattendance(att)
        setshowlink(false);
        // console.log(attendance);
        // console.log(att);
    }

    const processCSV = (str, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\n');

        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                if(typeof(values[i]) != "undefined" && values[i].length>0)
                {
                    obj[header] = values[i];
                    console.log(values[i]);
                }
                // console.log(values[i]=='', values[i]);
                return obj;
            }, {})
            return eachObject;
        })
        const finalarray=newArray.slice(0,-1);
        console.log(finalarray);
        setheaders(headers)

        setCsvArray(finalarray)
        fillattendance(finalarray)
        localStorage.setItem('csvarray', JSON.stringify(finalarray))
        localStorage.setItem('headers', JSON.stringify(headers))
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function (e) {
            const text = e.target.result;
            processCSV(text)
        }

        reader.readAsText(file);
        setshowlink(true);
    }

    const handleOnChange = (position) => {
        // console.log(attendance);
        var updatedAttendance = attendance
        setcount(count + 1);

        for (let i = 0; i < csvArray.length; i++) {
            if (i === position) {
                updatedAttendance[i] = !attendance[i];
            }
        }
        setattendance(updatedAttendance)
        console.log(attendance);
    };

    function SaveData() {
        const d = new Date();
        const date = d.toDateString();
        settoday(date)
        console.log(headers);
        console.log(csvArray);
        var n = headers.length;
        var h = []
        for (let i = 0; i < n; i++) {
            h[i] = { label: headers[i], key: headers[i] }
        }
        h[n]={label: date, key:"attendance"}
        setcsvheaders(h)
        var data = []
        var m = csvArray.length;
        // { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
        for (let i = 0; i < m; i++) {
            data[i] = {}
            for (let j = 0; j < n; j++) {
                data[i][headers[j]] = csvArray[i][headers[j]]
            }
            if (attendance[i] == true) {
                data[i]["attendance"]='P'
            }
            else {
                data[i]["attendance"]='A'
            }
        }
        setcsvdata(data);
        setshowlink(true);
    }

    return (
        <>
            <div>
                <nav className='topnav'>
                    <Link className='link' to='/'>Home</Link>
                    <Link className='link' to='/generate'>Display Random Student</Link>
                </nav>
            </div>

            <div id='csv-form' className='container'>
                <div className='form-group'>
                    <input
                        type='file'
                        accept='.csv'
                        id='csvFile'
                        className="form-control"
                        onChange={(e) => {
                            setCsvFile(e.target.files[0])
                        }}
                    >
                    </input>
                    <br />
                    <button className='btn btn-primary'
                        onClick={(e) => {
                            e.preventDefault()
                            if (csvFile) submit()
                        }}
                    >
                        Submit
                    </button>
                </div>
                <br />
                <br />
                {csvArray.length > 0 ?
                    <>
                        <div className='table-responsive-sm'>
                            <table className="table table-striped">
                                <thead>
                                    {
                                        headers.map((x) => (
                                            <th key={x}>{x}</th>
                                        ))
                                    }
                                    <th>Present/Absent</th>
                                </thead>
                                <tbody>
                                    {
                                        csvArray.map((item, i) => (

                                            <tr key={i}>
                                                {
                                                    headers.map((x) => (
                                                        <td key={x}>{item[x]}</td>
                                                    ))
                                                }
                                                <td>
                                                    <input type="checkbox" name={item} value={item} checked={!!attendance[i]} onChange={() => handleOnChange(i)} />
                                                    {/* {count} */}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <br />
                        <div>
                            <button className='btn btn-primary' onClick={SaveData}>Save</button>
                        </div>
                        {
                            showlink?
                                <div>
                                    <CSVLink filename={today} data={csvdata} headers={csvheaders}> Download data </CSVLink>
                                </div>
                            :""
                        }
                    </> : null}
            </div>
        </>
    );

}
