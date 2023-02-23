import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class TemplatesService {
  templates = new Map<string, BehaviorSubject<Map<string, string>>>();

  constructor(protected http: HttpClient) {
  }

  loadTemplate(templateName: string) {
    if (this.templates.has(templateName)) {
      return;
    }

    this.templates.set(templateName, new BehaviorSubject<Map<string, string>>(new Map()));
    this.http.get('/assets/templates/' + templateName + '.txt', {responseType: 'text'})
      .pipe(take(1))
      .subscribe(text => {
        const tmpTextArr = text.split("\n");
        tmpTextArr.forEach(line => {
          const lineArr = line.split(':');
          if (lineArr.length !== 2) {
            return;
          }

          this.templates.get(templateName)!.getValue()
            .set(lineArr[0].trim(), lineArr[1].trim().replace(';', ''));
        });

        console.log(this.templates)
      });
  }
}


