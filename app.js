const express=require('express')
const _app=require('./config.js')

var fs=require('fs');
notes=fs.readFileSync(__dirname+'/notes.json');
notes=JSON.parse(notes);

app=express();

app.use(express.json());

app.post('/login',(req,res)=>{

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

app.post('/getNotes',(req,res)=>{
    try{
            res.send(notes)
    }
    catch(e){
        res.send(e)
    }
});

app.post('/saveEditedNote',(req,res)=>{
    
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

app.post('/createNote',(req,res)=>{
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