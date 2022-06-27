const jwt = require('jsonwebtoken');
//instead of cookies and using express sessions 
//this is a similar concept but with more functionality
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {//creating a token
  signToken: function ({ email, name, _id }) {//destructuing the email,name and id passed in
    const payload = { email, name, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
