import React,{Component} from 'react';
import uuid from 'uuid/v4';
import classNames from 'classnames';
import { NoteProvider } from '../contexts/Note.context'
import { NoteContext } from '../contexts/Note.context'
import axios from 'axios';

class AddNote extends Component{
    static contextType=NoteContext
    state={
        id:uuid,
        title:'',
        description:'',
        errors:{}
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handelSubmit=async e=>{
        e.preventDefault();
        if(this.state.title===''){
            this.setState({
                errors:{
                    ...this.state.errors,
                    title:'please provide title'
                }
            })
            return
        }
        if(this.state.description===''){
            this.setState({
                errors:{
                    ...this.state.errors,
                    title:'',
                    description:'please provide description'
                }
            })
            return
        }
        try{
            const res=await axios.post('https://jsonplaceholder.typicode.com/comments/',{   
                name:this.state.title,
                body:this.state.description,
            })
        const {data}=res
        this.context.addNote(data)
        this.props.history.push('/')
        }catch(e){
            console.log(e);
        }
    }
    render(){
        return(
            <div className="col-lg-4 sidebar">
                <div className="sidebar-box">
                <form onSubmit={this.handelSubmit} className="subscribe-form">
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} className={classNames('form-control',!!this.state.errors.title && 'is-invalid')} placeholder="Enter Your Title"/>
                    <div className="invalid-feedback">Title Must Requird</div>
                    <br/>
                    <textarea className={classNames('form-control',!!this.state.errors.description && 'is-invalid')} name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                    <div className="invalid-feedback">Description Must Requird</div>
                    <br/>
                    <button className="btn btn-primary py-2 px-3 submit px-3">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}

export default AddNote