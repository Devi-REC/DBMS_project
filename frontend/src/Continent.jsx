import React, { useEffect, useState  } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import './App.css';
import './Continent.css';
import Header from './Header';

function Continent() {
    const [continentID, setContinentID] = useState('');
    const [unemploymentData, setUnemploymentData] = useState([]);
    const [countryStatisticsData, setCountryStatisticsData] = useState([]);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({
        Continent_ID: '',
        Continent_Name: '',
        Population: '',
        TotalCountries: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:8081')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };

    const handleEditClick = (continent) => {
        setEditData(continent);
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const url = `http://localhost:8081/continent/${editData.Continent_ID}`;
        axios.put(url, editData)
            .then(res => {
                console.log('Form submitted successfully:', res);
                fetchData(); // Refresh the data
                setIsEditing(false); // Close the edit form
            })
            .catch(err => {
                console.error('Error submitting form:', err);
            });
    };
    const handleBackClick = () => {
        setIsEditing(false);
        setIsCreating(false);
    };
    const handleSearch = () => {
        if (continentID >= 1 && continentID <= 7) {
            axios.get(`http://localhost:8081/continent/${continentID}`)
                .then(res => {
                    setUnemploymentData(res.data.unemployment);
                    setCountryStatisticsData(res.data.countryStatistics);
                    setError('');
                })
                .catch(err => {
                    console.error(err);
                    setError('Failed to fetch data. Please try again.');
                });
        } else {
            setError('Please enter a continent ID between 1 and 7.');
        }
    };

    return (
        <div>
            <div className='con' style={{ padding: '20px', marginBottom: '20px' }}>
                <Header />
            </div>
            <div>
            <div className='container' style={{ paddingBottom: '10px', marginBottom: '40px' }}>
                <h1 style={{ color: "#09ee09", textAlign: "center", padding: "20px 0", fontWeight: "bold" }}>Continent Details</h1>
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <input
                        type="number"
                        placeholder="Enter Continent ID (1-7)"
                        value={continentID}
                        onChange={(e) => setContinentID(e.target.value)}
                        style={{
                            backgroundColor: 'black',
                            color: '#09ee09',
                            padding: '10px',
                            width: '400px', // Adjust width as needed
                            borderRadius: '5px',
                            marginBottom: "20px" ,
                            border: '1px solid #09ee09' // Add border for better visibility
                        }}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div className="row">
                    <div className="col">
                        <h2>Unemployment Data</h2>
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                <th>Country_Name</th>
                                    <th>Total Unemployment</th>
                                    <th>Youth Unemployment</th>
                                    <th>Longterm Unemployment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{unemploymentData.CounTRY_Name}</td>
                                    <td>{unemploymentData.Total_Unemployment}</td>
                                    <td>{unemploymentData.Youth_Unemployment}</td>
                                    <td>{unemploymentData.Longterm_Unemployment}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col">
                        <h2>Country Statistics Data</h2>
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th>Country_Name</th>
                                    <th>Technology Adoption</th>
                                    <th>Education Rate</th>
                                    <th>Tourism Arrivals</th>
                                    <th>Development Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>{countryStatisticsData.Country_Name}</td>
                                    <td>{countryStatisticsData.Technology_Adoption}</td>
                                    <td>{countryStatisticsData.Education_Rate}</td>
                                    <td>{countryStatisticsData.Tourism_Arrivals}</td>
                                    <td>{countryStatisticsData.Development_Status}</td>
                                   
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            <div className='container' style={{ paddingBottom: '10px' ,marginBottom: '40px'}}>
            <h1 style={{ color: "#09ee09", textAlign: "center", padding: "20px 0", fontWeight: "bold" }}>Continent List</h1>
            <table className="table table-dark">
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
                    {data.map((cont, index) => (
                        <tr key={index}>
                            <td>{cont.Continent_ID}</td>
                            <td>{cont.Continent_Name}</td>
                            <td>{cont.Population}</td>
                            <td>{cont.TotalCountries}</td>
                            <td>
                                <div style={{ paddingBottom: '5px' }}>
                                    <button
                                        className="btn btn-outline-light"
                                        style={{ width: '100px', borderColor: 'blue' }}
                                        onClick={() => handleEditClick(cont)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && (
                <div className="edit-form-container" style={{ border: '1px solid #09ee09', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
                    <h3 style={{ color: "#09ee09", fontWeight: "bold" }}>Edit Continent</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label>Continent Name</label>
                            <input
                                type="text"
                                name="Continent_Name"
                                value={editData.Continent_Name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Population</label>
                            <input
                                type="number"
                                name="Population"
                                value={editData.Population}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Total Countries</label>
                            <input
                                type="number"
                                name="TotalCountries"
                                value={editData.TotalCountries}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ paddingBottom: '10px', marginBottom: '20px' }}>Save</button>
                        <button className="btn btn-primary" onClick={handleBackClick} style={{ paddingBottom: '10px' ,marginBottom: '20px'}}>Back</button>
                    </form>
                </div>
            )}
        </div>
        </div>
    );
}

export default Continent;
