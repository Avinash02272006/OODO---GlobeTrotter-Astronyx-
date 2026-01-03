import http from 'http';
import app from './app';
import { setupSocket } from './socket';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = setupSocket(server);

// Make io accessible in request object
app.set('io', io);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
