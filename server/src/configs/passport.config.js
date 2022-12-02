require("dotenv").config();

const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const Admin = require("../models/admin");
const Customer = require("../models/customer");

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

const verify = (done, credentials) => {
  const user = credentials;
  if (!user) {
    return done(null, false);
  }

  return done(null, user);
};

const localOpts = {
  session: true,
};

const createLocalStrategy = (credentialsCb) =>
  new LocalStrategy(localOpts, async (username, password, done) => {
    try {
      const credentials = await credentialsCb(username, password);
      return verify(done, credentials);
    } catch (error) {
      return done(error, false);
    }
  });

passport
  .use(createLocalStrategy(User.findByCredentials))
  .use("local-admin", createLocalStrategy(Admin.findByCredentials))
  .use("local-customer", createLocalStrategy(Customer.findByCredentials));

const cookieExtractor = (req) =>
  req.signedCookies.token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);

const jwtOpts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const credentials = await User.findById(payload.id);
      return verify(done, credentials);
    } catch (error) {
      return done(error, false);
    }
  })
);
