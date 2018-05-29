import enUS from 'antd/lib/locale-provider/en_US';
import zhTW from 'antd/lib/locale-provider/zh_TW';

export function setLocale(lang) {
  let i18n = {};
  let select_lang = localStorage.getItem('select_lang');

  // 如果用户已经选择过语言,并且存储到localStorage. 此时,刷新页面,则优先读取用户选择的语言.
  let _lang = select_lang ? select_lang.toLowerCase() : lang.toLowerCase();
  if (_lang === 'zh-cn') {
    i18n["lang"] = 'zh';
    i18n["locale"] = null;
  }
  if (_lang === 'en-us') {
    i18n["lang"] = 'en';
    i18n["locale"] = enUS;
  }
  if (_lang === 'zh-tw') {
    i18n["lang"] = 'tw';
    i18n["locale"] = zhTW;
  }
  if (_lang === 'zh-hk') {
    i18n["lang"] = 'tw';
    i18n["locale"] = zhTW;
  }
  return i18n;
}

export function browserLang() {
  let select_lang = localStorage.getItem('select_lang');
  let browser_lang = navigator.language
    ? navigator.language
    : navigator.userLanguage;
  // 如果用户已经选择过语言,并且存储到localStorage. 此时,刷新页面,则优先读取用户选择的语言.
  let lang = select_lang ? select_lang : browser_lang;
  let i18n = {};
  if (lang === 'zh-CN') {
    i18n["_lang"] = 'zh';
    i18n["locale"] = null;
  }
  if (lang === 'en-US') {
    i18n["_lang"] = 'en';
    i18n["locale"] = enUS;
  }
  if (lang === 'zh-TW') {
    i18n["_lang"] = 'tw';
    i18n["locale"] = zhTW;
  }
  if (lang === 'zh-HK') {
    i18n["_lang"] = 'tw';
    i18n["locale"] = zhTW;
  }
  return i18n;
}
