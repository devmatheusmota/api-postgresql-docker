const { Router } = require('express');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const prisma = require('../prisma/client');
const router = Router();

//Return all profiles
router.get('/profiles', ensureAuthenticated, async (req, res) => {
	try {
		const allProfiles = await prisma.profile.findMany({
			orderBy: [
				{
					id: 'asc',
				},
			],
		});

		return res.status(200).json({ allProfiles });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Return profile by user ID
router.get('/profiles/:id', ensureAuthenticated, async (req, res) => {
	const { id } = req.params;
	const userId = parseInt(id);

	try {
		const profile = await prisma.profile.findFirst({
			where: {
				id: userId,
			},
		});
		return res.status(200).json(profile);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Update profile by user ID
router.put('/profiles/:id', ensureAuthenticated, async (req, res) => {
	const { id } = req.params;
	const { bio } = req.body;
	const userId = parseInt(id);

	try {
		const profile = await prisma.profile.update({
			where: {
				id: userId,
			},
			data: {
				bio: bio,
			},
		});
		return res.status(200).json(profile);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Remove profile by user ID
router.delete('/profiles/:id', ensureAuthenticated, async (req, res) => {
	const { id } = req.params;
	const userId = parseInt(id);

	try {
		const profile = await prisma.profile.delete({
			where: {
				id: userId,
			},
		});
		return res.status(200).json({
			message: `Profile from User ID:${profile.userId} was removed.`,
		});
	} catch (error) {
		res.status(400).json({ error: error });
	}
});

//Create profile
router.post('/profiles', ensureAuthenticated, async (req, res) => {
	const { bio, userId } = req.body;

	try {
		await prisma.profile.create({
			data: {
				bio: bio,
				userId: userId,
			},
		});
		return res.status(201).json({ message: 'Profile created.' });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

module.exports = router;
