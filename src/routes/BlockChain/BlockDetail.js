import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import {Tabs, Row, Col} from 'antd';
import {Link} from "dva/router";
import style from './txnDetail.less';
import {getBlock} from '../../web3/web3';

const TabPane = Tabs.TabPane;
class Block extends React.Component {
  constructor({match}) {
    super();
    this.hash = match.params.id;
    this.state = {
      dt:''
    };
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

  componentDidMount() {
    console.log("params:      ",this.props.match.params.id);
    this.getBlockInfo();
  }

  componentWillReceiveProps(nextProps) {
    console.log("new params:       ",nextProps.match.params.id);
    this.hash = nextProps.match.params.id;
    this.getBlockInfo();
  }

  getBlockInfo = ()=>{
    const now = new Date().getTime();
    getBlock(this.hash).then(res => {
      let data = this.timeFmt(now- Number(new Date(res.timestamp)));
      data = `${data}  (${new Date(res.timestamp)})`;
      res.timestamp = data;
      console.log(res);
      this.setState({dt: res});
    }).catch(err => err);
  }

  render() {
    const {location} = this.props;
    const {
      number,
      timestamp,
      transactions,
      miner,
      parentHash,
      sha3Uncles,
      difficulty,
      totalDifficulty,
      size,
      gasUsed,
      gasLimit,
      nonce,
      extraData
    } = this.state.dt;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Blocks',
        href: '/blockList'
      },
      {
        title: 'Block Information',
      }
    ];

    let _transactions;
    if(transactions){
      if(transactions.length===0)
        _transactions = "0 transaction";
      else
        _transactions = (
          <Link to={`/txnList/${number}`} >{transactions.length} transtions</Link>
        )
    }



    return(
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Value={"#"+this.hash} Key={"Block"}></BreadcrumbList>
        <div className={style.contain}>
          <Tabs type="card">
            <TabPane tab="Overview" key="1">
              <div className={style.tabBody}>
                <div className={style.head}>
                  <p>Transaction info</p>
                </div>
                <div className={style.body}>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Height:</Col>
                    <Col sm={24} md={18}>{number}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Time Stamp:</Col>
                    <Col sm={24} md={18}>{timestamp}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Transactions:</Col>
                    <Col sm={24} md={18}>{_transactions}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Miner:</Col>
                    <Col sm={24} md={18}>{miner}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Parent Hash:</Col>
                    <Col sm={24} md={18}><Link to={`/block/${parentHash}`}>{parentHash}</Link></Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Sha3Uncles:</Col>
                    <Col sm={24} md={18}>{sha3Uncles}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Difficulty:</Col>
                    <Col sm={24} md={18}>{difficulty}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Total Difficulty:</Col>
                    <Col sm={24} md={18}>{totalDifficulty}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Size:</Col>
                    <Col sm={24} md={18}>{size}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Gas Used:</Col>
                    <Col sm={24} md={18}>{gasUsed}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Gas limit:</Col>
                    <Col sm={24} md={18}>{gasLimit}</Col>
                  </Row>
                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Nonce:</Col>
                    <Col sm={24} md={18}>{nonce}</Col>
                  </Row>


                  <Row style={{padding:"10px 15px"}}>
                    <Col sm={24} md={6}>Extra Data:</Col>
                    <Col sm={24} md={18}>
                      <textarea style={{width:"100%"}} rows="3" value={extraData}></textarea>
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
}

export default Block;
