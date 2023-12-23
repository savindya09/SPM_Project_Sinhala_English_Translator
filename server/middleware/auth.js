import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500;

      let decodedData;

      if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);

        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData?.sub;
      }    

      next();
    } else {
      res.status(401).json({ message: "Authorization header missing" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token verification failed" });
  }
};

export default auth;
