import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import style from './TxnList.less';
import {Table} from 'antd';
import {Link} from "dva/router";
import {getAccounts, getBalance, getTxnCount} from '../../web3/web3';

class AddressList extends React.Component {
  state = {
    adrs: [],
    data: [],
    dataLength:0,
  }


  componentDidMount() {
    getAccounts().then(res => {
      console.log(res);
      this.setState({
        adrs: [...res]
      },()=>{
        this.onChange(1);
      });
    }).catch(err => {
      console.log("err:  ", err);
    });
  }


  onChange = (page) => {
    this.setState({
      data:[]
    });
    const start = (page - 1) * 10;
    const end = page * 10;
    const arr = this.state.adrs.slice(start, end);
    console.log(arr);

    this.setState({
      dataLength:arr.length
    })

    arr.forEach((item) => {
      let obj = {adr: item};

      let a = getBalance(item);

      let b = getTxnCount(item);

      Promise.all([a,b]).then(([p1,p2])=>{
        obj.balance = p1;
        obj.txnCount = p2;
        this.state.data.push(obj)
        const newArr = this.state.data;
        console.log(newArr);
        this.setState({
          data:newArr
        });
      }).catch(err=>err);
    })


  }


  render() {
    const {location} = this.props;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Accounts'
      }
    ];
    const columns = [
      {
        title: 'Address',
        dataIndex: 'adr',
        key: 'adr',
        width: 200,
        render: text => <Link to={`/address/${text}`}>{text}</Link>,
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
        width: 150
      },
      {
        title: 'TxnCount',
        dataIndex: 'txnCount',
        key: 'txnCount',
        width: 70,
      }
    ];


    return (
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Key={"Accounts"}></BreadcrumbList>
        <div className={style.contain}>
          <Table
            loading={this.state.data.length===this.state.dataLength?false:true}
            columns={columns}
            dataSource={this.state.data.length===this.state.dataLength?this.state.data:[]}
            scroll={{x: 1200}}
            rowKey={record => record.adr}
            pagination={{
              onChange: this.onChange,
              total: this.state.adrs.length,
              pageSize: 10,
            }}
          />
        </div>
      </MainLayout>
    )
  }
}

export default AddressList;
