const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  let token;

  try {

    // Check token exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {

      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // Get user from DB
      req.user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      next();

    } else {

      return res.status(401).json({
        message: "Not authorized, token missing",
      });

    }

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Token failed",
    });

  }
};

module.exports = {
  protect,
};