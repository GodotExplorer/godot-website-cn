export interface AppConfig {
	mode: "debug" | "release",
};
const config = require("config");
export default config as AppConfig;
