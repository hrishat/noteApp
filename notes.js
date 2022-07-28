const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);
    
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNote(notes);
        console.log(chalk.green('Note saved!'));
    } else {
        console.log(chalk.red('Note title taken!'));
    };
};

const removeNote = (title) => {
    const notes = loadNotes();

    const updateNotes = notes.filter((note) => note.title !== title);

    if (updateNotes.length !== notes.length) {
        saveNote(updateNotes);
        console.log(chalk.green('Note removed with the title: ' + title));
    } else {
        console.log(chalk.red('Title not found!'));
    };
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.yellow.inverse('Saved Notes:'));

    notes.forEach((note) => {
        console.log(chalk.yellow.bold(note.title));
    });
};

const readNote = (title) => {
    const notes = loadNotes();

    const selectedNote = notes.find((note) => note.title === title);

    if (selectedNote) {
        console.log(chalk.italic.white.inverse(selectedNote.title));
        console.log(chalk.yellow.bold(selectedNote.body));
    } else {
        console.log(chalk.red.bold('Note not found!'));
    };
};

const saveNote = (notes) => {
    const saveNoteJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', saveNoteJSON);
};

const loadNotes = () => {
    try {
        const noteBuffer = fs.readFileSync('notes.json');
        const noteJSON = noteBuffer.toString();
        return JSON.parse(noteJSON);
    } catch (e) {
        return []
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};