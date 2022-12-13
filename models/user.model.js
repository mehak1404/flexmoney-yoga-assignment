import bcrypt from 'bcryptjs';

export default function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      age:{
         allowNull : false, 
         type: DataTypes.INTEGER,
      }
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  user.beforeSave(async user => {
    try {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  user.prototype.isValidPassword = async function(pw) {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (err) {
      throw new Error(err);
    }
  };
//   user.associate = (models) => {
//     user.hasMany(models.payment, {
//       onDelete: "cascade",
//     });
//   };

  return user;
}
