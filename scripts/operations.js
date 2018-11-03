(function(){
    const { ipcRenderer, remote } = require('electron');  
    const fs = require('fs')
    const path = require('path')
    const { readTitles, handleNewFile } = require(path.resolve('actions/uiActions'))
    const { NEW_DOCUMENT_NEEDED, WRITE_NEW_FILE_NEEDED, NEW_FILE_WRITTEN, SAVED, PREFERENCE_SAVED, SAVE_NEEDED } = require(path.resolve('actions/types'))
       let userDataPath = remote.app.getPath('userData');
    let filePath = path.join(userDataPath, 'preferences.json')
    
    let usersStyles  = JSON.parse( fs.readFileSync(filePath) )

    for(let style in usersStyles) {
        document.documentElement.style.setProperty(`--${style}`, usersStyles[style]);
    }
    ipcRenderer.on(PREFERENCE_SAVED, function (event, inputs) {
        for(let style in inputs) {
            document.documentElement.style.setProperty(`--${style}`, inputs[style]);
        }
    });

    let documentTitle = document.getElementById('customtitle')
    let readFileContent = function(dir,el){
    	el.addEventListener('click',function(e){
    		fs.readFile(dir,(err,data)=>{
    			if(err) throw err;
    			fileDir = dir;
    			document.getElementById('content')
    		}
    	}
    }
	ipcRenderer.on(NEW_DOCUMENT_NEEDED, (event , data) => { // when saved show notification on screen
	        let form = document.getElementById('form')
	            form.classList.toggle('show')
	        document.getElementById('title_input').focus()
	        form.addEventListener('submit', function(e){
	            e.preventDefault()
	            let fileName = e.target[0].value
	            ipcRenderer.send(WRITE_NEW_FILE_NEEDED, {
	               dir: `./data/${fileName}.md`
	            })
	            ipcRenderer.on(NEW_FILE_WRITTEN, function (event, message) {
	                handleNewFile(e, `./data/${fileName}.md`, message)
	       });
	            
	    })
	})