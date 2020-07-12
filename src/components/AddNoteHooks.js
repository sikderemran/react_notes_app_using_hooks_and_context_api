import React,{useState,useContext} from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { NoteProvider } from '../contexts/Note.context'
import { NoteContext } from '../contexts/Note.context'
import axios from 'axios';

const AddNote =(props)=>{
    const context=useContext(NoteContext)
    const [note,setNote]=useState({
        id:uuid,
        title:'',
        description:'',
    })
    const [error,setError]=useState({})
    const handleChange=(e)=>{
        setNote({
            ...note,
            [e.target.name]:e.target.value
        })
        
    }

    const handelSubmit=async e=>{
        e.preventDefault();
        if(note.title===''){
            setError({
                ...error,
                title:'please provide title',
                description:''
            })
            return
        }
        if(note.description===''){
            setError({
                ...error,
                title:'',
                description:'please provide description'
            })
            return
        }
        try{
            const res=await axios.post('https://jsonplaceholder.typicode.com/comments/',{   
                name:note.title,
                body:note.description,
            })
        const {data}=res
        context.addNote(data)
        props.history.push('/')
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div className="col-lg-4 sidebar">
            <div className="sidebar-box">
            <form onSubmit={handelSubmit} className="subscribe-form">
                <input type="text" name="title" value={note.title} onChange={handleChange} className={classNames('form-control',!!error.title && 'is-invalid')} placeholder="Enter Your Title"/>
                <div className="invalid-feedback">Title Must Requird</div>
                <br/>
                <textarea className={classNames('form-control',!!error.description && 'is-invalid')} name="description" value={note.description} onChange={handleChange}></textarea>
                <div className="invalid-feedback">Description Must Requird</div>
                <br/>
                <button className="btn btn-primary py-2 px-3 submit px-3">Submit</button>
            </form>
            </div>
        </div>
    ) 
}

    
   

export default AddNote