import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'os'
import { join } from 'path'

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

export const ROOT_PATH = {
  // /dist
  dist: join(__dirname, '../..'),
  // /dist or /public
  public: join(__dirname, app.isPackaged ? '../..' : '../../../public'),
}
console.log(join(ROOT_PATH.public, 'favicon.ico'));
let win: BrowserWindow | null = null
// Here, you can also use other preload
const preload = join(__dirname, '../preload/index.js')
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin
const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`
const indexHtml = join(ROOT_PATH.dist, 'index.html')
require('@electron/remote/main').initialize()
async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 500,
    icon: join(ROOT_PATH.public, 'favicon.ico'),
    titleBarStyle: "hidden",
    webPreferences: {
      webSecurity: false,
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  if (process.platform == "darwin") {
    app.dock.setIcon(join(ROOT_PATH.public, 'icons', "Burning Orange", "apple-touch-icon.png"))
  }
  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    // win.webContents.openDevTools()

    win!.on('maximize', function () {
      win!.webContents.send('main-window-max');
    })

    win!.on('unmaximize', function () {
      win!.webContents.send('main-window-unmax');
    })
  }
  require("@electron/remote/main").enable(win.webContents)
  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// new window example arg: new windows url
ipcMain.handle('open-win', (event, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  })

  if (app.isPackaged) {
    childWindow.loadFile(indexHtml, { hash: arg })
  } else {
    childWindow.loadURL(`${url}/#${arg}`)
    // childWindow.webContents.openDevTools({ mode: "undocked", activate: true })
  }
})


ipcMain.on('close-app', () => {
  if (win) {
    win.close()
  }
})

ipcMain.on('window-max', function () {
  if (win!.isMaximized()) {
    win!.restore();
  } else {
    win!.maximize();
  }
})

ipcMain.on('min-app', () => {
  win!.minimize()
})

ipcMain.on('devTools', () => {
  win!.webContents.toggleDevTools()
})