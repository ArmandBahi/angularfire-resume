import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Skill {
  name: string;
  rate: number;
  id?: string;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  skillsCollection: AngularFirestoreCollection<Skill>;
  skillsDoc: AngularFirestoreDocument<Skill>;
  skills: Observable<Skill[]>;
  newSkill: object;

  constructor(private afs: AngularFirestore) { }


  /**
   * ngOnInit - component init
   *
   */
  ngOnInit() {
    this.skillsCollection = this.afs.collection<Skill>('skills');
    this.skills = this.skillsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Skill;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.newSkill = {};

    console.log('this.skillsCollection: ', this.skillsCollection);
  }

  /**
   * addSkill - Add a new skill
   *
   * @param  {object} newSkill
   */
  addSkill(newSkill) {
    this.skillsCollection.add(newSkill).then(function() {
        console.log("Document successfully added!");
        newSkill.name = "";
        newSkill.rate = "";
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  /**
   * updateSkill - Update an existing skill
   *
   * @param  {object} oSkill
   */
  updateSkill(oSkill) {
    let skillDoc = this.afs.doc('skills/' + oSkill.id);
    skillDoc.update(oSkill).then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  /**
   * deleteSkill - Update an existing skill
   *
   * @param  {object} oSkill
   */
  deleteSkill(oSkill) {
    let skillDoc = this.afs.doc('skills/' + oSkill.id);
    skillDoc.delete().then(function() {
        console.log("Document successfully deleted!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }
}
