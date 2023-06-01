const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');


var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs = require('fs')

app.use(fileUpload());

// parse application/json
app.use(bodyParser.json())


//__dirname mevcut directory path alır.
// console.log('__dirname', __dirname);
app.post('/api/user/photos', function (req, res) {

    let file = req.files.profilePhoto;

    //file daki uzantıyı (.jpeg, .png)
    let ext = file.name.substring(file.name.lastIndexOf('.'));

    //dışarıdan gelen file SAVE edeceğim. Save path ayarlıyorum
    let path = __dirname + '/images/' + uuidv4() + ext;

    file.mv(path, function (err) {

        if (!err)
            res.send('UPLOADED!');
        else
            res.status(500).json(err);

    })





})



//delete by name

app.delete('/api/user/photos/:name', function (req, res) {

    let name = req.params.name;

    let deletePath = __dirname + "/images/" + name
    fs.unlink(deletePath, function (err) {

        if (!err)
            res.send('DELETED!')
        else
            res.status(500).json(err)

    })

})


//delete all photos
app.delete('/api/user/photos', function (req, res) {

    let path = __dirname + "/images/"
    fs.readdir(path, function (err, files) {

        if (!err) {
            
            files.map(file => {

                fs.unlink(__dirname + "/images/" + file, function(deleteErr){
                    if(!deleteErr){
                        console.log('DELETED!!');
                    }
                })

            })

            res.send('DELETED!!')

        }
        else{
            res.status(500).json(err)
        }

    })

})



app.listen(3001, function () {
    console.log('Server is running...');
});




//file upload -> express-fileupload
//file delete, read, write vb.   -> FS