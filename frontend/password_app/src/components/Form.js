import {Clipboard, EyeFill, EyeSlash, TrashFill} from "react-bootstrap-icons";
import React from "react";

function  Form({handleSubmit, handleChanges, showPassword, togglePasswordVisibility, formData}){
    return(
        <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label htmlFor='name' className='form-label'> Name </label>
                <input type="text" placeholder="Enter Page Name" className="form-control" id="name" name="name" onChange={handleChanges} value={formData.name}></input>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor='url' className='form-label'> Url </label>
                <input type="text" placeholder="Enter Page Url" className="form-control" id="url" name="url" onChange={handleChanges} value={formData.url}></input>
            </div>
              <div className="mb-3 mt-3">
                <label htmlFor='username' className='form-label'> Username </label>
                <input type="text" placeholder="Enter User Name" className="form-control" id="username" name="username" onChange={handleChanges} value={formData.username}></input>
            </div>
            <div className="mb-3 mt-3">
                <label htmlFor='password' className='form-label'> Password </label>
                <input type={showPassword ? 'text' : 'password' } className="form-control" id="password" name="password" placeholder="Enter your password" onChange={handleChanges} value={formData.password} />
                <div className="input-group-append mb-3 mt-3">
                    <button type="button" className="btn btn-danger btn-sm  " onClick={togglePasswordVisibility}> {showPassword ? 'Hide' : 'Show'} Password </button>
                </div>
            </div>
            <button type='submit' className="btn btn-primary"> Submit </button>
        </form>
    )
}
export default Form