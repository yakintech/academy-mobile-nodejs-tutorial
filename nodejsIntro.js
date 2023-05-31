const fs = require('fs')
//like import

fs.readFile('academy.txt', 'utf8', function (err, data) {
    console.log('DATA ', data);
})


let file = fs.readFileSync('academy.txt','utf8')
console.log('Data', file);




//npm init ile paket konfigürasyonlarını ve proje conf oluşturuyorum.
//npm init --y direkt oluşturur