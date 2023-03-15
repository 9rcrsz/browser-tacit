import { Injectable } from "@angular/core";

declare var chrome: any;

@Injectable({ providedIn: "root" })
export class ChromeService {

  send(request: { type: string, variables?: [{ key: string, value: string }] } = { type: 'get-variables' }) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }).then((data: any) => {
      chrome.tabs.sendMessage(data[0].id, request).then((d: any) => {
        console.log(d);
      });
    })
  }

  subscribe() {
    chrome.runtime.onMessage.addListener((request: { moduleClassName: string, vars: Array<string> }, sender: any, sendResponse: any) => {
      sendResponse({ msg: "OK" });
    }
    );
  }
}