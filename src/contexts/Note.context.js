import React,{ Component,createContext } from 'react';
import axios from 'axios';

export const NoteContext=createContext();
export class NoteProvider extends Component{
    state={
        notes:[
            
            {
                id:'1',
                name:'Even the all-powerful Pointing has no control about the blind texts',
                body:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
            },
        ]
    }
    async componentDidMount(){
       try{
            const res = await axios.get('https://jsonplaceholder.typicode.com/comments')
            const {data}=res
            this.setState({
                notes:data
            })
       }catch(e){
           console.log(e)
       }
    }
    addNote=(note)=>{
        console.log(note)
        this.setState({
            notes:[...this.state.notes,note]
        })
    }
    removeNote=(id)=>{
        this.setState({
            notes:this.state.notes.filter(note=>note.id!==id)
        })
    }
    render(){
        return(
            <NoteContext.Provider value={{notes:this.state.notes,addNote:this.addNote,removeNote:this.removeNote}}>
                {this.props.children}
            </NoteContext.Provider>
        )
    }
}