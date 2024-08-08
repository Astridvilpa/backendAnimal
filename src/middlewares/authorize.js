const authorize = (role) => {
  return (req, res, next) => {
    console.log("User role:", req.tokenData?.userRoleName);
    if (req.tokenData?.userRoleName && req.tokenData.userRoleName === role) {
      next();
    } else {
      console.log("Forbidden: User does not have the required role");
      res.status(403).json({ success: false, message: "Forbidden" });
    }
  };
};

const allowUserOrAdmin = () => {
  return (req, res, next) => {
    console.log("User role:", req.tokenData?.userRoleName);
    if (req.tokenData?.userRoleName && (req.tokenData.userRoleName === "super_admin" || req.tokenData.userRoleName === "user")) {
      next();
    } else {
      console.log("Forbidden: User does not have the required role");
      res.status(403).json({ success: false, message: "Forbidden" });
    }
  };
};

module.exports = { authorize, allowUserOrAdmin };

