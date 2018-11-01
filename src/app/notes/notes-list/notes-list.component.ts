import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {

  notes: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.notes = db.collection('notes').valueChanges();
  }

  ngOnInit() {
  }

}
