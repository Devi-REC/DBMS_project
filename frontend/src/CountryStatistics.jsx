import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './Home.css';
import './App.css';
import './Continent.css';
import './CountryStatistics.css'
import Header from './Header';
function CountryStatistics() {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({
        Country_ID: '',
        Country_Name: '',
        Technology_Adoption: '',
        Education_Rate: '',
        Tourism_Arrivals: '',
        Development_Status: '',
        Continent_ID: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false); // Add isCreating state

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8081/country-statistics')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleEditClick = (country) => {
        setEditData(country);
        setIsEditing(true);
    };

    const handleCreateClick = () => {
        setEditData({
            Country_ID: '',
            Country_Name: '',
            Technology_Adoption: '',
            Education_Rate: '',
            Tourism_Arrivals: '',
            Development_Status: '',
            Continent_ID: ''
        });
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting form...');
        const url = isEditing ? `http://localhost:8081/country-statistics/${editData.Country_ID}` : 'http://localhost:8081/country-statistics';
        const method = isEditing ? 'PUT' : 'POST';
        console.log('URL:', url);
        console.log('Method:', method);
        console.log('Data:', editData);
        axios({
            method: method,
            url: url,
            data: editData
        })
        .then(res => {
            console.log('Form submitted successfully:', res);
            fetchData(); // Refresh the data
            setIsEditing(false); // Close the edit form
            setIsCreating(false); // Close the create form
        })
        .catch(err => {
            console.error('Error submitting form:', err);
        });
    };
    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:8081/country-statistics/${id}`)
            .then(res => {
                console.log('Country statistics deleted successfully:', res);
                fetchData();
            })
            .catch(err => {
                console.error('Error deleting country statistics:', err);
            });
    };
    const handleBackClick = () => {
        setIsEditing(false);
        setIsCreating(false);
    };
    return (
        <div>
        <div className='con' style={{  padding: '20px', marginBottom: '20px' }}>
        <Header />
        </div>
        <div className='container'>
    <h1 style={{ color: "#09ee09", textAlign: "center", padding: "20px 0",fontWeight: "bold" }}>Country Statistics List</h1>
    
    <div className="create-button-container">
    <button 
                            className='btn btn-outline-light' 
                            style={{ width: '100px', borderColor: '#09ee09' ,marginBottom: '10px'}}
                            onClick={handleCreateClick} // Handle click on create button
                        >
                            Create +
                        </button>
                        {isCreating && (
                        <div className="create-form-container" style={{ border: '1px solid #09ee09', padding: '20px', borderRadius: '5px',marginBottom: '20px' }}>
                            <h3 style={{ color: "#09ee09"}}>Create Country Statistics</h3>
                            <form onSubmit={handleFormSubmit}>
                                {/* Input fields */}
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
                                <button type="submit" className="btn btn-primary" style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Save</button>
                                <button className="btn btn-primary" onClick={handleBackClick} style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Back</button>
                            </form>
                        </div>
                    )}
    </div>
    <div className='bg-black  align-items-center' style={{ paddingBottom: '10px' ,marginBottom: '40px'}}>
        
                    {/* Add create form */}
                    <div className="table-scroll">
                    <table className="table table-dark" >
                        <thead>
                            <tr>
                                <th>Country ID</th>
                                <th>Country Name</th>
                                <th>Technology Adoption</th>
                                <th>Education Rate</th>
                                <th>Tourism Arrivals</th>
                                <th>Development Status</th>
                                <th>Continent ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((country, index) => (
                                <tr key={index}>
                                    <td>{country.Country_ID}</td>
                                    <td>{country.Country_Name}</td>
                                    <td>{country.Technology_Adoption}</td>
                                    <td>{country.Education_Rate}</td>
                                    <td>{country.Tourism_Arrivals}</td>
                                    <td>{country.Development_Status}</td>
                                    <td>{country.Continent_ID}</td>
                                    <td>
                                        <div style={{ paddingBottom: '5px' }}>
                                            <button 
                                                className="btn btn-outline-light" 
                                                style={{ width: '100px', borderColor: 'blue' }}
                                                onClick={() => handleEditClick(country)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                        <div>
                                        <button 
                                            className="btn btn-outline-light" 
                                            style={{ width: '100px', borderColor: 'red' }}
                                            onClick={() => handleDeleteClick(country.Country_ID)}
                                        >
                                            Delete
                                        </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                   </div>
                    {isEditing && (
                        <div className="edit-form-container" style={{ border: '1px solid #09ee09', padding: '20px', borderRadius: '5px',marginBottom: '20px' }}>
                            <h3 style={{ color: "#09ee09"}}>Edit Country Statistics</h3>
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
                                <button type="submit" className="btn btn-primary" style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Save</button>
                                <button className="btn btn-primary" onClick={handleBackClick} style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Back</button>
                            </form>
                        </div>
                    )}
                   
               </div>         
               
            </div>
           </div> 
    );
}

export default CountryStatistics;
