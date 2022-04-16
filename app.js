// const validator=require('validator');
const chalk=require('chalk');
const yargs=require('yargs');//it does string parsing and it makes command line argument simple to use
const notes=require('./notes.js');

//Taking command line argument using process.argv
// console.log(process.argv[2]);

//customie yargs version
yargs.version('1.1.0');

//In notes app user can add, remove, read, list notes

//Create add command
yargs.command({//we are modifying the command function of yargs package//node app.js --help->to check the commands that we ahve added in the yargs command function for our version
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,//this we set to true if we want to mandatory take the cmd line input for title
            type: 'string'//if we want only string value for the title in cmd line arg
            //node app.js add --title="shopping list"   we run it like this in console
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // console.log('Title: '+argv.title);
        // console.log('Body: '+argv.body);
        notes.addNote(argv.title,argv.body);
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
});

//creating list command
yargs.command({
    command: 'list',
    describe: 'List addeed notes',
    handler(){
        notes.listNotes();
    }
});

//Create read command
yargs.command({
    command: 'read',
    describe: 'Read our note',
    builder:{
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title);
    }
});

//Creating notes APP using command line argument
const command=process.argv[2];
// console.log(command);
//console.log(yargs.argv); //we cannot remove this line bcz we need to parse the cmd line arg or else we ca use yargs.parse()
yargs.parse();//we have to use this line bcz it will not parse the argv argument to yargs package if this line will not be there so we cannot use yargs.command
