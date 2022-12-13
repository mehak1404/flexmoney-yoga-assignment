export default function(sequelize, DataTypes) {
    const batch = sequelize.define(
      'batch',
      {
        batchName: {
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
    // batch.associate = (models) => {
    //     batch.hasMany(models.user, {
    //       onDelete: "cascade",
    //     });
    //   };
    return batch;
  }
  