/**
 * @desc: utils
 * @author zhaozhou
 * @date 2022/7/7
 */

const cssToStyle = require('css-to-style/lib/index.cjs');
const lodash = require('lodash');

const toStyle = (css?: string) => {
  if ( lodash.isEmpty(css) || lodash.isUndefined(css) || lodash.isNull(css) ) {
    return {};
  } else {
    return cssToStyle(css);
  }
}

export {
  lodash,
  toStyle
};
