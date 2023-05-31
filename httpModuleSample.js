const http = require('http');


//default olarak / yani domain ana dizin
http.createServer(function (req, res) {

    res.write('Cagatay')
    res.end();

})
.listen(8080)
//8080 PORT
//runnig....