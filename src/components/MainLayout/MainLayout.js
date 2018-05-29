import React  from 'react';
import { connect } from 'dva';
import { LocaleProvider, Layout } from 'antd';
// import {Helmet} from "react-helmet";
import styles from './MainLayout.css';
import Header from '../Header/otherHeader';
import MenuMobile from '../MenuMobile/MenuMobile';
import { isOnPhone } from '../../utils/mobileMode';


const { Content, Footer } = Layout;

function MainLayout({ children, location, locale, lang, userInfo }) {
  return (
    <LocaleProvider locale={locale}>
      <Layout className={styles.normal}>
        {/*<MenuMobile />*/}
        <Header />
        {/*<Header location={location} />*/}
        <Content className={styles.content} location={location}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          <p>
            © 2018-2019 All rights reserved.
          </p>
        </Footer>
      </Layout>
    </LocaleProvider>
  );
}

function connection(component) {
  return connect(function mapStateToProps(state) {
    const { lang, locale } = state.global;
    return {
      lang,
      locale,
    };
  })(component);
}
export default connection(MainLayout);
