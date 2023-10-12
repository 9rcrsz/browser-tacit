import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject} from "rxjs";
import {take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class TemplatesService {
  templates = new Map<string, AsyncSubject<Map<string, string>>>();
  templateName$ = new BehaviorSubject<string | null>(null);

  constructor(protected http: HttpClient) {
  }

  loadTemplate(templateName: string) {
    if (this.templates.has(templateName)) {
      return;
    }

    this.templates.set(templateName, new AsyncSubject<Map<string, string>>());
    this.http.get('/assets/templates/' + templateName + '.txt', {responseType: 'text'})
      .pipe(take(1))
      .subscribe(text => {
        const templateVariables = new Map();
        const tmpTextArr = text.split("\n");
        tmpTextArr.forEach(line => {
          const lineArr = line.split(':');
          if (lineArr.length !== 2) {
            return;
          }

          templateVariables.set(lineArr[0].trim(), lineArr[1].trim().replace(';', ''));
        });

        this.templates.get(templateName)!.next(templateVariables);
        this.templates.get(templateName)!.complete();

        console.log(this.templates)
      });
  }
}


