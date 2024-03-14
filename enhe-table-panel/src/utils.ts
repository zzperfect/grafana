/**
 * @desc: utils
 * @author zhaozhou
 * @date 2022/7/7
 */

const cssToStyle = require('css-to-style/lib/index.cjs');

const toStyle = (css?: string) => {
  if ( css === undefined || css === null || css === '' ) {
    return {};
  } else {
    return cssToStyle(css);
  }
}

export {
  toStyle
};
