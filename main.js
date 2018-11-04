if (require.main !== module) {
  require('update-electron-app')({
    logger: require('electron-log')
  })
}

const path = require('path')

const {app, BrowserWindow,ipcMain,globalShortcut} = require('electron')

const debug = /--debug/.test(process.argv[2])

if (process.mas) app.setName('Electron APIs')

let mainWindow = null
let startWindow = null



function initialize () {
  makeSingleInstance()

  loadDemos()

  function createWindow () {
    const windowOptions = {
      width: 1080,
      minWidth: 680,
      height: 840,
      show: false,
      title: app.getName(),
      fullscreen:true,
      closeable: false,
    }


    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    startWindow = new BrowserWindow({parent:mainWindow})
    startWindow.loadURL(path.join('file://',__dirname,'/start.html'))

    ipcMain.on('synchronous-message',(event,arg)=>{

      mainWindow.loadURL(path.join('file://', __dirname,'/index.html'));
      mainWindow.once('show',function(){
         mainWindow.webContents.send('synchronous-message',arg);
      })
      mainWindow.once('ready-to-show', () => {
         mainWindow.show();
      });
    })


    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }
    mainWindow.webContents.once('dom-ready', () => {});

    mainWindow.on('closed', () => {
      mainWindow = null
      startWindow = null
    })
  }

  app.on('ready', () => {

    createWindow()
    mainWindow.on('blur', () => {
      mainWindow.restore();

      mainWindow.setKiosk(true);
    });
    ipcMain.on('stop-kiosk',(event) =>{
      mainWindow.setKiosk(false)
    })
    globalShortcut.unregister('Alt+Tab', () => {
      console.log('Something was pressed')
    })

    globalShortcut.register('Super+D', () => {
      console.log("Something was pressed")
    })
    globalShortcut.register('Super+Tab', () => {
      console.log("Something was pressed")
    })

    mainWindow.onbeforeunload = (e) => {
    console.log('I do not want to be closed')
    e.returnValue = false // equivalent to `return false` but not recommended
    }
  })


  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
}

function loadDemos () {
  require('./scripts/open.js')
  require('./scripts/save.js')
  require('./scripts/amt-recieve.js')
}

initialize()
