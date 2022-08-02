const { Router } = require('express');
const prisma = require('../prisma/client');

const router = Router();

//Return all posts
router.get('/posts', async (req, res) => {
	try {
		const allPosts = await prisma.post.findMany(
			{
				orderBy: [
					{
						id: 'asc',
					},
				],
			} | undefined
		);

		return res.status(200).json({ allPosts });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Return posts by ID
router.get('/posts/:id', async (req, res) => {
	const { id } = req.params;
	const postId = parseInt(id);

	try {
		const post = await prisma.post.findFirst(
			{
				where: {
					id: postId,
				},
			} | undefined
		);
		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Return posts by Author ID
router.get('/posts/author/:id', async (req, res) => {
	const { id } = req.params;
	const authorId = parseInt(id);

	try {
		const post = await prisma.post.findMany({
			where: {
				id: authorId,
			},
		});
		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Update post's title by ID
router.put('/posts/:id/title', async (req, res) => {
	const { id } = req.params;
	const { title } = req.body;
	const postId = parseInt(id);

	try {
		const post = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				title: title,
			},
		});
		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Update post's content by ID
router.put('/posts/:id/content', async (req, res) => {
	const { id } = req.params;
	const { content } = req.body;
	const postId = parseInt(id);

	try {
		const post = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				content: content,
			},
		});
		return res.status(200).json(post);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Update post's likes by ID (give a like in the post)
router.put('/posts/:id/like', async (req, res) => {
	const { id } = req.params;
	const postId = parseInt(id);

	try {
		const post = await prisma.post.findFirst({
			where: {
				id: postId,
			},
		});

		const updatedPost = await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: post.likes + 1,
			},
		});

		return res.status(200).json(updatedPost);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Remove post by ID
router.delete('/posts/:id', async (req, res) => {
	const { id } = req.params;
	const postId = parseInt(id);

	try {
		const post = await prisma.post.delete({
			where: {
				id: postId,
			},
		});
		return res.status(200).json({ message: `Post ID:${post.id} was removed.` });
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

//Create post
router.post('/posts', async (req, res) => {
	const { title, content, authorId, published } = req.body;

	try {
		const post = await prisma.post.create({
			data: {
				title: title,
				content: content,
				authorId: authorId,
				published: published,
			},
		});
		return res.status(201).json(post);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
});

module.exports = router;
