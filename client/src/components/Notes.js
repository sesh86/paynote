import React,{Component} from 'react';
import axios from 'axios';
var ContentEditable = require("react-contenteditable");

class Notes extends Component {
  constructor(props) {
    super(props);
    if(!localStorage.getItem('login')) this.props.history.push('/login')
    this.state = { items: [], text: '' };
    let currentComponent = this;
    axios.post('/getNotes')
    .then(function (response) {
            currentComponent.setState({items:response.data})
        }
    )
    .catch(function (error) {
      console.log(error);
    });    

  }

  render() {
    return (
      <div className="bg-payNotes p-5 ">
        <div className="card">
          <div className="card-header">
            <form onSubmit={this.createNote}>
              <div className="row ">
                  <div className="mx-auto">
                    <div className="input-group">
                    <input className="input-group-addon"
                      id="new-note"
                      onChange={this.changeText}
                      value={this.state.text}
                    />
                    <button className="input-group-addon">
                      Add a New Note
                    </button>
                    </div>
                  </div>
                </div>
            </form>
          </div>
          <div className="card-body"><NoteList items={this.state.items} editNote={this.saveNote}/></div>
          <div className="card-footer text-muted">Autosave enabled</div>
      </div>
      </div>
    );
  }

  changeText=(e)=> {
    e.preventDefault();
    this.setState({ text: e.target.value });    
  }

  saveNote=(e)=> {
        let currentComponent=this;
        axios.post('/saveEditedNote',{index:e.currentTarget.id,note:e.currentTarget.value})
        .then(function (response) {
                currentComponent.setState({items:response.data})
            }
        )
        .catch(function (error) {
          console.log(error);
        });            
  }

  createNote=(e)=> {
    e.preventDefault();
    if (!this.state.text.length) {return;}
    let currentComponent=this;
    this.setState({items:[]})
    axios.post('/createNote',{note:this.state.text})
    .then(function (response) {
            currentComponent.setState({items:response.data})
        }
    )
    .catch(function (error) {
      console.log(error);
    });    
    
    this.setState(state => ({
      text: ''
    }));
  }
}

const NoteList =(props)=>{
  return (
    <div className="container">
    {props.items.length>0 ? "" :<div className="col-12 m-5 mx-auto">Add a note</div>}
    <div className="row justify-content-around">
      {props.items.map((item,index) => (
          <div className="m-3 col-sm-3">
              <textarea className="notes" contentEditable="true" key={index} id={index} onChange={props.editNote} defaultValue={item}></textarea>
          </div>
      ))}
    </div>
    </div>
  );
}

export default Notes;
