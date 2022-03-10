"use strict";

var _app = _interopRequireDefault(require("./app"));

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const port = process.env.PORT || 3000;

_app.default.listen(port, () => {
  console.log(`🚀 [server]: servidor rodando em :${port}.`);
});