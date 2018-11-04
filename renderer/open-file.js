const {ipcRenderer} = require('electron')
const fs = require('fs')
const selectDirBtn = document.getElementById('select-file')

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-file-dialog')
})
selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('stop-kiosk')
})

ipcRenderer.on('selected-file', (event, path) => {
	try {
    var data = fs.readFileSync(path[0], 'utf8');
    document.getElementById('selected-file').innerHTML = data
} catch(e) {
    console.log('Error:', e.stack);
}

})
