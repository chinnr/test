import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Menu, Icon, Button, Modal, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './MenuMobile.css';
import './MenuMobile.css';
import _i18n from '../../utils/i18n';

const SubMenu = Menu.SubMenu;

class MenuMobile extends Component {
  // submenu keys of first level
  rootSubmenuKeys = ['main', 'account', 'notice', 'lang'];
  state = {
    modalVisible: false,
    openKeys: ['main']
  };
  toggleCollapsed = () => {
    this.setState({
      modal1Visible: !this.state.modal1Visible
    });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  setModalVisible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  render() {
    const { modal1Visible } = this.state;
    const { lang } = this.props;
    return (
      <div>
        <div >
          <Row className={styles.mobile_top_bar}>
            <Col span={20} />
            <Col span={4}>
              <Button
                type="default"
                onClick={this.toggleCollapsed}
                className={styles.menu_btn}
              >
                <Icon className={styles.menu_icon} type="appstore-o" />
              </Button>
            </Col>
          </Row>
        </div>
        <Modal
          title={null}
          footer={null}
          maskClosable={true}
          closable={false}
          className={"modal_menu"}
          style={{
            // top: '-38px',
            right: '-150%',
            margin: 0,
            padding: 0,
            width: 0,
            backgroundColor: 'none'
          }}
          visible={modal1Visible}
          onCancel={() => this.setModalVisible(false)}
        />
        <div
          className={
            !modal1Visible ? styles.mobile_menu : styles.mobile_menu_show
          }
        >
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            mode="inline"
            theme="dark"
            className={styles.mobileMenu}
            // inlineCollapsed={this.state.collapsed}
          >
            <SubMenu key="main" title={<span>{_i18n('主功能', lang)}</span>}>
              <SubMenu key="personal" title={_i18n('个人档案', lang)}>
                <Menu.Item key="basic">{_i18n('基本信息', lang)}</Menu.Item>
                <Menu.Item key="password">{_i18n('密码修改', lang)}</Menu.Item>
                <Menu.Item key="card">{_i18n('银行卡', lang)}</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
      </div>
    );
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
export default connection(MenuMobile);
