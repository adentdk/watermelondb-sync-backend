const url = require("url");
const fs = require("fs");
const pathLib = require("path");

export const assetDomain = ({ path }) => {
  return url.resolve(process.env.ASSET_DOMAIN, path);
};

export const isExist = ({ path }) => {
  if (!fs.existsSync(pathLib.resolve(path.replace(/^\/+/g, "")))) {
    return false;
  }
  return true;
};

export const deleteAsset = ({ paths }) => {
  return new Promise((resolve) => {
    const errors = [];

    paths.forEach((path) => {
      if (isExist({ path })) {
        fs.unlink(pathLib.resolve(path.replace(/^\/+/g, "")), (err) => {
          errors.push(err);
        });
      }
    });

    resolve(errors);
  });
};
