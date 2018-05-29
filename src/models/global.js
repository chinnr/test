import enUS from 'antd/lib/locale-provider/en_US';
import zhTW from 'antd/lib/locale-provider/zh_TW';

export default {
  namespace: 'global',
  state: {
    lang: browserLang()._lang,
    locale: browserLang().locale,
  },
  reducers: {
    changeLang(state, { payload }) {
      return {
        ...state,
        lang: changeKey(payload),
        locale: setLocale(payload)
      };
    },
  },
  effects: {}
};

function changeKey (lang) {
  let _lang = 'zh';
  if (lang === 'zh-CN') {
    _lang = 'zh';
  }
  if (lang === 'en-US') {
    _lang = 'en';
  }
  if (lang === 'zh-TW') {
    _lang = 'tw';
  }
  if (lang === 'zh-HK') {
    _lang = 'tw';
  }
  return _lang;
}

function browserLang() {
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

function setLocale(lang) {
  let locale;
  if (lang === 'zh') {
    locale = null;
  }
  if (lang === 'en') {
    locale = enUS;
  }
  if (lang === 'tw') {
    locale = zhTW;
  }

  return locale;
}
