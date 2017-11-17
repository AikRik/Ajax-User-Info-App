const express = require("express")
const app = express()
const fs = require("fs")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, () => { console.log("Listening at 3000") })
app.set("view engine", "pug")


app.get("/", (req, res, next) => {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var obj = JSON.parse(data);
        console.log(obj)

        res.render("index", {
            title: "Users",
            obj: obj
        })
    })
})

app.get("/starwarsPpl", (req, res, next) => {
    res.json({ status: 200, message: "Hi StarwarsBro" })
})

app.post("/user", function(req, res, next) {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var obj = JSON.parse(data);
        console.log(obj)

        console.log(req.body.firstname)
        console.log(req.body.lastname)
        console.log(req.body.email)

        var isFound = false
        for (var i = 0; i < obj.length; i++) {
            if (req.body.firstname === obj[i].firstname || req.body.lastname === obj[i].lastname || req.body.email === obj[i].email) {
                res.render("user", {
                    user: obj[i].firstname,
                    lastname: obj[i].lastname,
                    email: obj[i].email
                })
                isFound = true
                break;
            }
        }
        if (!isFound) {
            res.redirect("/")
        }
    })
})

app.get("/searchbar", (req, res, next) => {
    res.render("searchbar")
})

app.get("/user", (req, res, next) => {
    res.render("user")
})

app.get("/signup", (req, res, next) => {
    fs.readFile('users.json', 'utf8', function(err, data) {
        var add = JSON.parse(data);
        res.render("signup", { add: add })
    })
})

app.post("/signup", (req, res, next) => {

    fs.readFile('users.json', 'utf8', function(err, data) {
        if (err) {
            console.log("ERROR")
        }
        var add = JSON.parse(data);
        var newUser = req.body

        add.push(newUser)
        let newJSON = JSON.stringify(add)
        fs.writeFile("users.json", newJSON, function(err, data) {
            if (err) {
                console.log("Error")
            } else(res.redirect("/"))

        })
    })
})

app.post("/suggestion", (req, res) => {
	fs.readFile('users.json', 'utf8', function(err, data) {
        var userSuggest = JSON.parse(data);
	    let suggest = req.body.input;
	    // var suggestName = 
	    
	    console.log("The suggest is", suggest)

	    if (err) {
            console.log("ERROR")
        }
        let isFound = false	
	    for (var i = 0; i < userSuggest.length; i++) {
            if (userSuggest[i].firstname.toLowerCase().startsWith(suggest) || userSuggest[i].lastname.toLowerCase().startsWith(suggest)  || userSuggest[i].email.toLowerCase().startsWith(suggest) ) {
		    	console.log("Do you mean: ", userSuggest[i].email, userSuggest[i].firstname, userSuggest[i].lastname)
		    	res.json({firstname: userSuggest[i].firstname, lastname: userSuggest[i].lastname, email: userSuggest[i].email})
		    	isFound = true
		    	break;
	    	}
		}
		if(!isFound) {
			res.end()
		}
	})
})

























