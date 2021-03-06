var https = require('follow-redirects').https;
var fs = require('fs');
const axios = require('axios');
var express = require('express');
var router = express.Router();
var funcPostData = {};



class EmployeeFormController {


  update(request, response) {
    funcPostData["EmpId"] = request.body.id;
    funcPostData["SafetyGear"] = request.body.sfgr;
    funcPostData["SafeDistance"] = request.body.dist;
    funcPostData["Temperature"] = request.body.Temperature;

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
        funcPostData["Location"] = JSON.parse(body).data[0].inContainmentZone;
       axios.post('https://businesstrustfunctionapp.azurewebsites.net/api/BusinessTrustFuncApp', {
        EmpId : funcPostData["EmpId"],
        SafetyGear : funcPostData["SafetyGear"] ,
        SafeDistance : funcPostData["SafeDistance"] ,
        Temperature : funcPostData["Temperature"],
        Location : funcPostData["Location"] 
        })
          .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
          })
          .catch((error) => {
            console.error(error)
          });

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