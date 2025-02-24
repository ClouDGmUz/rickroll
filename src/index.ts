import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import path from 'path';

const app = express();

// Enable compression
app.use(compression());

// Security headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Handle all routes by serving index.html
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});