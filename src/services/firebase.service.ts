import {Injectable} from "@angular/core";
import {initializeApp} from 'firebase/app';
import {doc, getFirestore, setDoc, getDoc, updateDoc, deleteField} from 'firebase/firestore';
import {from, Observable, of} from 'rxjs';

@Injectable({providedIn: "root"})
export class FirebaseService {
  protected firebaseConfig = {
    apiKey: "AIzaSyAInNiQbX6iBdZ65YHaMkzDG1OTdQd7lCM",
    authDomain: "plugin-6e461.firebaseapp.com",
    projectId: "plugin-6e461",
    storageBucket: "plugin-6e461.appspot.com",
    messagingSenderId: "561529345847",
    appId: "1:561529345847:web:ed94fcd3208613e0bdecb2"
  };
  protected app = initializeApp(this.firebaseConfig);
  protected db = getFirestore(this.app);

  async setSomething(project: string | null, path: string, data: any, isMerge = true) {
    if (!project) {
      return;
    }

    try {
      const docRef = await setDoc(doc(this.db, project, path), data, {merge: isMerge});
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getSomething(project: string | null, path: string): Observable<any> {
    if (!project) {
      return of({});
    }

    return from(getDoc(doc(this.db, project, path)));
  }

  removeField(project: string | null, path: string, field: string): Observable<any> {
    if (!project) {
      return of({});
    }

    return from(updateDoc(doc(this.db, project, path), {
      [field]: deleteField()
    }));
  }

  removeFields(project: string | null, path: string, fields: Array<string>): Observable<any> {
    if (!project || !fields.length) {
      return of({});
    }

    const toRemove: any = {};
    fields.forEach(f => {
      toRemove[f] = deleteField();
    });

    return from(updateDoc(doc(this.db, project, path), toRemove));
  }
}
