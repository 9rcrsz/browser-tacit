import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class TemplatesService {
  constructor(protected http: HttpClient) {
  }

  loadTemplate(templateName: string): Observable<Array<string>> {
    return this.http.get('/assets/templates/' + templateName + '.txt', {responseType: 'text'})
      .pipe(map(text => {
        return text.split("\n");
      }));
  }
}


