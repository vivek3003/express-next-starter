const withSass = require('@zeit/next-sass');
const _ = require('lodash');
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, `../env/${process.env.ENV_FILE}`) });

const { STATIC_PATH, CURRENT_LANG } = process.env;

module.exports = _.merge({}, withSass(), {
  publicRuntimeConfig: {
    STATIC_PATH,
    CURRENT_LANG,
  },
});
