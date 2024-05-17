import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Home.css';
import './App.css';


function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='d-flex  bg-black justify-content-center align-items-center conts'>
        <div className="table-container d-flex justify-content-center align-items-center">
            <div className='table-cont p-4' style={{maxWidth:"800px"}}>
                <h2 style={{color:"#09ee09",justifyContent:"center",alignContent:"center",paddingleft:"100px"}}>Continent List</h2>
                <div className='d-flex justify-content-end'style={{paddingBottom: '10px' }}>
                    <Link to='/create' className='btn btn-outline-light'style={{ width: '100px', borderColor: '#09ee09' }}>Create +</Link>
                </div>
                <table className="table table-dark"> {/* Add Bootstrap table class */}
                    <thead>
                        <tr>
                            <th>Continent_ID</th>
                            <th>Continent_Name</th>
                            <th>Population</th>
                            <th>TotalCountries</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((cont, index) => {
                            return <tr key={index}>
                                <td>{cont.Continent_ID}</td>
                                <td>{cont.Continent_Name}</td>
                                <td>{cont.Population}</td>
                                <td>{cont.TotalCountries}</td>
                                <div style={{ paddingBottom: '5px' }}>
                                    <button className="btn btn-outline-light" style={{ width: '100px', borderColor: 'blue' }}>Edit</button>
                                </div>
                                <div>
                                    <button className="btn btn-outline-light" style={{ width: '100px', borderColor: 'red' }}>Delete</button>
                                </div>
                            </tr>
                        })}

                    </tbody>
                </table>
            </div>
        </div>
        </div>
    )
}

export default Home;
