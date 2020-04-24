import React,{ Component } from 'react';
import ReactDom from 'react-dom';


const var1='Emran';
/**
 * JSX
 */
const output=(<div>
    <h1>First JSX</h1>
    <p>First Variable value={var1}</p>
</div>);
ReactDom.render(output,document.getElementById('root'));
 const Note=(props)=>{
     const {mykey,title}=props;
    return(
        <div>
            <p>{mykey}={title}</p>
        </div>
    )
 }

 const Notes=props=>{
     const {notes}=props;
     return(
         <div>
             {notes.map(note=>(
                <Note key={note.id} mykey={note.id} title={note.title}/>
                ))}
         </div>
     );
 };

 /**
 * functional component
 * props
 */
const FirstFunction= (props) =>{
    const {title}=props;
    return(
        <div>
            <h1>Test First Component{title}</h1>
            <h1>First Component{props.title}</h1>
        </div>
    )
}
ReactDom.render(<FirstFunction/>,document.getElementById('funComponent'));

/**
 * componet composing
 * attribute
 * class declare
 */

 const FirstComposing=()=>{
     return(
         <div>
             <h1 className="first_class">Test First componet composing</h1>
             <FirstFunction title="first component props"/>
         </div>
     )
 }
 ReactDom.render(<FirstComposing/>,document.getElementById('funComposing'));

 class AddNote extends Component{
     render(){
         return(
            <form>
                <input type="text"/>
                <button>Submit</button>
            </form>
         )
     }
 }
 /**
  * class based component
  * declare state
  * 
  */
 class FirstClass extends Component{
     state={
         notes : [
             {
                id:'1',
                title:'First State',
             },
             {
                id:'2',
                title:'Second State',
             }
        ]
    };
     render(){
         return(
            <div>
                <h1 className="first_class">First componet composing under class</h1>
                <FirstFunction/>
                <Notes notes={this.state.notes}/>
                <AddNote/>
            </div>
         );
     }
 }

ReactDom.render(<FirstClass/>,document.getElementById('notes'));

 export default FirstFunction;
