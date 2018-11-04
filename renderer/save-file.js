const {ipcRenderer} = require('electron')
const fs = require('fs')
const saveBtn = document.getElementById('save-button')

saveBtn.addEventListener('click', (event) => {
  ipcRenderer.send('save-dialog')
})

ipcRenderer.on('saved-file', (event, path) => {
	//console.log(path)
	var data = document.getElementById('selected-file').value
	//console.log(data)
	fs.writeFile(path,data,function(err){
	if (err)
		throw err;
	console.log("File was Saved")
	})
})
