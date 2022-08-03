const { Router } = require('express');
const prisma = require('../prisma/client');
const generateTokenProvider = require('../provider/GenerateTokenProvider');
const generateRefreshTokenProvider = require('../provider/GenerateRefreshTokenProvider');
const dayjs = require('dayjs');

const router = Router();

router.post('/refresh-token', async (req, res) => {
	const { refresh_token } = req.body;

	const refreshToken = await prisma.refreshToken.findFirst({
		where: {
			id: refresh_token,
		},
	});

	if (!refreshToken) {
		throw new Error('Refresh token invalid');
	}

	const refreshTokenExpired = dayjs().isAfter(
		dayjs.unix(refreshToken.expiresIn)
	);

	const token = await generateTokenProvider(refreshToken.userId);

	if (refreshTokenExpired) {
		await prisma.refreshToken.deleteMany({
			where: {
				userId: refreshToken.userId,
			},
		});

		const newRefreshToken = await generateRefreshTokenProvider(
			refreshToken.userId
		);

		return res.json({ token, newRefreshToken });
	}

	return res.json({ token });
});

module.exports = router;
