import React, {Component} from 'react';
import {Link} from "dva/router";
import 'font-awesome/css/font-awesome.min.css';
import { Scrollbars } from 'react-custom-scrollbars';
import {Card,Button,Row,Col,Spin} from 'antd';
import BlockList from './component/BlockList';
import TransactionsList from './component/TransactionList';
import style from './Home.less';
import MainLayout from '../../components/MainLayout/MainLayout';
import {getBlocks,getTransactions} from '../../web3/web3';


export default class Home extends Component {
  state={
    blocks:[],
    transactions:[],
    blockLoading:false,
    txnsLoading:false
  };

  setBlockLoading = ()=>{
    this.setState({
      blockLoading:!this.state.blockLoading
    })
  };

  setTxnsLoading = ()=>{
    this.setState({
      txnsLoading:!this.state.txnsLoading
    })
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

  componentDidMount() {
    const now = new Date().getTime();
    this.setBlockLoading();
    this.setTxnsLoading();
    getTransactions(0).then(res=>{

      let data = res.data.eth.tx.data;
      data.forEach(item=>{
        item.time = this.timeFmt(now- Number(new Date(item.time))) ;
      });
      console.log("Transaction: ",data);
      this.setState({
        transactions:[...data]
      },()=>{
        this.setTxnsLoading();
      });

    }).catch(err=>{
      console.log("err:  ",err);
    });

    getBlocks(1).then(res => {
      res.forEach(item=>{
        item.time = this.timeFmt(now- item.timestamp) ;
      });
      console.log("time:     ",res.time);
      this.setState({
        blocks:[...res]
      },()=>{
        this.setBlockLoading();
      });
      console.log("blocks >>>", this.state.blocks)
    }).catch(err => console.log("err >>>",err));
  }


  render() {
    const {location} = this.props;

    return (
      <MainLayout location={location}>
        <div className={style.container}>
          <Row gutter={8}>
            <Col lg={12}>
              <Card bordered={false} className={style.caption}>
                <i className="fa fa-cubes fa-2x"> Blocks</i>
                <Button><Link to={`/blockList`}>view all</Link></Button>
              </Card>
              <Scrollbars style={{ width: '100%', height: 600 }}>
                {this.state.blockLoading&&
                <div className={style.cover}>
                  <Spin />
                </div>}

                {this.state.blocks.length>0&&this.state.blocks.map((item,idx)=>{
                  return(
                    <BlockList key={item.hash +idx} {...item} />
                  )
                })}
              </Scrollbars>

            </Col>
            <Col lg={12}>
              <Card bordered={false} className={style.caption}>
                <i className="fa fa-list-alt fa-2x"> Transactions</i>
                <Button><Link to={`/txnList`}>view all</Link></Button>
              </Card>
              <Scrollbars style={{ width: '100%', height: 600 }}>
                {this.state.txnsLoading&&
                <div className={style.cover}>
                  <Spin />
                </div>}
                {this.state.transactions.length>0&&this.state.transactions.map((item,idx)=>{
                  return(
                    <TransactionsList key={item.hash+idx} {...item} />
                  )
                })}
              </Scrollbars>
            </Col>
          </Row>
          <div>

          </div>
        </div>
      </MainLayout>
    );
  }
}
