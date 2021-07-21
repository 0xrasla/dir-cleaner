/*
Desktop Cleaner Script is just a simple automation Script that Helps 
to Organize Your Desktop Folder or Any Folder You Want....Inspired By Kalle
I Dont Know is my code clean or not..But Hey! Its Working😂
*/

const chokidar = require('chokidar');
const fs = require("fs-extra")
const path = require("path")
const {
    extension_paths
} = require('./extensions')

// Base Dir is the Directory to watch
let BASE_DIR = "C://Users//Nanbi//Desktop"
//Base Dest Dir is the directory you want to place yr files
let BASE_DEST_DIR = "E://KeepClean"

// Files are organized as on Date..if you Use this script on Download Folder, it will organized the files based on yr download date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');


const watcher = chokidar.watch(BASE_DIR, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignored: '.ini'
});

watcher
    .on('add', (pathstring) => {
        keepMyDesktopClean(pathstring)
    })

function keepMyDesktopClean(filepath) {
    let file_name = path.basename(filepath)
    let file_extension_name = path.extname(filepath)

    if (file_extension_name in extension_paths) {
        let date_added_dir_path = "//" + mm + "//" + dd
        let destination_path = BASE_DEST_DIR + "//" + extension_paths[file_extension_name] + date_added_dir_path + "//" + file_name

        fs.mkdirpSync(BASE_DEST_DIR + "//" + extension_paths[file_extension_name]) + date_added_dir_path

        let new_filename = file_name
        let i = 0;
        let file_exists = fs.existsSync(destination_path)

        while (file_exists) {
            i += 1;
            new_filename = file_name.split(".")[0] + "_" + i + file_extension_name
            new_dest = BASE_DEST_DIR + "//" + extension_paths[file_extension_name] + date_added_dir_path + "//" + new_filename
            file_exists = fs.existsSync(new_dest)
        }

        let dest = BASE_DEST_DIR + "//" + extension_paths[file_extension_name] + date_added_dir_path + "//" + new_filename
        fs.moveSync(filepath, dest)
    }
}