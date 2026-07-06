process.env.NODE_ENV = "test";
process.env.JWT_ACCESS_SECRET = "access_secret_test";
process.env.JWT_REFRESH_SECRET = "refresh_secret_test";
process.env.ACCESS_TOKEN_EXPIRES = "15m";
process.env.REFRESH_TOKEN_EXPIRES = "30d";

const { createDefaultPreset } = require("ts-jest");

module.exports = {
  testEnvironment: "node",
  transform: { ...createDefaultPreset().transform },
  testMatch: ["**/tests/integration/**/*.test.ts"],
  testTimeout: 20000,
};