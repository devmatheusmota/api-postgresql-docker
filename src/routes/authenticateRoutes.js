const { Router } = require('express');
const prisma = require('../prisma/client');
const { compare } = require('bcryptjs');
const generateRefreshTokenProvider = require('../provider/GenerateRefreshTokenProvider');
const generateTokenProvider = require('../provider/GenerateTokenProvider');
const dayjs = require('dayjs');

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

	const token = await generateTokenProvider(userAlreadyExists.id);

	await prisma.refreshToken.deleteMany({
		where: {
			userId: userAlreadyExists.id,
		},
	});

	const refreshToken = await generateRefreshTokenProvider(userAlreadyExists.id);

	return res.json({ token, refreshToken });
});

module.exports = router;
