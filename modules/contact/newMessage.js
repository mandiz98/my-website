const myDB = require('../../db')
const bodyparser = require('body-parser')
const csrf = require('csurf')
var csrfProtection = csrf({cookie: true})
var parseForm = bodyparser.urlencoded({extended: false})

module.exports = function(request, response){
    const fName = request.body.firstName
    const lName = request.body.lastName
    const email = request.body.email
    const message = request.body.message

    const errors = []

    if(!fName || fName.length > 20){
        errors.push("You must enter a first name.")
    }
    if(!lName || lName.length > 20){
        errors.push("You must enter a last name.")
    }
    if(!email || email.length > 50){
        errors.push("You must enter an email.")
    }
    if(!message || message.length > 250){
        errors.push("You must enter a message.")
    }

    const model={
        error: errors, 
        firstName: fName, 
        lastName: lName, 
        email: email, 
        message: message
    }

    if(errors.length == 0){
        myDB.newMessage(fName, lName, email, message, function(error, message){
            if(error){
                console.log(error.message)
                response.render("contact.hbs", model)
            }else{
                response.redirect("/")
            }
        })
    }
}
