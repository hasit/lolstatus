'use strict';

const path = require('path');

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const Tray = electron.Tray;
const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain;

var Positioner = require('electron-positioner');

require('electron-reload')(__dirname);

var trayIcon = path.join(__dirname, 'public', 'icons', 'lol.png');

var isDarwin = (process.platform === 'darwin');
var isLinux = (process.platform === 'linux');
var isWindows = (process.platform === 'win32');

app.on('ready', function () {
  var cachedBounds;
  var windowPosition = (isWindows) ? 'trayBottomCenter' : 'trayCenter';
  var appIcon = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', click: function () { app.quit(); } }
  ]);

  function hideWindow() {
    if (!appIcon.window) { return; }
    appIcon.window.hide();
  }

  function initWindow() {
    var defaults = {
      width: 400,
      height: 350,
      show: false,
      frame: false,
      resizable: false,
      webPreferences: {
        overlayScrollbars: true
      }
    };

    appIcon.window = new BrowserWindow(defaults);
    appIcon.positioner = new Positioner(appIcon.window);
    appIcon.window.loadURL('file://' + __dirname + '/index.html');
    appIcon.window.on('blur', hideWindow);
    appIcon.window.setVisibleOnAllWorkspaces(true);

    app.dock.hide();
  }

  function showWindow(trayPos) {
    var noBoundsPosition;
    if (!isDarwin && trayPos !== undefined) {
      var displaySize = electron.screen.getPrimaryDisplay().workAreaSize;
      var trayPosX = trayPos.x;
      var trayPosY = trayPos.y;

      if (isLinux) {
        var cursorPointer = electron.screen.getCursorScreenPoint();
        trayPosX = cursorPointer.x;
        trayPosY = cursorPointer.y;
      }

      var x = (trayPosX < (displaySize.width / 2)) ? 'left' : 'right';
      var y = (trayPosY < (displaySize.height / 2)) ? 'top' : 'bottom';

      if (x === 'right' && y === 'bottom') {
        noBoundsPosition = (isWindows) ? 'trayBottomCenter' : 'bottomRight';
      } else if (x === 'left' && y === 'bottom') {
        noBoundsPosition = 'bottomLeft';
      } else if (y === 'top') {
        noBoundsPosition = (isWindows) ? 'trayCenter' : 'topRight';
      }
    } else if (trayPos === undefined) {
      noBoundsPosition = (isWindows) ? 'bottomRight' : 'topRight';
    }

    var position = appIcon.positioner.calculate(noBoundsPosition || windowPosition, trayPos);
    appIcon.window.setPosition(position.x, position.y);
    appIcon.window.show();
  }

  initWindow();

  appIcon.on('click', function (e, bounds) {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) { return hideWindow(); };
    if (appIcon.window && appIcon.window.isVisible()) { return hideWindow(); };
    bounds = bounds || cachedBounds;
    cachedBounds = bounds;
    showWindow(cachedBounds);
  });

  appIcon.on('right-click', function () {
    appIcon.popUpContextMenu(contextMenu);
  });

  ipc.on('reopen-window', function () {
    showWindow(cachedBounds);
  });

  ipc.on('app-quit', function () {
    app.quit();
  });

  appIcon.setToolTip('LoL status');
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})