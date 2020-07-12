import React,{ Component } from 'react';
//import AddNote from './Sidebar';
import AddNote from './AddNoteHooks';
import { Route,Switch } from 'react-router-dom';
import About from './About';
import NotFound from './NotFound';
import { NoteProvider } from '../contexts/Note.context'
import { NoteContext } from '../contexts/Note.context'
import axios from 'axios';


class Note extends Component{
    static contextType=NoteContext
    handleRemove=async id=>{
        try{
            await axios.delete('https://jsonplaceholder.typicode.com/comments/${id}')
            this.context.removeNote(id);
        }catch(e){
            console.log(e)
        }
    }
  
    render(){
        const {id,name:title,body:description}=this.props.note
        return(
            <div className="row">
                <div className="col-md-12 d-flex">
                    <div className="blog-entry align-self-stretch d-md-flex">
                    <div className="text d-block pl-md-4">
                        <div className="meta mb-3">
                        <div><a href="#">July 20, 2019</a></div>
                        <div><a href="#">Admin</a></div>
                        <div><a href="#" className="meta-chat"><span className="icon-chat"></span> 3</a></div>
                        </div>
                        <h3 className="heading"><a href="#">{title}</a></h3>
                        <p className="ftco-animate fadeInUp ftco-animated">{description}</p>
                        <p onClick={()=> this.handleRemove(id)} className="btn btn-primary py-2 px-3">Remove</p>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

class Notes extends Component{
    static contextType=NoteContext
    render(){
        console.log(this.context)
        return(
            <div className="col-lg-8 ">
                {this.context.notes.map(note=>(
                    <Note key={note.id} note={note} title={note.title} description={note.description}/>
                ))}
            </div>
        )
    }
}

class App extends Component{
    render(){
        return(
            <section className="ftco-section ftco-degree-bg">
            <div className="container">
              <div className="row">
                <NoteProvider>
                    <Switch>
                        <Route path='/add' component={AddNote}/> 
                        <Route path='/' exact component={Notes}/>  
                        <Route path='/about' component={About}/> 
                        <Route component={NotFound} />
                    </Switch>
                </NoteProvider>  
              </div>
            </div>
          </section>
        )
    }
}

export default App