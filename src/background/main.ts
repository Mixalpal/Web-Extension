import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'

const siteList = ref()
const isActive = ref()

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

let previousTabId = 0

browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(tabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  //console.log(await browser.storage.local.get('timely-blocked-sites'))

  // eslint-disable-next-line no-console
  // console.log('current tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

browser.tabs.onCreated.addListener(async (tab: Tabs.Tab) => {
  // await sendMessage('get-status', {}, 'popup')
  // console.log(isActive.value)
  // if(isActive.value === true) {
  //   return;
  // }
  for (let i = 0; i < siteList.value.length; i++) {
    console.log(tab);
    console.log(siteList.value[i])
    browser.tabs.remove(tab.id!)
    if (tab.pendingUrl!.includes(siteList.value[i])) {
      browser.runtime.openOptionsPage(); 
      return;
    }
  }
})

browser.tabs.onUpdated.addListener(async (tab: number) => { 
  //browser.tabs.query(tab)
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.url,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})

onMessage('change-site-list', async (list) => {
  console.log(list);
  siteList.value = JSON.parse(JSON.stringify(list.data));
  console.log(siteList.value)
})

onMessage('set-status', async (status) => {
  isActive.value = JSON.parse(JSON.stringify(status));
})
