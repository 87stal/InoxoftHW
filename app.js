const fs = require("fs").promises;
const path = require("path");

const folderBoys = path.join(__dirname, "boys");
const folderGirls = path.join(__dirname, "girls");

const sortUser = (pathToFolder) => {
  fs.readdir(pathToFolder)
    .then((files) =>
      files.forEach((file) => {
        const currentFilePath = path.join(pathToFolder, file);
        const girlsFilePath = path.join(folderGirls, file);
        const boysFilePath = path.join(folderBoys, file);
        fs.readFile(currentFilePath).then((userInfo) => {
          const user = JSON.parse(userInfo.toString());
          switch (user.gender) {
            case "female":
              fs.rename(currentFilePath, girlsFilePath)
                .catch((err) =>
                  console.log(err)
                );
              break;

            case "male":
              fs.rename(currentFilePath, boysFilePath)
                .catch((err) =>
                  console.log(err)
                );
              break;
          }
        });
      })
    )
    .catch((err) => console.log(err));
};

sortUser(folderBoys);
sortUser(folderGirls);
