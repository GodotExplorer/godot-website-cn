export interface AppConfig {
	mode: "debug" | "release",
	api: string,
};
const config = require("config");
export default config as AppConfig;
