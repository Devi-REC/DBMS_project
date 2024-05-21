import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import './EditCountryStatistics.css'; 

function EditCountryStatistics() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editData, setEditData] = useState({
        Country_ID: '',
        Country_Name: '',
        Technology_Adoption: '',
        Education_Rate: '',
        Tourism_Arrivals: '',
        Development_Status: '',
        Continent_ID: ''
    });

    useEffect(() => {
        fetchCountryData();
    }, [id]);

    const fetchCountryData = () => {
        axios.get(`http://localhost:8081/country-statistics/${id}`)
            .then(res => setEditData(res.data))
            .catch(err => console.log(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/country-statistics/${editData.Country_ID}`, editData)
            .then(res => {
                navigate('/country-statistics'); // Navigate back to the country statistics list
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex bg-black justify-content-center align-items-center conts'>
            <div className="table-container d-flex justify-content-center align-items-center">
                <div className='table-cont p-4' style={{ maxWidth: "800px" }}>
                    <h2 style={{ color: "#09ee09", justifyContent: "center", alignContent: "center", paddingLeft: "100px" }}>Edit Country Statistics</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Country Name</label>
                            <input 
                                type="text" 
                                name="Country_Name" 
                                value={editData.Country_Name} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Technology Adoption</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                name="Technology_Adoption" 
                                value={editData.Technology_Adoption} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Education Rate</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                name="Education_Rate" 
                                value={editData.Education_Rate} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tourism Arrivals</label>
                            <input 
                                type="number" 
                                name="Tourism_Arrivals" 
                                value={editData.Tourism_Arrivals} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Development Status</label>
                            <select 
                                name="Development_Status" 
                                value={editData.Development_Status} 
                                onChange={handleInputChange}
                                className="form-control" 
                            >
                                <option value="Developed">Developed</option>
                                <option value="Developing">Developing</option>
                                <option value="Underdeveloped">Underdeveloped</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Continent ID</label>
                            <input 
                                type="number" 
                                name="Continent_ID" 
                                value={editData.Continent_ID} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditCountryStatistics;
