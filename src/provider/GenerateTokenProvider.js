const { sign } = require('jsonwebtoken');

const GenerateTokenProvider = async (userId) => {
	const token = sign({}, '2f5d317b-0832-4a01-92fe-eab8c13dd910', {
		subject: userId,
		expiresIn: '20s',
	});

	return token;
};

module.exports = GenerateTokenProvider;
