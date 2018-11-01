import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreColleciton } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Note {
  content: string;
  hearts: number;
  ?id: string;
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {

  notesCollection: AngularFirestoreColleciton<Note>;
  notesDoc: AngularFirestoreDoc<Note>;
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
  }


  /**
   * updateNote - Update an existing note
   *
   * @param  {object} oNote
   */
  updateNote(oNote) {
    let noteDoc = this.afs.doc('notes/' + oNote.id);
    noteDoc.update(oNote).then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });;
  }

}
