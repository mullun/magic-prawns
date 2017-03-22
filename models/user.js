module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  },
    {
      // We're saying that we want our Author to have Posts
      classMethods: {
        associate: function(models) {
          // An Author (foreignKey) is required or a Post can't be made
          User.hasMany(models.Dish, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );
  return User;
};
