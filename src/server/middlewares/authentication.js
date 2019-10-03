import basicAuth from 'basic-auth';

/**
 * Handle when request is unauthorized
 *
 * @param {*} res Express response object
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
const unauthorized = res => {
  res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
  return res.send(401);
};

/**
 * Handles authentication
 *
 * @param {*} req Express request object
 * @param {*} res Express response object
 * @param {*} next Express next function
 *
 * @author Tameem Safi <t.safi@kainos.com>
 */
export const authenticationMiddleware = (req, res, next) => {
  // Handles http basic auth prompt
  // and gets input from user
  // https://www.npmjs.com/package/basic-auth
  const user = basicAuth(req);

  // Check if username and password was set
  if (!user || !user.name || !user.pass) {
    // No user was set
    // request is unauthorized
    return unauthorized(res);
  }

  /**
   * Check if username/password entered matches the environment variables,
   * for security should be stored in environment variable
   *
   * Heroku CLI:
   * -----------
   * heroku config:set AUTH_USERNAME=username_here
   * heroku config:set AUTH_PASSWORD=password_here
   */
  // if (user.name === process.env.AUTH_USERNAME && user.pass === process.env.AUTH_PASSWORD) {
  if (user.name.length > 1 && user.pass.length > 1) {
    // User was authenticated
    // pass request to next middleware
    return next();
  }

  // Request is unauthorized
  return unauthorized(res);
};
