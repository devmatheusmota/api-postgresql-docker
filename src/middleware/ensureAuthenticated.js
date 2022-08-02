const { verify } = require('jsonwebtoken');

function ensureAuthenticated(request, response, next) {
	const authToken = request.headers.authorization;

	if (!authToken) {
		return response.status(401).json({
			message: 'Token is missing.',
		});
	}

	const [, token] = authToken.split(' ');

	try {
		verify(token, '2f5d317b-0832-4a01-92fe-eab8c13dd910');

		return next();
	} catch (error) {
		return response.status(401).json({
			message: 'Token invalid.',
		});
	}
}

module.exports = ensureAuthenticated;
