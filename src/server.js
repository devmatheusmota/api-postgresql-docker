require('express-async-errors');
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authenticateRoutes = require('./routes/authenticateRoutes');
const refreshTokenRoutes = require('./routes/refreshTokenRoutes');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

async function main() {
	app.get('/', (req, res) => {
		res.jsonp({ message: 'Welcome to my Social Network API look-a-like' });
	});
	app.use(authenticateRoutes);
	app.use(refreshTokenRoutes);
	app.use(userRoutes);
	app.use(postRoutes);
	app.use(profileRoutes);

	app.use((err, req, res, next) => {
		if (err.message == 'User already exists') {
			return res.status(409).json({
				status: 'Error',
				message: err.message,
			});
		}
		return res.json({
			status: 'Error',
			message: err.message,
		});
	});
}

main()
	.catch((error) => {
		throw error;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

app.listen(PORT, HOST, () => {
	console.log(`Backend running on http://localhost:${PORT}`);
});
