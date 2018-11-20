import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Materialize from 'materialize-css'

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
    showEditBtn;
    showEditForm;
    showDescr;
    showNewBtn: boolean;
    showNewForm: boolean;

    constructor(private afs: AngularFirestore) { }

    /**
    * ngOnInit - component init
    *
    */
    ngOnInit() {
        this.skillsCollection = this.afs.collection<Skill>('skills', ref => ref.orderBy('rate', 'desc'));
        this.skills = this.skillsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Skill;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
        this.newSkill = {};
        this.showEditBtn = [];
        this.showEditForm = [];
        this.showDescr = [];
        this.showNewBtn = false;
        this.showNewForm = false;
    }

    /**
    * addSkill - Add a new skill
    *
    * @param  {object} newSkill
    */
    addSkill(newSkill) {
        this.skillsCollection.add(newSkill).then(function() {
            Materialize.toast('Skill successfully added', 3000, 'green');
            newSkill.name = "";
            newSkill.rate = "";
        })
        .catch(function(error) {
            Materialize.toast('Error when adding skill', 3000, 'red');
            console.error("Error writing document: ", error);
        });
    }

    /**
    * updateSkill - Update an existing skill
    *
    * @param  {object} oSkill
    */
    updateSkill(oSkill) {
        console.log("oSkill: ", oSkill);
        let skillDoc = this.afs.doc('skills/' + oSkill.id);
        skillDoc.update(oSkill).then(function() {
            Materialize.toast('Skill successfully updated', 3000, 'green');
        })
        .catch(function(error) {
            Materialize.toast('Error when updating skill', 3000, 'red');
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
            Materialize.toast('Skill successfully deleted', 3000, 'green');
        })
        .catch(function(error) {
            Materialize.toast('Error when deleting skill', 3000, 'red');
            console.error("Error writing document: ", error);
        });
    }
}
