import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

function CreateCountryStatistics() {
    const navigate = useNavigate();
    const [newData, setNewData] = useState({
        Country_Name: '',
        Technology_Adoption: '',
        Education_Rate: '',
        Tourism_Arrivals: '',
        Development_Status: '',
        Continent_ID: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/country-statistics', newData)
            .then(res => {
                navigate('/country-statistics'); // Navigate back to the country statistics list
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex bg-black justify-content-center align-items-center conts'>
            <div className="table-container d-flex justify-content-center align-items-center">
                <div className='table-cont p-4' style={{ maxWidth: "800px" }}>
                    <h2 style={{ color: "#09ee09", justifyContent: "center", alignContent: "center", paddingLeft: "100px" }}>Create Country Statistics</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Country Name</label>
                            <input 
                                type="text" 
                                name="Country_Name" 
                                value={newData.Country_Name} 
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
                                value={newData.Technology_Adoption} 
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
                                value={newData.Education_Rate} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Tourism Arrivals</label>
                            <input 
                                type="number" 
                                name="Tourism_Arrivals" 
                                value={newData.Tourism_Arrivals} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Development Status</label>
                            <select 
                                name="Development_Status" 
                                value={newData.Development_Status} 
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
                                value={newData.Continent_ID} 
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

export default CreateCountryStatistics;
