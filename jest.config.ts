import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.module\\.css$": "identity-obj-proxy", // <-- для CSS модулей
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
};

export default config;
