const { Router } = require('express');
const { PrismaClient } = require('@prisma/client');

const router = Router();
const prisma = new PrismaClient();

//Return all users
router.get('/users', async (req, res) => {
	try {
		const allUsers = await prisma.user.findMany(
			{
				orderBy: [
					{
						id: 'asc',
					},
				],
			} | undefined
		);

		return res.json({ allUsers });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Return users by ID
router.get('/users/:id', async (req, res) => {
	const { id } = req.params;
	const userId = parseInt(id);

	try {
		const user = await prisma.user.findFirst({
			where: {
				id: userId,
			},
		});
		return res.json(user);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Update user by ID
router.put('/users/:id', async (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	const userId = parseInt(id);

	try {
		const user = await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				name: name,
				email: email,
			},
		});
		return res.json(user);
	} catch (error) {
		return res.status(400).json({ error: erorr });
	}
});

//Remove user by ID (only works if the user doesn't have any posts or profiles)
router.delete('/users/:id', async (req, res) => {
	const { id } = req.params;
	const userId = parseInt(id);
	try {
		const user = await prisma.user.delete({
			where: {
				id: userId,
			},
		});
		return res.json({ message: `User ${user.name} was removed.` });
	} catch (error) {
		return res.json(400).json({ error: error });
	}
});

//Create user
router.post('/users', async (req, res) => {
	const { name, email } = req.body;
	try {
		await prisma.user.create({
			data: {
				name: name,
				email: email,
			},
		});
		return res.status(201).json({ message: 'User created.' });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

module.exports = router;
