const prisma = require('../prisma/client');
const dayjs = require('dayjs');

const GenerateRefreshTokenProvider = async (userId) => {
	const expiresIn = dayjs().add(150, 'seconds').unix();

	const generateRefreshTokenProvider = await prisma.refreshToken.create({
		data: {
			userId,
			expiresIn: expiresIn,
		},
	});

	return generateRefreshTokenProvider;
};

module.exports = GenerateRefreshTokenProvider;
