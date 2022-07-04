const jwt = require("jsonwebtoken");
//instead of cookies and using express sessions
//this is a similar concept but with more functionality
const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim(); //getting the data out
    }

    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; //if it matches
    } catch {
      console.log("Invalid token");
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;
  },

  //creating a token
  signToken: function ({ email, username, _id }) {
    //destructuing the email,name and id passed in
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
