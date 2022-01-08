import React, { useState, useEffect } from 'react'
import styles from './style.css';
import { Link } from 'react-router-dom';

export default function RandomStudentGenerator(props) {

    const [students, setstudents] = useState([])
    const [number, setnumber] = useState(1)
    const [csvArray, setCsvArray] = useState(JSON.parse(localStorage.getItem('csvarray')) || []);
    const [headers, setheaders] = useState(JSON.parse(localStorage.getItem('headers')) || [])
    const [column, setcolumn] = useState("")


    function CheckMultipleOccurance(arr, n) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == n) {
                return true;
            }
        }
        return false;
    }

    function getRandomdata() {
        console.log(number);
        console.log(column);
        setstudents([])
        var arr = []
        var st = []
        var m = 0;
        var n = csvArray.length;
        n -= 1;
        var i = 0;
        while (i < number) {
            var a = Math.floor((Math.random() * n) + 0);
            console.log(a);
            if (!CheckMultipleOccurance(arr, a)) {
                arr[m] = a;
                st[m] = csvArray[a][column];
                m++;
            }
            else {
                i--;
            }
            i++;
        }
        setstudents(st);
        console.log(st);
    }


    return (
        <div>
            <nav className='topnav'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/generate'>Display Random Student</Link>
            </nav>

            <div className='container content'>
                <div className='row'>
                    <div className='col-md-6 col-sm-6 selectgroup'>
                        <label>no. of Random values to be generated</label>
                        <select className='form-control' value={number} onChange={(e) => setnumber(e.target.value)}>
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <br />
                    <div className='col-md-6 col-sm-6 selectgroup'>
                        <label>Select The display Type</label>
                        <select className='form-control' value={column} onChange={(e) => setcolumn(e.target.value)}>
                            <option selected>Display Type</option>
                            {
                                headers.map((x) => (
                                    <option value={x} key={x}>{x}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <br /><br />
                <div className='displaybtn'>
                    <button className='btn btn-primary' onClick={getRandomdata}>Display</button>
                </div>

                <br />
                <br />
                <div>
                    {students.length > 0 ?
                        <>
                            <table className="table table-hover random-generated-table">
                                <thead>
                                    <th>{column}</th>
                                </thead>
                                <tbody>
                                    {
                                        students.map((x) => (

                                            <tr key={x}>
                                                <td>{x}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </> : null}
                </div>
            </div>
        </div>
    )
}
