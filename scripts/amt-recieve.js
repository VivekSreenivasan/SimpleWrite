const electron = require ('electron')
const {ipcMain} = electron

ipcMain.on('synchronous-message',(event,arg)=>{
  event.sender.send(arg)
})
