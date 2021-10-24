import passport from "passport";
import { Strategy } from "passport-local";
import { userModel } from "../components/user";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";

const localStrategy = Strategy;

const signUpStrategy = passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const loginStrategy = passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const verifyToken = passport.use(
  new JWTStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const authenticate = passport.authenticate("jwt", { session: false });

export { signUpStrategy, loginStrategy, verifyToken, authenticate };
