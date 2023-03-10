


export function valAuthenticate(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json('Loggear usuario');
    }
}