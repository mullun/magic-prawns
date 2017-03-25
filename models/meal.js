module.exports = function (sequelize, DataTypes) {
	var Meal = sequelize.define("Meal", {
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isInt: true,
				min: 1,
				max: 5
			}
		},
		description: {
			type: DataTypes.TEXT
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
					Meal.belongsTo(models.Dish, {
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