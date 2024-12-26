let currentNoteId = null;

document.getElementById('saveNote').addEventListener('click', saveNote);
document.getElementById('deleteNote').addEventListener('click', deleteNote);

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title || !content) {
        alert('Пожалуйста, введите название и текст заметки.');
        return;
    }

    const notesList = document.getElementById('notesList');

    if (currentNoteId) {
        const noteItem = document.getElementById(currentNoteId);
        noteItem.innerHTML = `<strong>${title}</strong><br>${content}`;
        noteItem.onclick = function() {
            editNote(currentNoteId, title, content);
        };
    } else {
        const noteItem = document.createElement('div');
        const noteId = `note-${Date.now()}`;
        noteItem.id = noteId;
        noteItem.className = 'note-item';
        noteItem.innerHTML = `<strong>${title}</strong><br>${content}`;
        noteItem.onclick = function() {
            editNote(noteId, title, content);
        };
        notesList.appendChild(noteItem);
    }

    clearInputs();
    currentNoteId = null;
}

function deleteNote() {
    if (currentNoteId) {
        document.getElementById(currentNoteId).remove();
        clearInputs();
        currentNoteId = null;
    } else {
        alert('Сначала выберите заметку для удаления.');
    }
}

function editNote(noteId, title, content) {
    currentNoteId = noteId;
    document.getElementById('noteTitle').value = title;
    document.getElementById('noteContent').value = content;
}

function clearInputs() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
}
