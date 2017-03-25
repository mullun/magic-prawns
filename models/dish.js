module.exports = function (sequelize, DataTypes) {
	var Dish = sequelize.define("Dish", {
		dish_name: {
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
		cuisine: {
			type: DataTypes.STRING
		},
		description: {
			type: DataTypes.TEXT
		}
	},
		{
			classMethods: {
				associate: function(models) {
					Dish.hasMany(models.Meal, {
						
					});
				}
			}
		}
	);
	return Dish;
};