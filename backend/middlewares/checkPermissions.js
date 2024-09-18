const checkPermissions = (requiredPermission) => {
    return (req, res, next) => {
      const userPermissions = req.user.role.permissions; // Supondo que o middleware de autenticação tenha anexado o usuário
  
      if (userPermissions.includes(requiredPermission)) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access denied.' });
      }
    };
  };
  
  module.exports = checkPermissions;  