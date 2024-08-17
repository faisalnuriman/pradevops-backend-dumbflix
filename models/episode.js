'use strict';
module.exports = (sequelize, DataTypes) => {
	const Episode = sequelize.define(
		'Episode',
		{
			title: DataTypes.STRING,
			thumbnailFilm: DataTypes.STRING,
			linkFilm: DataTypes.STRING,
			filmId: DataTypes.INTEGER
		},
		{}
	);
	Episode.associate = function(models) {
		Episode.belongsTo(models.Film, {
			as: 'film',
			foreignKey: {
				name: 'filmId'
			}
		});
	};
	return Episode;
};
