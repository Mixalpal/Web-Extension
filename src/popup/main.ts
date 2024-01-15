import { createApp } from 'vue'
import App from './Popup.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'
import { onMessage, sendMessage } from 'webext-bridge/popup';

onMessage('get-status', async() => {
  
    const status = JSON.parse(localStorage.getItem('tymely-on')!);
    console.log(`got ${status}`)
    sendMessage('set-status', status, 'background')
  }) 

const app = createApp(App)
setupApp(app)
app.mount('#app')
