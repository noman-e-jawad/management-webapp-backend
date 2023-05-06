import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import Client from '../client/Client';
import { secret } from '../config/config';
import Stuff from '../stuff/Stuff';

// setting the jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    let user;
    user = await Stuff.findById(payload.id);
    if (!user) {
      user = await Client.findById(payload.id);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }

  // .catch((err) => done(err, false));
});

// tell passport to use jwt strategy:
passport.use(jwtLogin);
