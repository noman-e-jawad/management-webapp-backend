import passport from 'passport';
export const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', {}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.json({
        status: 401,
        success: false,
        message: 'Unauthorized user',
        data: req.logIn,
      });
    }
    return res.json({
      status: 200,
      success: true,
      data: {
        name: user.name,
        email: user.email,
        role: user.role || 'client',
      },
    });
  })(req, res, next);
};

export const requireAuth = (roles) => {
  return (req, res, next) => {
    passport.authenticate('jwt', {}, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user || !roles.includes(user.role)) {
        return res.redirect('https://google.com');
      }
      next();
    })(req, res, next);
  };
};
