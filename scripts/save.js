const {ipcMain, dialog} = require('electron')

ipcMain.on('save-dialog', (event) => {
  const options = {
    title: 'Save text',
    filters: [
      { name: 'Text Documents', extensions: ['txt'] }
    ]
  }
  dialog.showSaveDialog(options, (filename) => {
    event.sender.send('saved-file', filename)
  })
})