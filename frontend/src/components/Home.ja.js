import Form from "./Form";
import Table from "./Table";
import Pagination from "./Pagination";
import React, {useEffect, useState} from "react";
import clipboard from "clipboard-copy";
import api from "../api";


function Home(){
    const [passwords, setPasswords]= useState([])
    const [formData, setFormData] =useState({
        url: "",
        name: "",
        username: "",
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
                username: "",
                password: "",
            }
        )
    }

    const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

    return(
         <div className="container">
                <Form handleSubmit={handleSubmit}
                      handleChanges={handleChanges}
                      showPassword={showPassword}
                      togglePasswordVisibility={togglePasswordVisibility}
                      formData={formData}/>
               <Table currentItems={currentItems}
                      handleDelete={handleDelete}
                      togglePasswordVisibilityInTable={togglePasswordVisibilityInTable}
                      togglePasswordVisibilityInTable={togglePasswordVisibilityInTable}
                      handleCopyClick={handleCopyClick}/>
               <Pagination pageCount={pageCount}
                           onPageChange={handlePageChange} />
            </div>
    )

}
export default Home;