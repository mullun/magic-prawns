module.exports = function (sequelize, DataTypes) {
	var Meal = sequelize.define("Meal", {
		meal_name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		restaurant: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				min: 1,
				max: 5
			}
		},
		zip_code: {
			type: DataTypes.INTEGER,
			validate: {
				isInt: true,
				len: [5,5]
			}
		},
		{
			classMethods: {
				associate: function(models) {
					Meal.belongsTo(models.User, {
						foreignKey: {
							allowNull: false
						}
					});
				}
			}
		}
	);
	return Meal;
};