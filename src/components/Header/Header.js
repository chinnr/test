import React from 'react';
import { Layout, Menu, Icon, Row, Col, Select, Button, Badge, Radio } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './Header.css';
import _i18n from '../../utils/i18n';
const { Header } = Layout;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const SUPPOER_LOCALES = [
  {
    name: 'English',
    value: 'en-US'
  },
  {
    name: '简体中文',
    value: 'zh-CN'
  },
  {
    name: '繁体中文',
    value: 'zh-TW'
  }
];

function HeaderLayout({ dispatch, lang }) {

  /**
   * 切换语言
   * @param lang
   */
  function switchLang(lang) {
    localStorage.removeItem('select_lang');
    localStorage.setItem('select_lang', lang);
    console.log("switch lang: ", lang);
    dispatch({
      type: 'global/changeLang',
      payload: lang
    });
  }

  /**
   * 确认用户选择的语言,保证不受页面刷新影响
   * @returns {*}
   */
  function selectedLang (lang) {
    let select_lang = localStorage.getItem('select_lang');
    let currentLang = select_lang ? select_lang : lang;

    let _currentLang = '';
    if(currentLang) {
      _currentLang = currentLang.replace(/\s+/g,"").toLowerCase();
    }

    let _lang;
    if (_currentLang === 'zh-cn') {
      _lang = '简体中文';
    }
    if (_currentLang === 'en-us') {
      _lang = 'English';
    }
    if (_currentLang === 'zh-tw') {
      _lang = '繁体中文';
    }
    if (_currentLang === 'zh-hk') {
      _lang = '繁体中文';
    }
    return _lang;
  }

  return (
    <Header className={styles.header}>
      <Row>
        <Col span={20}>
          <div className={styles.select_lang}>
            <Select
              defaultValue={ `${selectedLang(lang)}` }
              style={{ width: 120 }}
              onChange={switchLang}
            >
              {SUPPOER_LOCALES.map(locale => (
                <Option key={locale.value} value={locale.value}>
                  {locale.name}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
      </Row>
      <div className={styles.menu_bar_wrap}>
        <Row>
          <Col span={24}>
            <Menu className={styles.menu_bar} mode="horizontal">
              <SubMenu key="main" title={<span>{_i18n("主功能", lang)}</span>}>
                <SubMenu key="personal" title={_i18n("个人档案", lang)}>
                  <Menu.Item key="basic">{_i18n("基本信息", lang)}</Menu.Item>
                  <Menu.Item key="password">{_i18n("密码修改", lang)}</Menu.Item>
                  <Menu.Item key="card">{_i18n("银行卡", lang)}</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    </Header>
  );
}

function connection(component) {
  return connect(function mapStateToProps(state) {
    const { lang } = state.global;
    return {
      lang
    };
  })(component);
}

export default connection(HeaderLayout);
