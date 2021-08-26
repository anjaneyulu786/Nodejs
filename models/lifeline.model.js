const {TE, to}              = require('../services/util.service');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Lifeline', {
    userName: DataTypes.STRING,
    email     : {type: DataTypes.STRING, allowNull: true, unique: true, validate: { isEmail: {msg: "Email invalid."} }},
    phone     : {type: DataTypes.STRING, allowNull: true, validate: { len: {args: [7, 20], msg: "Phone number invalid, too short."}, isNumeric: { msg: "not a valid phone number."} }},
  });

  Model.associate = function(models){
      this.Users = this.belongsToMany(models.User, {through: 'UserLifeline'});
  };

//   Model.associate = function(models){
//     this.Companies = this.belongsToMany(models.Company, {through: 'UserCompany'});
// };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};