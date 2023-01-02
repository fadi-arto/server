const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const clients = require("../Entity/clients");
const company = require("../Entity/company");
const center = require('../Entity/centers');

const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  company.findById(id, (err, user) => {
    if (user) {
      return done(err, user);
    }
    else{
      center.findById(id, (err, usered) => {
        if(usered){
          return done(err, usered);

        }
      })
    }
  });
});

passport.use(
  "local-signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
        company.findOne({ email: email }, (error, users) => {
        if (error) {
          return done(error, false); // User : false
        }
        if (!users) {
          return done(
            null,
            false,
            req.flash("signinError", "user is not found")
          ); // User : false
        }
        if (bcrypt.compareSync(password, users.password)) {
          console.log(users);
          return done(null, users);
        } else {
            console.log("4");

          return done(null, false, req.flash("signinError", "worng passwoed"));
        }
      });
    }
  )
);

passport.use(
  "local-signin",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      center.findOne({ email: email }, (error, user) => {
        if (error) {
          return done(error, false); // User : false
        }
        if (!user) {
          return done(
            null,
            false,
            req.flash("signinError", "user is not found")
          );
        }
        else  {
          return done(null, user);
        } 
      });
    }
  )
);

passport.use(
  "local-signins",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      Employees.findOne({ email: email }, (error, user) => {
        if (error) {
          return done(error, false); // User : false
        }
        if (!user) {
          // console.log("3");
          return done(
            null,
            false,
            req.flash("signinError", "user is not found")
          ); // User : false
        }
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        } else {
          console.log("3");
          return done(null, false, req.flash("signinError", "worng passwoed"));
        }
      });
    }
  )
);
