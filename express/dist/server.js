import express from 'express';
import kroneRoutes from './routes/kroneRoutes.js';
import standardRoutes from './routes/standardRoutes.js';
const app = express();
const port = 3000;
app.use('/krone', kroneRoutes);
app.use('/standard', standardRoutes);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map