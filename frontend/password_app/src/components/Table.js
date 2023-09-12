import {Clipboard, EyeFill, EyeSlash, TrashFill} from "react-bootstrap-icons";
import React from "react";


function  Table({currentItems, handleDelete, togglePasswordVisibilityInTable, handleCopyClick}){


    return(<table className="table table-striped, table-hover table-bordered mt-5">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Url</th>
                    <th scope="col">Username</th>
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
                    <td>{password.username}</td>
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
    )
}
export default Table;