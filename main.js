// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
autoUpdater.on('checking-for-update', () => {
  log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
  log.info('업데이트가 가능합니다.');
});
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
  log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
  log.info('업데이트가 완료되었습니다.');
});

/* Electron =====================================================*/

/** 초기화가 끝나게 되면 실행 */
app.on('ready', () => {
  // 메인 창 생성
  createWindow();

  // 자동 업데이트 등록
  autoUpdater.checkForUpdates();
});

/** [생명주기] 모든 창이 닫히면 자동으로 앱 종료 */
app.on('window-all-closed', () => {
  app.quit();
});
