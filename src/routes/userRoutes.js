const { Router } = require('express');
const prisma = require('../prisma/client');
const { hash } = require('bcryptjs');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

const router = Router();

//Return all users
router.get('/users', ensureAuthenticated, async (req, res) => {
	try {
		const allUsers = await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

		return res.json({ allUsers });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Return users by ID
router.get('/users/:id', ensureAuthenticated, async (req, res) => {
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
router.put('/users/:id', ensureAuthenticated, async (req, res) => {
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
router.delete('/users/:id', ensureAuthenticated, async (req, res) => {
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
	const { name, email, password } = req.body;

	const userAlreadyExists = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (userAlreadyExists) {
		throw new Error('User already exists');
	}

	const passwordHash = await hash(password, 8);
	try {
		await prisma.user.create({
			data: {
				name,
				email,
				password: passwordHash,
			},
		});
		return res.status(201).json({ message: 'User created.' });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

module.exports = router;
