import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import {Tabs, Row, Col,Button} from 'antd';
import {Link} from "dva/router";
import style from './txnDetail.less';
import {getTransaction} from '../../web3/web3';

const TabPane = Tabs.TabPane;

class txn extends React.PureComponent {

  constructor({match}) {
    super();
    this.hash = match.params.id;
    this.state = {
      dt:''
    };
  }

  componentDidMount() {
    getTransaction(this.hash).then(res => {
      console.log(res);
      this.setState({dt: res});
    }).catch(err => err);
  }

  render() {
    const {location} = this.props;
    const bodyData = this.state.dt;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Transactions',
        href: '/txnList'
      },
      {
        title: 'Transaction Information',
      }
    ];





    return (
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Value={this.hash} Key={"Transaction"}></BreadcrumbList>
        <div className={style.contain}>
          <Tabs type="card">
            <TabPane tab="Overview" key="1">
              <div className={style.tabBody}>
                <div className={style.head}>
                  <p>Transaction info</p>
                </div>
                <div className={style.body}>
                    <Row style={{padding:"10px 15px"}}>
                      <Col sm={24} md={6}>TxHash:</Col>
                      <Col sm={24} md={18}>{bodyData['hash']}</Col>
                    </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Block Number:</Col>
                    <Col sm={24} md={18}>{bodyData['blockNumber']}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>From:</Col>
                    <Col sm={24} md={18}><Link to={`/address/${bodyData['from']}`}>{bodyData['from']}</Link></Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>To:</Col>
                    <Col sm={24} md={18}><Link to={`/address/${bodyData['to']}`}>{bodyData['to']}</Link></Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Value:</Col>
                    <Col sm={24} md={18}>{bodyData['value']}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Gas Price:</Col>
                    <Col sm={24} md={18}>{bodyData['gasPrice']} Wei</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Gas Used:</Col>
                    <Col sm={24} md={18}>{bodyData['gasUsed']}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Nonce:</Col>
                    <Col sm={24} md={18}>{bodyData['nonce']}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Transaction Index:</Col>
                    <Col sm={24} md={18}>{bodyData['transactionIndex']}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Input Data:</Col>
                    <Col sm={24} md={18}>
                      <textarea style={{width:"100%"}} rows="10" value={bodyData['input']}></textarea>

                    </Col>
                  </Row>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>

      </MainLayout>
    )
  }
};

export default txn;
