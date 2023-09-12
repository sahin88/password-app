

import './App.css';
import api from './api';
import ReactTooltip from 'react-tooltip';
import React, {useEffect, useState} from 'react'
import Pagination from "./components/Pagination";
import clipboard from 'clipboard-copy';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/note_app.css'
import { Toast } from 'react-bootstrap';
import { TrashFill,EyeSlash, EyeFill, Clipboard } from 'react-bootstrap-icons';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


function App() {


    const [passwords, setPasswords]= useState([])
    const [formData, setFormData] =useState({
        url: "",
        name: "",
        password: "",
        showPassword: false,
        eyeSlash: true
    })
    const [showPassword, setShowPassword] = useState(false);


    const itemsPerPage = 2; // Set the number of items per page
    const [currentPage, setCurrentPage] = useState(0);
    const pageCount = Math.ceil(passwords.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;

    const currentItems = passwords.slice(offset, offset + itemsPerPage);
    const [showTooltip, setShowTooltip] = useState(false);

    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

    const handleCopyClick = async (valueToBeCopied) => {
    try {
      await clipboard(valueToBeCopied);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Copy failed. Please try again.');
    }
  };

    const filterById = (id) => {
        return passwords.map((item) =>
                item.id === id ? { ...item, showPassword: !item.showPassword } : item);
    }

     const togglePasswordVisibilityInTable = (id) => {

         const updatedValues = passwords.map((item) =>
                item.id === id ? { ...item, showPassword: !item.showPassword,
                eyeSlash:!item.eyeSlash} : item);
         setPasswords(updatedValues)

  };

     const handleDelete = async (id)=>{

         const delete_response = await api.delete(`/passwords/${id}`);
         if (delete_response.status === 204) {
             alert('Password deleted successfully')
             let updatedValue = filterById(id)
             setPasswords(updatedValue)
         }
    }

    const getPasswords= async() => {
        const response = await api.get('/passwords/')
        setPasswords(response.data)
    }
    useEffect(() => {
        getPasswords();
    }, []);

    const handleChanges = (event)=>{
        const value = event.target.type ==='checkbox' ? event.target.checked : event.target.value;
        setFormData({
            ...formData,
        [event.target.name]: value
        });

    }
    const  handleSubmit = async (event) => {
        event.preventDefault();
        await api.post('/passwords/', formData);
        getPasswords();
        setFormData(
            {
                 url: "",
                name: "",
                password: "",
            }
        )
    }

    const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };
  return (
      <div>
           <nav className="navbar navbar-dark, bg-primary" data-bs-theme="dark">
               <div className="container-fluid">
                   <a className='navbar-brand'> PassApp
                   </a>
               </div>
           </nav>
           <div className="container">
            <form onSubmit={handleSubmit}>
                 <div className="mb-3 mt-3">
                    <label htmlFor='name' className='form-label'>
                        Name
                    </label>
                    <input type="text"  placeholder="Enter Page Name" className="form-control" id="name" name="name" onChange={handleChanges} value={formData.name}>
                    </input>
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor='url' className='form-label'>
                        Url
                    </label>
                    <input type="text" placeholder="Enter Page Url" className="form-control" id="url" name="url" onChange={handleChanges} value={formData.url}>
                    </input>
                </div>
                 <div className="mb-3 mt-3">
                      <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                      <input type={showPassword ? 'text' : 'password'} className="form-control"  id="password" name="password" placeholder="Enter your password" onChange={handleChanges} value={formData.password}/>
                      <div className="input-group-append mb-3 mt-3">
                        <button type="button"  className="btn btn-danger btn-sm  " onClick={togglePasswordVisibility}>
                          {showPassword ? 'Hide' : 'Show'} Password
                        </button>
                      </div>
                 </div>
                <button type='submit' className="btn btn-primary">
                    Submit
                </button>



            </form>
               <table className="table table-striped, table-hover table-bordered mt-5">
                  <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Url</th>
                        <th scope="col">Password</th>
                        <th scope="col">Delete</th>
                        <th scope="col">See password</th>
                        <th scope="col">Copy to Clipboard</th>
                    </tr>
                  </thead>
                  <tbody>
                  {currentItems.map((password) => (
                      <tr key={password.id}>
                           <td>{password.name}</td>
                          <td> <a href={password.url}>{password.url} </a></td>
                          <td>{ password.showPassword ? password.password : '**********' }</td>

                          <td>
                               <TrashFill type="button" onClick={()=>handleDelete(password.id)}> Delete</TrashFill>
                          </td>

                           <td>
                               {password.eyeSlash? <EyeSlash type="button"  onClick={() => togglePasswordVisibilityInTable(password.id)}/>:<EyeFill type="button"  onClick={() => togglePasswordVisibilityInTable(password.id)}/>
                               }
                          </td>
                           <td>

                               <Clipboard type="button"   onClick={()=>handleCopyClick(password.password)}> Copy Password</Clipboard>

                          </td>
                      </tr>)
                  )
                  }
                  </tbody>
               </table>
               <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
            </div>
      </div>
  );
}

export default App;
