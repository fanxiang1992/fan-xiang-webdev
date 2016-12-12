
module.exports = function (app, model) {

        var passport = require('passport');
        var LocalStrategy = require('passport-local').Strategy;
        var FacebookStrategy = require('passport-facebook').Strategy;
        var bcrypt = require("bcrypt-nodejs");


        app.get('/api/user', findUser);
        app.get('/api/user/:uid', findUserbyId);
        app.post('/api/user',createUser);
        app.put('/api/user/:uid',updateUser);
        app.delete('/api/user/:uid',deleteUser);
        app.post('/api/login', passport.authenticate('local'), login);
        app.post('/api/logout', logout);
        app.post ('/api/register', register);
        app.get ('/api/loggedin', loggedin);
        app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
        app.get('/auth/facebook/callback',
          passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
          }));

        var facebookConfig = {
          clientID     : process.env.FACEBOOK_CLIENT_ID,
          clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
          callbackURL  : process.env.FACEBOOK_CALLBACK_URL
        };

        passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
        function facebookStrategy(token, refreshToken, profile, done) {
          console.log(profile);
          model.userModel.findUserByFacebookId(profile.id).then(function(facebookUser){
            if(facebookUser) {
              return done(null, facebookUser);
            }
            else {
              facebookUser = {
                username: profile.displayName.replace(/ /g,''),
                facebook: {
                  id:    profile.id,
                  token: token,
                  displayName: profile.displayName
                }
              };
              return model.userModel.createUser(facebookUser);
              // .then(
              //   function(user) {
              //     console.log(user);
              //     done(null, user);
              //   });
            }
          }, function(err) {
            if (err) {return done(err);}
          })
          .then(
            function(user) {
              return done(null, user);
            },
            function(err) {
              if (err) {return done(err);}
            }
          );
        }

        passport.serializeUser(serializeUser);
        function serializeUser(user, done) {
          done(null, user);
        }

        passport.deserializeUser(deserializeUser);
        function deserializeUser(user, done) {
          model.userModel
          .findUserById(user._id)
          .then(
            function(user){
              done(null, user);
            },
            function(err){
              done(err, null);
            }
            );
        }

        passport.use(new LocalStrategy(localStrategy));
        function localStrategy(username, password, done) {
          model.userModel
          .findUserByUsername(username)
          .then(
            function(user) {
              if(user && bcrypt.compareSync(password, user.password)) {
                return done(null, user);
              } else {
                return done(null, false);
              }
            },
            function(err) {
              if (err) { return done(err); }
            }
            );
        }
        function login(req, res) {
         var user = req.user;
         res.json(user);
       }

       function logout(req, res) {
         req.logOut();
         res.send(200);
       }

       function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
        .createUser(user)
        .then(
          function(user){
            if(user){
              req.login(user, function(err) {
                if(err) {
                  res.status(400).send(err);
                } else {
                  res.json(user);
                }
              });
            }
          }
          );
      }

      function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
      }



        function deleteUser(req, res) {
          var uid = req.params.uid;
          model.userModel.removeUser(uid).then(
            function (status) {
              res.send(200);
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }


        function updateUser(req, res) {
          var user = req.body;
          var uid = req.params.uid;
          model.userModel.updateUser(uid, user).then(
            function (status) {
              res.send(200);
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }



        function createUser(req, res) {
          var user = req.body;
          model.userModel.createUser(user).then(
            function (newUser) {
              res.send(newUser);
            },
            function (error) {
              res.sendStatus(400).sned(error);
            }
            );
        }


        function findUser(req, res) {
          var params = req.params;
          var query = req.query;
          if (query.password && query.username) {
            findUserByCredentials(req, res);
          }
          else if (query.username) {
            findUserByUsername(req, res);
          }
          else {
            res.json(req.user);
          }
        }

        function findUserByUsername(req, res) {
          var username = req.query.username;
          model.userModel.findUserByUsername(username).then(
            function (user) {
              if(user) {
                res.send(user);
              }
              else {
                res.send('0');
              }
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }



        function findUserByCredentials(req, res) {
          var username = req.query.username;
          var password = req.query.password;
          model.userModel.findUserByCredentials(username, password).then(
            function(user){
              if(user){
                res.json(user);
              } else {
                res.send('0');
              }
            },
            function(error){
              res.sendStatus(400).send(error);
            }
            );
        }

        function findUserbyId(req, res) {
          var userId = req.params.uid;
          model.userModel.findUserById(userId).then(
            function (user) {
              if(user) {
                res.send(user);
              }
              else {
                res.send('0');
              }
            },
            function (error) {
              res.sendStatus(400).send(error);
            }
            )
        }

}