import { Script } from "./popup/types/Scripts";

export async function getCurrentTabUrl(): Promise<{ tabUrl: string; tabId: number }> {
  return new Promise((resolve, reject) => {
    if (!chrome.tabs) return reject("chrome.tabs is undefined");

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab && tab.url && tab.id !== undefined) {
        resolve({ tabUrl: tab.url.split("?")[0], tabId: tab.id });
      } else {
        reject("No active tab or tab URL found");
      }
    });
  });
}

export function getCurrentUrl(): string {
  return window.location.href.split("?")[0];
}

function getStorageData<T>(key: string): Promise<T | undefined> {
  return new Promise((resolve) => {
    chrome.storage.local.get([ key ], (result: { [key: string]: T }) => {
      resolve(result[key]);
    });
  });
}

export async function runScript(): Promise<void> {
  const currentUrl = getCurrentUrl();

  const scripts = await getStorageData<string>("scripts");
  const scriptsObj:Script[] = JSON.parse(scripts || "[]");

  if (!scriptsObj || scriptsObj.length === 0) return;

  const match = scriptsObj.find(script => currentUrl.startsWith(script.url));

  if (match?.enabled && match.code) {
    const scriptTag = document.createElement("script");
    scriptTag.defer = true;
    scriptTag.textContent = match.code;
    scriptTag.onload = () => {
      console.log("Script executed successfully");
    };

    setTimeout(() => {
      document.body.appendChild(scriptTag);
    }, 2000);
  }
}