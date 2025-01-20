const { app, BrowserWindow, Tray, Menu, globalShortcut, clipboard } = require('electron');

let tray = null;
let mainWindow = null;

app.on('ready', () => {
  // Crear ventana oculta
  mainWindow = new BrowserWindow({
    show: false, // Oculta la ventana al inicio
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html'); // Cargar el HTML (opcional)

  // Crear bandeja del sistema
  tray = new Tray('icon.png'); // Reemplaza con la ruta a tu icono
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Mostrar ventana', click: () => mainWindow.show() },
    { label: 'Salir', click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('Mi App Electron');

  // Registrar atajo global
  globalShortcut.register('CommandOrControl+A', () => {
    const text = clipboard.readText(); // Leer contenido del portapapeles
    console.log('Texto capturado del portapapeles:', text);
  });

  // Registrar otro atajo para transformar texto
  globalShortcut.register('CommandOrControl+Shift+T', () => {
    const text = clipboard.readText();
    if (text) {
      const transformedText = text.toUpperCase(); // Convertir texto a mayúsculas
      clipboard.writeText(transformedText); // Escribir al portapapeles
      console.log('Texto transformado:', transformedText);
    } else {
      console.log('El portapapeles está vacío.');
    }
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll(); // Desregistrar todos los atajos al salir
});