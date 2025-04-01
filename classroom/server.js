const express=require('express');
const app=express();
const users=require('./routes/user.js');
const posts=require('./routes/post.js');
const session=require('express-session');
const flash=require('connect-flash');
const path = require("path");

// const cookieParser=require('cookie-parser');
// app.use(cookieParser("secretcode"));
//
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("Signed cookie sent")
//
// });
// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("verified");
// })
//
// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("Sent you some cookies");
// });
//
// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi! I'm root");
// });
//
// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hi,${name}`);
// });
//
// app.use("/users",users);
// app.use("/posts",posts);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(session({
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
})
);

//flash is used to flash msg
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})


app.get('/register',(req,res)=>{
  let {name="anonymus"}=req.query;
  req.session.name=name;
  if(name=="anonymus")
      req.flash("error","users not registered");
  else
      req.flash("success","users registered successfully");
  console.log(req.session.name);
  res.redirect("/hello");
});

app.get('/hello',(req,res)=>{
    res.render("page.ejs",{name: req.session.name});
});














app.listen(3000,()=>{
    console.log("Server started on port 3000");
});

