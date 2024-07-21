const {
	Category
} = require('../models');
const Joi = require('@hapi/joi');

exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			}
		});

		if (category) {
			return res.send({
				data: category
			});
		} else {
			return res.status(400).send({
				message: 'Category Not Found'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.addCategory = async (req, res) => {
	try {
		const schema = Joi.object({
			name: Joi.string().min(3).required()
		});
		const {
			error
		} = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const category = await Category.create(req.body);

		if (category) {
			const categoryResult = await Category.findOne({
				where: {
					id: category.id
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});
			return res.send({
				data: categoryResult
			});
		} else {
			return res.status(400).send({
				message: 'Please Try Again'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.editCategory = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const schema = Joi.object({
			name: Joi.string().min(3).required()
		});
		const {
			error
		} = schema.validate(req.body);

		if (error)
			return res.status(400).send({
				error: {
					message: error.details[0].message
				}
			});

		const category = await Category.update(req.body, {
			where: {
				id
			}
		});

		if (category) {
			const categoryResult = await Category.findOne({
				where: {
					id
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt']
				}
			});

			return res.send({
				data: categoryResult
			});
		} else {
			return res.status(400).send({
				message: 'Please Try Again'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const {
			id
		} = req.params;
		const film = await Category.findOne({
			where: {
				id
			}
		});

		if (film) {
			await Category.destroy({
				where: {
					id
				}
			});

			return res.send({
				data: {
					id
				}
			});
		} else {
			return res.status(400).send({
				message: 'Category Not Found'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};