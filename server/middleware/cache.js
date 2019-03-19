/**
 * This middleware allows us to set a Cache-control on a resource
 */

module.exports = (time) => {
    return (req, res, next) => {
      res.header("Cache-Control", `public, max-age=${time}`);
      next();      
    }
}