const fs=require('fs');
const chalk=require('chalk');

const addNote=function(title,body){
    const notes=loadNotes();
    // const duplicateNotes=notes.filter((note)=>note.title===title);
    const duplicateNote=notes.find((note)=>note.title===title);//To optimize the code we have used find method instead of filter method bcz filter method will run for whole array if it will find the match also

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note added!'));
    }
    else{
        console.log(chalk.red.inverse('Note title taken!'));
    }
    
}

const saveNotes=(notes)=>{
    const dataJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json');
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(err){
        return [];
    }
}

const removeNotes=(title)=>{
    const notes=loadNotes();
    const notesToKeep=notes.filter((note)=>!(note.title===title));
    if(notes.length > notesToKeep.length)
    {
        saveNotes(notesToKeep);
        console.log(chalk.inverse.green('Note removed!'));
    }
    else{
        console.log(chalk.inverse.red('No Note found!'));
    }
}

const listNotes=()=>{
    console.log(chalk.yellow.inverse('Your notes..'));

    const notes=loadNotes();
    notes.forEach(note=> {
        console.log(note.title);
    });
}

const readNotes=(title)=>{
    const notes=loadNotes();
    const note=notes.find((note)=>note.title===title);
    if(note){
        console.log(chalk.green.bold(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('No note found'));
    }

}
module.exports={
    addNote: addNote,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
};