import fs from 'fs';
import path from 'path';
// Funkcja do rekurencyjnego przeszukiwania katalogów
const renameFiles = (dir) => {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Rekurencyjnie przeszukujemy katalogi
      renameFiles(filePath);
    } else if (file.endsWith('.js')) {
      // Sprawdzamy, czy plik jest plikiem .js i zawiera JSX
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('React.createElement') || content.includes('<')) {
        const newFilePath = filePath.replace(/\.js$/, '.jsx');
        fs.renameSync(filePath, newFilePath);
        console.log(`Zmieniono: ${filePath} -> ${newFilePath}`);
      }
    }
  });
};

// Uruchamiamy skrypt na folderze z plikami
const rootDir = './src'; // Zamień na odpowiednią ścieżkę do swojego folderu
renameFiles(rootDir);
