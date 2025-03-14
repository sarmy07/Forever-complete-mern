const verifyAdmin = (req, res, next) => {
  if (req?.user.role !== "admin")
    return res.status(401).json("Unauthorized! Only for Admin.");
  next();
};

module.exports = verifyAdmin;
