import React, { useState, useEffect } from 'react'
import styles from './style.css';
import { Link } from 'react-router-dom';

export default function RandomStudentGenerator(props) {

    const [students, setstudents] = useState([])
    const [number, setnumber] = useState(1)
    const [csvArray, setCsvArray] = useState(JSON.parse(localStorage.getItem('csvarray')) || []);
    const [headers, setheaders] = useState(JSON.parse(localStorage.getItem('headers')) || []);
    const [displayheaders, setdisplayheaders] = useState([]);
    const [column, setcolumn] = useState(false)
    const [selectedColumns, setselectedColumns] = useState([])

    useEffect(() => {
        console.log("updated displayheaders");
    }, [displayheaders])

    useEffect(() => {
        console.log("updated students");
    }, [students])

    useEffect(() => {
        filldata()
    }, [])

    function filldata() {
        var a = []
        for (let i = 0; i < headers.length; i++) {
            a[i] = false;
        }
        setselectedColumns(a);
    }

    function CheckMultipleOccurance(arr, n) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == n) {
                return true;
            }
        }
        return false;
    }

    const handleOnChange = (position) => {
        var columns = [...selectedColumns]

        for (let i = 0; i < headers.length; i++) {
            if (i === position) {
                columns[i] = !selectedColumns[i];
            }
        }
        setselectedColumns(columns)
    };


    function getRandomdata() {
        var n = csvArray.length;
        var dc = []
        var h = 0;
        var scl = headers.length;
        for (let i = 0; i < scl; i++) {
            if (selectedColumns[i] === true) {
                dc[h] = headers[i];
                h++;
            }
        }
        setdisplayheaders(dc);
        if (dc.length === 0 || number >= n || column === true) {
            setdisplayheaders(headers);
            setstudents(csvArray);
        }
        else {
            setstudents([]);
            var arr = []
            var st = []
            var m = 0;
            n -= 1;
            var i = 0;
            // setdisplayheaders([column])
            while (i < number && i < n) {
                var a = Math.floor((Math.random() * n) + 0);
                // console.log(a);
                if (!CheckMultipleOccurance(arr, a)) {
                    arr[m] = a;
                    var temp = []
                    for (let j = 0; j < dc.length; j++) {
                        temp[dc[j]] = csvArray[a][dc[j]];
                    }
                    st.push(temp);
                    m++;
                }
                else {
                    i--;
                }
                i++;
            }
            setstudents(st);
            setdisplayheaders(dc)
        }
    }


    return (
        <div>
            <nav className='topnav'>
                <Link className='link' to='/'>Home</Link>
                <Link className='link' to='/generate'>Display Random Student</Link>
            </nav>

            <div className='container content'>
                <div className='row'>
                    <div className='inputdata'>
                        <label>No. of Random values to be generated</label>
                        <input type="number" value={number} onChange={(e) => setnumber(e.target.value)} />
                    </div>
                    <br />
                </div>
                <div >
                    <div className='col-md-6 col-sm-6 selectgroup'>
                        <label>Select The display Type</label>
                        <div>
                            {
                                headers.map((x, i) => (
                                    <div key={x}>
                                        <input type="checkbox" name={x} value={x} checked={selectedColumns[i]} onChange={() => handleOnChange(i)} />
                                        <p value={x} >{x}</p>
                                    </div>
                                ))
                            }
                            <div>
                                <input type="checkbox" name="all" value={column} checked={column} onChange={() => setcolumn(!column)} />
                                <p>All</p>
                            </div>
                        </div>

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
                                    <tr>
                                        {
                                            displayheaders.map((head) => (
                                                <th key={head}>{head}</th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((item, i) => (

                                            <tr key={i}>
                                                {
                                                    displayheaders.map((x) => (
                                                        <td key={x}>{item[x]}</td>
                                                    ))
                                                }
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
