import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BreakpointTypes, CssGroup, CssPropertyTypes} from "./css-group.model";
import {CssService} from "./css.service";

declare var chrome: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'browser-tacit';
  cssGroups$ = new BehaviorSubject<Map<string, CssGroup>>(new Map<string, CssGroup>());

  constructor(protected cssService: CssService) {
  }

  ngOnInit() {
    this.subscribe();
  }

  onChanged(data: { key: string, value: string }) {
    this.send({type: 'set-variable', variable: data});
  }

  send(data: { type: string, variable?: { key: string, value: string } } = {type: 'get-variables'}) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then((data: any) => {
      chrome.tabs.sendMessage(data[0].id, data).then((d: any) => {
        console.log(d);
      });
    })
  }

  subscribe() {
    chrome.runtime.onMessage.addListener((request: { moduleClassName: string, vars: Array<string> }, sender: any, sendResponse: any) => {
        this.cssGroups$.next(this.cssService.buildCssGroupsMap(request));

        console.log(this.cssGroups$.getValue());

        sendResponse({msg: "OK"});
      }
    );
  }
}
