export default function(sequelize, DataTypes) {
  const payment = sequelize.define(
    'payment',
    {
      status: {
        allowNull: true,
        defaultValue: "pending",
        type: DataTypes.STRING,
      },
      month: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  return payment;
}
