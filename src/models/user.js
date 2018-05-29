import {browserLang, setLocale} from '../utils/setLocale';
export default {
  namespace: 'user',
  state: {
    userInfo: {},
    lang: browserLang()._lang,
    locale: browserLang().locale,
    purchaseRecord: {}
  },
  reducers: {
    save(state, { payload: userInfo }) {
      return { ...state, userInfo };
    },
    changeLang(state, {payload: userInfo}) {
      let user_lang = userInfo.lang;
      let select_lang = localStorage.getItem('select_lang');
      let _lang = select_lang ? select_lang : user_lang;
      let lang = setLocale(_lang).lang;
      let locale = setLocale(_lang).locale;
      return {...state, lang, locale}
    },
  },
  effects: {
  },
  subscriptions: {
  }
};

