const {ipcMain, dialog} = require('electron')

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, (file) => {
    if (file) {
      event.sender.send('selected-file', file)
    }
  })
})