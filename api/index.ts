import APIError from "./api.error";
import APIClient from "./api.client";
import config from "../config";

export { APIError };
export default new APIClient(config.apiUrl);
