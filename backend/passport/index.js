const passport = require("passport");
const { User } = require("../database/models");
const local = require("./local");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
