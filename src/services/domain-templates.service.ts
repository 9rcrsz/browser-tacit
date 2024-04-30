import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject} from "rxjs";
import {map, take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class DomainTemplatesService {
  domainName$ = new BehaviorSubject<string | null>(null);

  constructor(protected http: HttpClient) {
  }

  loadDomainTemplate(domainName: string) {
    return this.http.get('/assets/templates/' + domainName + '.txt', {responseType: 'text'})
      .pipe(
        map(text => {
          const domainTemplateVariables = new Map();
          const tmpTextArr = text.split("\n");
          tmpTextArr.forEach(line => {
            const lineArr = line.split(':');
            if (lineArr.length !== 2) {
              return;
            }

            domainTemplateVariables.set(lineArr[0].trim(), lineArr[1].trim().replace(';', ''));
          });

          return domainTemplateVariables;
        })
      );
  }
}


