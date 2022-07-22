const { PrismaClient } = require('@prisma/client');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const profileRoutes = require('./routes/profileRoutes');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

async function main() {
	app.get('/', (req, res) => {
		res.jsonp({ message: 'Welcome to my Social Network API look-a-like' });
	});
	app.use(userRoutes);
	app.use(postRoutes);
	app.use(profileRoutes);
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
