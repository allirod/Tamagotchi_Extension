/*global chrome*/

let feedCount = 0;

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ feedCount });
    console.log(feedCount);
  });