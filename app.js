const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const Email = req.body.Email;
    console.log(req.body);

    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields : {
                FNAME: fname,
                LNAME: lname,
            },
            
        }],
    };
    const jsonData = JSON.stringify(data);
    const  URL="https://us4.api.mailchimp.com/3.0/lists/3d81f0ef30";
     const options = {
        method: "POST",
        auth: "Himanshu015:6828f9c8f8c7d30435abf0f023f0a3dd-us4"
    };
   const request= https.request(URL, options, function(response){
        response.on("data", function (data) { 
            console.log(JSON.parse(data));
         });
         if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
         }else{
            res.sendFile(__dirname + "/failure.html");
         }
    });
    request.write(jsonData);
    request.end();
   
    // const options = {
    //     url: "https://us4.api.mailchimp.com/3.0/lists/3d81f0ef30",
    //     method: "POST",
    //     headers: {
    //         "Authorization": "Himanshu015 6828f9c8f8c7d30435abf0f023f0a3dd-us4",
    //     },
    //     body: jsonData,
    // };

    // request(options, function (error, response, body) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log(response.statusCode);
    //     }
    // });


});

app.post("/failure",function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000, function () {
    console.log("server has started at port 3000.")
});


// 6828f9c8f8c7d30435abf0f023f0a3dd-us4 api key

// 3d81f0ef30 list is