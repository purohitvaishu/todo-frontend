import dotenv from "dotenv";

dotenv.config();

const config = url => {
  if (url) return url;

  const envToUrlMap = {
    dev: process.env.REACT_APP_BACKEND_DEVNET_URL,
    local: process.env.REACT_APP_BACKEND_LOCAL_URL
  };

  return envToUrlMap[process.env.REACT_APP_DEFAULT_NETWORK || "local"];
};

export default config;
