import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Link } from 'react-router-dom';
import './Home.css';
import './App.css';
import './Continent.css';
import Header from './Header';
function Unemployment() {
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({
        Unemployment_id: '',
        Total_Unemployment: '',
        Youth_Unemployment: '',
        Longterm_Unemployment: '',
        Continent_ID: '',
        Country_Name: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8081/unemployment')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleEditClick = (unemployment) => {
        setEditData(unemployment);
        setIsEditing(true);
    };

    const handleCreateClick = () => {
        setEditData({
            Unemployment_id: '',
            Total_Unemployment: '',
            Youth_Unemployment: '',
            Longterm_Unemployment: '',
            Continent_ID: '',
            Country_Name: ''
        });
        setIsCreating(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const url = isEditing ? `http://localhost:8081/unemployment/${editData.Unemployment_id}` : 'http://localhost:8081/unemployment';
        const method = isEditing ? 'PUT' : 'POST';
        axios({
            method: method,
            url: url,
            data: editData
        })
        .then(res => {
            fetchData();
            setIsEditing(false);
            setIsCreating(false);
        })
        .catch(err => console.log(err));
    };

    const handleDeleteClick = (id) => {
        axios.delete(`http://localhost:8081/unemployment/${id}`)
            .then(res => {
                fetchData();
            })
            .catch(err => console.log(err));
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
            <h1 style={{ color: "#09ee09", textAlign: "center", padding: "20px 0",fontWeight: "bold" }}>Unemployment List</h1>
            <div className="justify-content-end" style={{ paddingBottom: '10px' }}>
                <button className='btn btn-outline-light' style={{ width: '100px', borderColor: '#09ee09' }} onClick={handleCreateClick}>Create +</button>
            </div>
            {isCreating && (
                <div className="create-form-container"  style={{ border: '1px solid #09ee09', padding: '20px', borderRadius: '5px',marginBottom: '20px' }}>
                    <h3  style={{ color: "#09ee09"}}>Create Unemployment</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Total Unemployment</label>
                            <input 
                                type="number" 
                                name="Total_Unemployment" 
                                value={editData.Total_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Youth Unemployment</label>
                            <input 
                                type="number" 
                                name="Youth_Unemployment" 
                                value={editData.Youth_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Longterm Unemployment</label>
                            <input 
                                type="number" 
                                name="Longterm_Unemployment" 
                                value={editData.Longterm_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
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
                        <button type="submit" className="btn btn-primary"style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Save</button>
                        <button className="btn btn-primary" onClick={handleBackClick} style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Back</button>
                    </form>
                </div>
            )}
            <div className='table-responsive' style={{ paddingBottom: '10px' ,marginBottom: '40px'}}>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>Unemployment ID</th>
                            <th>Total Unemployment</th>
                            <th>Youth Unemployment</th>
                            <th>Longterm Unemployment</th>
                            <th>Continent ID</th>
                            <th>Country_name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((unemployment, index) => (
                            <tr key={index}>
                                <td>{unemployment.Unemployment_id}</td>
                                <td>{unemployment.Total_Unemployment}</td>
                                <td>{unemployment.Youth_Unemployment}</td>
                                <td>{unemployment.Longterm_Unemployment}</td>
                                <td>{unemployment.Continent_ID}</td>
                                <td>{unemployment.CounTRY_Name}</td> 
                                
                                <td>
                                    <div>
                                        <button className="btn btn-outline-light" style={{ width: '100px', borderColor: 'blue' }} onClick={() => handleEditClick(unemployment)}>Edit</button>
                                    </div>
                                    <div style={{ marginTop: '5px' }}>
                                        <button className="btn btn-outline-light" style={{ width: '100px', borderColor: 'red' }} onClick={() => handleDeleteClick(unemployment.Unemployment_id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditing && (
                <div className="edit-form-container" style={{ border: '1px solid #09ee09', padding: '20px', borderRadius: '5px',marginBottom: '20px' }}>
                    <h3  style={{ color: "#09ee09"}}>Edit Unemployment</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Total Unemployment</label>
                            <input 
                                type="number" 
                                name="Total_Unemployment" 
                                value={editData.Total_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Youth Unemployment</label>
                            <input 
                                type="number" 
                                name="Youth_Unemployment" 
                                value={editData.Youth_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <div className="form-group">
                            <label>Longterm Unemployment</label>
                            <input 
                                type="number" 
                                name="Longterm_Unemployment" 
                                value={editData.Longterm_Unemployment} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
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
                        <div className="form-group">
                            <label>Country Name</label>
                            <input 
                                type="text" 
                                name="Country_Name" 
                                value={editData.CounTRY_Name} 
                                onChange={handleInputChange}
                                className="form-control" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary"style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Save</button>
                        <button className="btn btn-primary" onClick={handleBackClick} style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Back</button>
                    </form>
                </div>
            )}
        </div>
        </div>
    );
}

export default Unemployment;
