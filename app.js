const fs = require('fs').promises
const path = require("path");

const mainFolder = path.join(__dirname, "folder");

const changeHierarchy = (pathToFolder) => { 
  fs.readdir(pathToFolder)
  .then((files) => 
  files.forEach( async (file)=> {   
    const currentPath = path.join(pathToFolder, file); 
    const stats = await fs.stat(currentPath);
    const newPath = path.join(mainFolder, file);
    if(stats.isDirectory){
      changeHierarchy(currentPath)
    }  
    fs.rename(currentPath, newPath)
    .catch((err) =>
    console.log(err)
  );
  }))
}
changeHierarchy(mainFolder);