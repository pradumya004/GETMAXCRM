import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export { generateToken, verifyToken };

// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
//     jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//         if (err) {
//             return res.status(403).json({ message: "Forbidden" });
//         }
//         req.employeeId = payload.employeeId;
//         next();
//     });
// }