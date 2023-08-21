import axios from 'axios'
import React from 'react'

function List(props) {

    const {id,value,updateMode,setUpdate}=props

    function handdleDelete(id){
        axios.delete(`http://localhost:5000/${id}`)
        .then((res)=>{
            console.log(res);
            setUpdate(prevupdate=>!prevupdate);
        })
    }

    return (
        <li className='list-group-item d-flex justify-content-between'>
            {value}
            <div>
                <button className='btn btn-secondary m-2' onClick={()=>updateMode(id,value)} >Edit</button>
                <button className='btn btn-danger' onClick={()=>handdleDelete(id)}>delete</button>
            </div>
        </li>
    )
}

export default List