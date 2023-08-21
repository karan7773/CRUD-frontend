import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import List from './components/List';

function App() {

  const [input,setinput]=useState('');
  const [tasks,setTasks]=useState([]);
  const [update,setUpdate]=useState(false);
  const [updateId,setUpdateID]=useState(null)

  useEffect(()=>{
    axios.get('http://localhost:5000')
    .then((res)=>{
      // console.log(res.data);
      setTasks(res.data)
      console.log(input);
      // setinput('')
    })
  },[update])

  function handdleSubmit(){
    axios.post('http://localhost:5000',{
      val:input
    })
    .then((res)=>{
      console.log(res.data)
      setinput('')
      setUpdate(prevupdate=>!prevupdate)
    })
  }

  function updateMode(id,value){
    console.log(id)
    setinput(value);
    setUpdateID(previd=>id);
  }

  function handdleUpdate(){
    axios.patch(`http://localhost:5000/${updateId}`,{val:input})
    .then((res)=>{
      console.log("success")
      setinput('');
      setUpdateID(null);
      setUpdate(prevupdate=>!prevupdate)
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="App">
      <h1 className='text-center'>CRUD OPERATIONS</h1>
      <div className='row'>
        <div className='offset-lg-2 col-lg-8 mt-3 '>
          <div className='input-group'>
            <input 
              className='form-control m-3' 
              value={input}
              onChange={e=>setinput(e.target.value)} 
              placeholder='Enter to add'
            />
            <button 
              onClick={updateId ? handdleUpdate : handdleSubmit} 
              className='btn btn-primary m-3'> {updateId ? "Update Task" : "Add Task"} </button>
          </div>
          <ul className='list-group'>
            {
              tasks.map((item)=>{
                return <List 
                  key={item._id} 
                  id={item._id} 
                  value={item.val} 
                  updateMode={updateMode} 
                  setUpdate={setUpdate} />
              }) 
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
