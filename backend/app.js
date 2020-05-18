var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Customer = require("./models/customer"),
    Business = require("./models/business"),
    Message = require("./models/message"),
    http = require('http').createServer(app);
    var io = require("socket.io")(http);


app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
// app.use(express.static(__dirname));

//specify view folder and parse the engine to HTML
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//create and connect to localink database
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/localink", { useNewUrlParser: true });

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Customer.authenticate()));
passport.serializeUser(Customer.serializeUser());
passport.deserializeUser(Customer.deserializeUser());

//passes currentUser into every html template
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

//requiring routes
var indexRoutes = require("./routes/index"),
    customerRoutes = require("./routes/customer"),
    businessRoutes= require("./routes/business");
app.use(indexRoutes);
app.use(customerRoutes);
app.use(businessRoutes);


// // io.on('connection', (socket) => {
// //     socket.on('chat message', (msg) => {
// //       console.log('message: ' + msg);
// //     });
// //   });

io.on("connection", (socket)=>{
    console.log("user connected");
    socket.on("disconnect", ()=>{
    console.log("Disconnected")
})
});

// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//       io.emit('chat message', msg);
//     });
//   });

http.listen(3000, () => {
    console.log('listening on *:3000');
  });

// app.listen(process.env.PORT || 3000, process.env.IP ,function() {
// 	console.log("Server is listening on port 3000...")
// });


