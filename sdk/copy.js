const fs = require('fs-extra');


function copy(file_name)
{
    fs.copySync(file_name, process.env.AIDOR_AWS_GUI_DIR + file_name);
}

copy('404.html');
copy('index.html');
copy('assets');
fs.removeSync(process.env.AIDOR_AWS_GUI_DIR + '/assets/js/.gitignore');