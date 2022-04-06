const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING(30),
          allowNull: true, //필수
          unique: true, //고유한값
        },
        username: {
          type: DataTypes.STRING(30),
          allowNull: false, //필수
        },
        password: {
          type: DataTypes.STRING(100), // 비밀번호는 암호화 되기떄문에 길게 설정해놓는다.
          allowNull: true, //필수
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        charset: 'utf8', // 이렇게 셋팅안하면 한글넣을시 에라남.
        collate: 'utf8_general_ci', //한글저장
        sequelize,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Card);
    db.User.belongsToMany(db.Card, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.Card, { through: 'Share', as: 'Shared' });
  }
};
