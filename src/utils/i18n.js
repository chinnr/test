import lang from '../locale/lang';
const MESSAGES = mapLang(lang);

export default function _i18n(key, options) {
  // console.log("_i18n >>> ", key, options)
  // const locale = options || 'zh';
  let msg = MESSAGES[options][key];
  if (msg == null) {
    return key;
  }
  return msg;
}

function mapLang(lang) {
  // console.log('lang==>', lang);
  let msg = {},
    en = {},
    zh = {},
    tw = {};
  for (let item in lang) {
    en[item] = lang[item].en;
    zh[item] = lang[item].zh;
    tw[item] = lang[item].tw;
  }
  msg = { en, zh, tw };
  // console.log('sss==>', msg);
  return msg
}
