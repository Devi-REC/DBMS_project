import axios from 'axios';
import React from 'react';

function Create() {
  const [values,setValues]=useState({
    Continent_Name: '',
    Population: '',
    Totalcountries: ''

  })
  const handleSubmit =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:8081/continent',values)
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }
  return (
    <div className='d-flex vh-100 bg-black justify-content-center align-items-center conts'>
      <div className='w-50 bg-black rounded p-5 conts'>
        <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <h2 style={{ color: 'greenyellow' }}>Add continent</h2>
          </div>
          <div className='mb-3'>
          <div className='mb-3'>
            <label htmlFor='' style={{ color: 'orange' }}>Continent_Name</label>
           </div>
            <input type="text" placeholder="Enter Continent" className='form-control custom-input' style={{ borderColor: 'greenyellow' }}
             onChange={e => setValues({...values,Continent_Name:e.target.value})} />
          </div>
          <div className='mb-3'>
          <div className='mb-3'>
            <label htmlFor='' style={{ color: 'orange' }}>Population</label>
          </div>
            <input type="text" placeholder="Enter Population" className='form-control custom-input' style={{ borderColor: 'greenyellow' }} 
            onChange={e => setValues({...values,Population:e.target.value})} />
          </div>
          <div className='mb-3'>
          <div className='mb-3'>
            <label htmlFor='' style={{ color: 'orange' }}>Totalcountries</label>
            </div>
            <input type="text" placeholder="Enter the number of countries" className='form-control custom-input' style={{ borderColor: 'greenyellow' }} 
            onChange={e => setValues({...values,Totalcountries:e.target.value})} />
          </div>
          <div className='mt-5'>
          <button className='btn btn-outline-light' style={{ width: '100px', borderColor: '#09ee09', transition: 'background-color 0.3s' }}>Submit</button>

        </div>
        </form>
      </div>
    </div>
  )

  }
export default Create;
