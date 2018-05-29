import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import style from './TxnList.less';
import {Table} from 'antd';
import {Link} from "dva/router";
import {getBlocks} from '../../web3/web3';


class BlockList extends React.Component{
  state={
    blocks:[],
    total:0,
    loading:false
  }

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

  onChange=(page)=>{
    this.setLoading();
    const now = new Date().getTime();
    getBlocks(page,this.state.total).then(res => {

      res.forEach(item => {
        item.time = this.timeFmt(now - item.timestamp);
      });
      this.setState({
        blocks: [...res]
      },()=>{
        this.setLoading();
        console.log("blocks >>>", this.state.blocks);
      });

    }).catch(err => console.log("err >>>", err));
  }

  componentDidMount() {
    const now = new Date().getTime();
    this.setLoading();
    getBlocks(1).then(res => {
      res.forEach(item => {
        item.time = this.timeFmt(now - item.timestamp);
      });
      this.setState({
        blocks: [...res],
        total:res[0].number
      },()=>{
        this.setLoading();
        console.log("blocks >>>", this.state.blocks);
        console.log("total >>>", this.state.total);
      });

    }).catch(err => console.log("err >>>", err));
  }

  setLoading=()=>{
    this.setState({
      loading:!this.state.loading
    })
  }

  render(){
    const {location} = this.props;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Blocks',
      }
    ];

    const columns = [
      {
        title:'Block',
        dataIndex: 'number',
        key: 'number',
        width:100,
        render: text => <Link to={`/block/${text}`}>{text}</Link>,
      },
      {
        title:'Age',
        dataIndex: 'time',
        key: 'time',
        width:150,
      },
      {
        title:'txn',
        dataIndex: 'transactions',
        key: 'transactions',
        width:70,
        render: text => <Link to={`/txnList`}>{text.length}</Link>,
      },
      {
        title:'Miner',
        dataIndex: 'miner',
        key: 'miner',
        width:200,
        render: text => <Link className={'ellipsisTag'} to={`/address/${text}`}>{text}</Link>,
      },
      {
        title:'Uncles',
        dataIndex: 'uncles',
        key: 'uncles',
        width:70,
        render: text => <Link to={`/`}>{text.length}</Link>,
      },
      {
        title:'Gas Limit',
        dataIndex: 'gasLimit',
        key: 'gasLimit',
        width:140,
      },
      {
        title:'Gas Used',
        dataIndex: 'gasUsed',
        key: 'gasUsed',
        width:140,
      },
    ];

    function itemRender(current, type, originalElement) {
      if (type === 'prev') {
        return <a>Previous</a>;
      } else if (type === 'next') {
        return <a>Next</a>;
      }
      return originalElement;
    }

    return(
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Key={"Blocks"}></BreadcrumbList>
        <div className={style.contain}>
          <Table
            loading={this.state.loading}
            columns={columns}
            dataSource={this.state.blocks}
            scroll={{x:1200}}
            rowKey={record=>record.hash}
            pagination={{
              onChange:this.onChange,
              total:this.state.total,
              pageSize:10,
              itemRender:itemRender
            }}
          />
        </div>
      </MainLayout>
    )
  }
}

export default BlockList
