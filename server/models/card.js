const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Card extends Model {
  static init(sequelize) {
    return super.init(
      {
        question: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        answer: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: 'Card',
        tableName: 'cards',
        charset: 'utf8', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8_general_ci', //한글저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.Card.belongsTo(db.User);
    db.Card.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
    db.Card.belongsToMany(db.User, { through: 'Share', as: 'Sharing' });
  }
};
