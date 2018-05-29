import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import 'font-awesome/css/font-awesome.min.css';
import {Tabs,Divider,Table,Row,Col} from 'antd';
import {Link} from "dva/router";
import style from './txnDetail.less';
import {getAddress,getBalance} from '../../web3/web3';

const TabPane = Tabs.TabPane;

class AdressDetail extends React.Component{
  constructor({match}) {
    super();
    this.hash = match.params.id;
    this.state = {
      dt:[],
      balance:0,
      total:0,
      loading:false,
    };
  }

  timeFmt = (mss)=>{
    const days = mss / (1000 * 60 * 60 * 24);
    const hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    const minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
    const seconds = (mss % (1000 * 60 * 60)) / 1000;

    let time;
    if(days>1){
      time = Math.round(days)>1?Math.round(days)+' days':Math.round(days)+' day';
    }else{
      if(hours>1){
        time = Math.round(hours)>1?Math.round(hours)+' hours':Math.round(hours)+' hour';
      }else{
        if(minutes>1){
          time = Math.round(minutes)>1?Math.round(minutes)+' minutes':Math.round(minutes)+' minute';
        }else {
          time = Math.round(seconds)>1?Math.round(seconds)+' seconds':Math.round(seconds)+' second';
        }
      }
    }

    return time+" ago";

  }

  componentDidMount() {
    console.log("params:      ",this.props.match.params.id);
    this.getAddressInfo(0);
    this.getBalance();
  }

  componentWillReceiveProps(nextProps) {
    console.log("new params:       ",nextProps.match.params.id);
    this.hash = nextProps.match.params.id;
    this.getAddressInfo(0);
    this.getBalance();
  }

  setLoading=()=>{
    this.setState({
      loading:!this.state.loading
    })
  }

  onChange=(page)=>{
    this.getAddressInfo(page-1);
  }

  getAddressInfo = (page)=>{
    this.setLoading();
    const now = new Date().getTime();
    getAddress(this.hash,page).then(res => {
      let data = res.data.eth.tx.data;
      const total = res.data.eth.tx.meta.count;
      this.setState({
        total
      })
      data.forEach(item=>{
        item.time = this.timeFmt(now- Number(new Date(item.time))) ;
      });
      console.log(data);
      this.setState({dt: [...data]},()=>{
        this.setLoading();
      });
    }).catch(err => err);
  }

  getBalance = ()=>{
    getBalance(this.hash).then(res=>{
      this.setState({
        balance:res
      })
    }).catch(err=>console.log(err));
  }

  render(){
    const {location} = this.props;
    const bodyData = this.state.dt;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Normal Accounts',
        href: '/AddressList'
      },
      {
        title: 'Address'
      }
    ];
    const columns = [
      {
        title:'TxHash',
        dataIndex: 'hash',
        key: 'hash',
        width:200,
        render: text => <Link className={style.ellipsisTag} to={`/txn/${text}`}>{text}</Link>,
      },
      {
        title:'Block',
        dataIndex: 'height',
        key: 'height',
        width:100,
        render: text => <Link to={`/block/${text}`}>{text}</Link>,
      },
      {
        title:'Age',
        dataIndex: 'time',
        key: 'time',
        width:100,
      },
      {
        title:'From',
        dataIndex: 'from',
        key: 'from',
        width:200,
        render: text => <Link className={style.ellipsisTag} to={`/address/${text}`}>{text}</Link>,
      },
      {
        title:'To',
        dataIndex: 'to',
        key: 'to',
        width:200,
        render: text => <Link className={style.ellipsisTag} to={`/address/${text}`}>{text}</Link>,
      },
      {
        title:'Value',
        dataIndex: 'value',
        key: 'value',
        width:200
      },
    ];

    let a = '';
    if(bodyData.length>10){
      a = `${bodyData.length} txns from a total Of ${bodyData.length} transactions`
    }else{
      if(bodyData.length<2)
        a = `${bodyData.length} txn`
      else
        a = `${bodyData.length} txns`

    }
    return(
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Value={this.hash} Key={"Address"}></BreadcrumbList>
        <div className={style.contain}>
          <div className={style.midContain}>
            <div className={style.midLeft}>
              <Row>
                <Col span={10}>ETH Balance:</Col>
                <Col span={14}>{this.state.balance}</Col>
              </Row>
              <Divider />
            </div>
          </div>
          <Tabs type="card">
            <TabPane tab="Transaction" key="1">
              <div className={style.tabBody}>
                <div className={style.adrTabHead}>
                  <i className={'fa fa-sort-amount-desc'}> Latest {a}</i>
                </div>
                <div className={style.body}>
                  <Table
                    loading={this.state.loading}
                    columns={columns}
                    dataSource={this.state.dt}
                    rowKey={record=>record.hash+Math.random().toString(36).substr(2)}
                    pagination={{
                      onChange:this.onChange,
                      total:this.state.total,
                      pageSize:10,
                    }}
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </MainLayout>
    )
  }
}

export default AdressDetail;
