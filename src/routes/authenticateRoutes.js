const { Router } = require('express');
const prisma = require('../prisma/client');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const router = Router();

//Authenticate user
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const userAlreadyExists = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (!userAlreadyExists) {
		throw new Error('Email or password incorrect.');
	}

	const passwordMatch = await compare(password, userAlreadyExists.password);

	if (!passwordMatch) {
		throw new Error('Email or password incorrect.');
	}

	const token = sign({}, '2f5d317b-0832-4a01-92fe-eab8c13dd910', {
		subject: userAlreadyExists.id,
		expiresIn: '20s',
	});

	return res.json({ token });
});

module.exports = router;
