import {Component} from '@angular/core';

declare var chrome: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'browser-tacit';

  constructor() {
    this.subscribe();
  }

  send() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}).then((data: any) => {
      chrome.tabs.sendMessage(data[0].id, {greeting: "hello"}).then((d: any) => {
        console.log(d);
      });
    })
  }

  subscribe() {
    chrome.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
        console.log(request)
        sendResponse({msg: "OK"});
      }
    );
  }
}
