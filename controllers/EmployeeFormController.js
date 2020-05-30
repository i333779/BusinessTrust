var https = require('follow-redirects').https;
var fs = require('fs');
var express = require('express');
var router = express.Router();


class EmployeeFormController {
  update(request, response) {
    var options = {
      'method': 'POST',
      'hostname': 'data.geoiq.io',
      'path': '/dataapis/v1.0/covid/locationcheck',
      'headers': {
        'Content-Type': 'application/json'
      },
      'maxRedirects': 20
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        console.log(JSON.parse(body).data[0].inContainmentZone);
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    var postData = JSON.stringify({ "latlngs": [[request.body.CoordinateX, request.body.CoordinateY]], "key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsSWRlbnRpdHkiOiJrcml0aWthLmt1bWFyaUBzYXAuY29tIn0.Sp5SgdiFaReiFtUlQrlKRlaZJ1IRSjNpgm-1vSX81UA" });

    req.write(postData);

    req.end();


    response.render('index', { title: 'Successfully Updated' });

  }


}
module.exports = EmployeeFormController;