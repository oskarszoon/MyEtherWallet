// Selectively expose node integration, since all node integrations are
// disabled by default for security purposes
const { ipcRenderer } = require('electron');

window.electronListen = (event, cb) => {
  ipcRenderer.on(event, cb);
};

window.electronSend = (event, data) => {
  ipcRenderer.send(event, data);
};