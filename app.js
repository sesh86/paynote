const express=require('express')
const _app=require('./config.js')
const cors=require('cors');
var fs=require('fs');

notes=fs.readFileSync(__dirname+'/notes.json');
notes=JSON.parse(notes);

app=express();

app.use(express.json());

app.post('/login',cors(),(req,res)=>{

    try{
        if(req.body.userName=='user@example.com' && req.body.password=='1234'){
            res.send('success')
        }
        else{
            res.send('Invalid UserName or Password')
        }
    }
    catch(e){
        res.send(e)
    }
});

app.post('/getNotes',cors(),(req,res)=>{
    try{
            res.send(notes)
    }
    catch(e){
        res.send(e)
    }
});

app.post('/saveEditedNote',cors(),(req,res)=>{
    
    let index=req.body.index;
    let newNote=req.body.note;
    notes[index]=newNote;
    
    try{
        res.send(notes)
    }
    catch(e){
        res.send(e)
    }
});

app.post('/createNote',cors(),(req,res)=>{
    let newNote=req.body.note;
    notes.unshift(newNote);
    
    try{
        res.send(notes)
    }
    catch(e){
        res.send(e)
    }
});

app.listen(_app.port);

console.log('Application is running on http://localhost:'+ _app.port);