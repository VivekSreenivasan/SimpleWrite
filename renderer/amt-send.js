const {ipcRenderer} = require('electron')
const fs = require('fs')
const remote = require('electron').remote
const processBtn = document.getElementById('process')

processBtn.addEventListener('click',(event)=>{
  var amt = document.getElementById("word-amt").value
  console.log(amt)
  ipcRenderer.send('synchronous-message',amt)
  //var window = remote.getCurrentWindow()
  //window.close()
})
