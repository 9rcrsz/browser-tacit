import {Injectable} from "@angular/core";
import {initializeApp} from 'firebase/app';
import {doc, getFirestore, setDoc, getDoc, updateDoc, deleteField} from 'firebase/firestore';
import {from, Observable} from 'rxjs';

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

  async setSomething(path: string, data: any) {
    try {
      const docRef = await setDoc(doc(this.db, "png", path), data, {merge: true});
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getSomething(path: string): Observable<any> {
    return from(getDoc(doc(this.db, "png", path)));
  }

  removeField(path: string, field: string): Observable<any> {
    return from(updateDoc(doc(this.db, 'png', path), {
      [field]: deleteField()
    }));
  }
}
