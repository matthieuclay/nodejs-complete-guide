exports.getPosts = (req, res, next) => {
	res.status(200).json({
		posts: [
			{
				_id: '1',
				title: 'First post',
				content: 'This is the first post',
				imageUrl: 'images/clay.png',
				creator: {
					name: 'Matthieu',
				},
				createdAt: new Date(),
			},
		],
	});
};

exports.createPost = (req, res, next) => {
	const title = req.body.title;
	const content = req.body.content;

	// Create post in DB
	res.status(201).json({
		message: 'Post created successfully',
		post: {
			_id: Date.now(),
			title,
			content,
			creator: { name: 'Matthieu' },
			createdAt: new Date(),
		},
	});
};
