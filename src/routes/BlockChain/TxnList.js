import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import style from './TxnList.less';
import {Table} from 'antd';
import {Link} from "dva/router";
import {getTransactions} from '../../web3/web3';


class TxnList extends React.Component{
  constructor({match}){
    super();
    if(match.params.block)
      this.block = match.params.block;

  };

  state={
    transactions:[],
    total:0,
    loading:false,
  };

  timeFmt = (mss)=>{
    const days = mss / (1000 * 60 * 60 * 24);
    const hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    const minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
    const seconds = (mss % (1000 * 60 * 60)) / 1000;

    let time;
    if(days>1){
      time = Math.round(days)+' days';
    }else{
      if(hours>1){
        time = Math.round(hours)+' hours';
      }else{
        if(minutes>1){
          time = Math.round(minutes)+' mintes';
        }else {
          time = Math.round(seconds)+' seconds';
        }
      }
    }

    return time+" ago";

  };

  setLoading = ()=>{
    this.setState({
      loading:!this.state.loading
    })
  };

  getTxns = (page)=>{
    this.setLoading();
    const now = new Date().getTime();
    const json = JSON.stringify({height:this.block});
    getTransactions(page,json).then(res=>{
      let data = res.data.eth.tx.data;
      const total = res.data.eth.tx.meta.count;
      data.forEach(item=>{
        item.time = this.timeFmt(now- Number(new Date(item.time))) ;
      });

      console.log("Transactions:     ",data);

      this.setState({
        transactions:data,
        total
      },()=>{
        this.setLoading();
      });


    }).catch(err=>{
      console.log("err:  ",err);
    });
  };

  onChange=(page)=>{
    this.getTxns(page-1);
  };

  componentDidMount(){
    this.getTxns(0);
  };

  render(){
    const {location} = this.props;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Transactions'
      }
    ];

    const columns = [
      {
        title:'TxHash',
        dataIndex: 'hash',
        key: 'hash',
        width:200,
        render: text => <Link className={'ellipsisTag'} to={`/txn/${text}`}>{text}</Link>,
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
        render: text => <Link className={'ellipsisTag'} to={`/address/${text}`}>{text}</Link>,
      },
      {
        title:'To',
        dataIndex: 'to',
        key: 'to',
        width:200,
        render: text => <Link className={'ellipsisTag'} to={`/address/${text}`}>{text}</Link>,
      },
      {
        title:'Value',
        dataIndex: 'value',
        key: 'value',
        width:200,
        render: text => <Link className={'ellipsisTag'} to={'/'}>{text}</Link>,
      },
    ];

    return(
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Key={"Transactions"} Value={this.block?`::For Block ${this.block}`:""}></BreadcrumbList>
        <div className={style.contain}>
          <Table
            loading={this.state.loading}
            columns={columns}
            dataSource={this.state.transactions}
            scroll={{x:1200}}
            rowKey={record=>record.hash+Math.random().toString(36).substr(2)}
            pagination={{
              onChange:this.onChange,
              total:this.state.total,
              pageSize:10,
            }}
          />
        </div>
      </MainLayout>
    )
  }
}

export default TxnList;
