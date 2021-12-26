//import express module
const express = require(`express`);
//store express module in app constant variable
const app = express();
//imports path module which allows for static file sharing
const path = require(`path`);
//body parser allowing us to route files and access requests etc
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//serve our static files, allows us to traverse public dir
app.use(express.static(path.join(__dirname, `public`)));
//Set our view engine as ejs
app.set(`view engine`, `ejs`);
//Determines where we are looking for our views
app.set(`views`,`views`);
const userRoutes = require(`./routes/users.js`)
app.use(userRoutes)

app.use((req,res,next)=>{
    res.status(404).render(`404`,{pageTitle:`404`})
})//Create an event listner on port 3000
app.listen(3000);