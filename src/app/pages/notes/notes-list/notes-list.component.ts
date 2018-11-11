import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Materialize } from 'materialize-css';

export interface Note {
  content: string;
  hearts: number;
  id?: string;
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {

  notesCollection: AngularFirestoreCollection<Note>;
  notesDoc: AngularFirestoreDocument<Note>;
  notes: Observable<Note[]>;
  newNote: object;

  constructor(private afs: AngularFirestore) { }


  /**
   * ngOnInit - component init
   *
   */
  ngOnInit() {
    this.notesCollection = this.afs.collection<Note>('notes');
    this.notes = this.notesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Note;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.newNote = {};

    console.log('this.notesCollection: ', this.notesCollection);
  }

  /**
   * addNote - Add a new note
   *
   * @param  {object} newNote
   */
  addNote(newNote) {
    this.notesCollection.add(newNote).then(function() {
        Materialize.toast('Note successfully added', 3000, 'green');
        newNote.content = "";
        newNote.hearts = "";
    })
    .catch(function(error) {
        Materialize.toast('Error when adding note', 3000, 'red');
        console.error("Error writing document: ", error);
    });
  }

  /**
   * updateNote - Update an existing note
   *
   * @param  {object} oNote
   */
  updateNote(oNote) {
    let noteDoc = this.afs.doc('notes/' + oNote.id);
    noteDoc.update(oNote).then(function() {
        Materialize.toast('Note successfully updated', 3000, 'green');
    })
    .catch(function(error) {
        Materialize.toast('Error when updating note', 3000, 'red');
        console.error("Error writing document: ", error);
    });
  }

  /**
   * deleteNote - Update an existing note
   *
   * @param  {object} oNote
   */
  deleteNote(oNote) {
    let noteDoc = this.afs.doc('notes/' + oNote.id);
    noteDoc.delete().then(function() {
        Materialize.toast('Note successfully deleted', 3000, 'green');
    })
    .catch(function(error) {
        Materialize.toast('Error when deleting note', 3000, 'red');
        console.error("Error writing document: ", error);
    });
  }

}
