import React from 'react';
import {connect} from 'dva';
import {Icon,Popover,Select,Menu,Row,Col} from 'antd';
import style from './otherHeader.less';
import HeaderSearch from './component/HeaderTop';
import {Link} from 'dva/router';
import _i18n from '../../utils/i18n';

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

class otherHeader extends React.PureComponent {


  /**
   * 切换语言
   * @param lang
   */
  switchLang = (lang)=>{
    localStorage.removeItem('select_lang');
    localStorage.setItem('select_lang', lang);
    console.log("switch lang: ", lang);
    this.props.dispatch({
      type: 'global/changeLang',
      payload: lang
    });
  };

  /**
   * 确认用户选择的语言,保证不受页面刷新影响
   * @returns {*}
   */
  selectedLang = (lang)=>{
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
  };


  render(){
    const {lang} = this.props;
    console.log("lang:          ",lang);

    const content = (
      <div>
        <Select
          defaultValue={ `${this.selectedLang(lang)}` }
          style={{ width: 120 }}
          onChange={this.switchLang}
        >
          {SUPPOER_LOCALES.map(locale => (
            <Option key={locale.value} value={locale.value}>
              {locale.name}
            </Option>
          ))}
        </Select>
        <Menu
          style={{ width: 256 }}
          mode="inline"
        >
          <Menu.Item key="home">
            <Link to={'/'}>{_i18n("主页", lang)}</Link>
          </Menu.Item>
          <SubMenu title={<span>{_i18n("区块链", lang)}</span>}>
            <Menu.Item key="Txns">
              <Link to={'/txnList'}>{_i18n("查看交易", lang)}</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="blockList">
              <Link to={'/blockList'}>{_i18n("查看区块", lang)}</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="addressList">
              <Link to={'/addressList'}>{_i18n("查看账户", lang)}</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu title={<span>{_i18n("代币", lang)}</span>}>
            <Menu.Item key="tokenList">
              <Link to={'/tokenList'}>{_i18n("查看代币", lang)}</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="tokenTransfers">
              <Link to={'/tokenTransfers'}>{_i18n("查看代币过户", lang)}</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );

    return(
      <div style={{borderBottom:'2px solid #eee'}}>
        <Row className={style.container}>
          <Col md={6} xs={0}>

          </Col>
          <Col md={18} xs={0} className={style.mdCol}>
            <div style={{lineHeight:'50px',height:'50px'}}>
              <HeaderSearch></HeaderSearch>
              <div style={{float:'right',marginRight:"20px"}}>
                <Select
                  defaultValue={ `${this.selectedLang(lang)}` }
                  style={{ width: 120 }}
                  onChange={this.switchLang}
                >
                  {SUPPOER_LOCALES.map(locale => (
                    <Option key={locale.value} value={locale.value}>
                      {locale.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>


            <Menu
              defaultSelectedKeys={['home']}
              mode="horizontal"
            >
              <Menu.Item key="home">
                <Link to={'/'}>{_i18n("主页", lang)}</Link>
              </Menu.Item>
              <SubMenu title={<span>{_i18n("区块链", lang)}</span>}>
                <Menu.Item key="Txns">
                  <Link to={'/txnList'}>{_i18n("查看交易", lang)}</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="blockList">
                  <Link to={'/blockList'}>{_i18n("查看区块", lang)}</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="addressList">
                  <Link to={'/addressList'}>{_i18n("查看账户", lang)}</Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu title={<span>{_i18n("代币", lang)}</span>}>
                <Menu.Item key="tokenList">
                  <Link to={'/tokenList'}>{_i18n("查看代币", lang)}</Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="tokenTransfers">
                  <Link to={'/tokenTransfers'}>{_i18n("查看代币过户", lang)}</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col xs={24} md={0}>
            <Popover placement="bottomRight" content={content} trigger="click">
              <Icon className={style.iconSize} type="bars" />
            </Popover>
          </Col>
        </Row>

      </div>
    )
  }
}

function connection(component) {
  return connect(function mapStateToProps(state) {
    const { lang } = state.global;
    return {
      lang
    };
  })(component);
}

export default connection(otherHeader);
