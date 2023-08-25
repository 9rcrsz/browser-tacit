import {Injectable} from "@angular/core";

declare var chrome: any;

@Injectable({providedIn: "root"})
export class ChromeService {

  send(request: {
    type: string,
    variables?: Array<{ key: string, value: string }> | Array<string>
  } = {type: 'get-variables'}) {
    try {
      chrome.tabs.query({active: true, lastFocusedWindow: true}).then((data: any) => {
        chrome.tabs.sendMessage(data[0].id, request).then((d: any) => {
          console.log(d);
        });
      })
    } catch (e) {
      console.error('Can\'t send');
    }
  }

  subscribe() {
    chrome.runtime.onMessage.addListener((request: {
        moduleClassName: string,
        vars: Array<string>
      }, sender: any, sendResponse: any) => {
        sendResponse({msg: "OK"});
      }
    );
  }
}
