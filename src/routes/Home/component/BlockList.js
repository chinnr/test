import React from 'react';
import { Link } from 'dva/router';
import style from './BlockList.less';

export default (props)=>{
  const {
    number,
    miner,
    time,
    gasUsed,
    transactions,
  } = props;
  return(
    <div className={style.block}>
      <div className={style.blackBlock}>
        <Link style={{color:"#fff"}} to={`/block/${number}`}>
          Block {number}<br />
          >{time}
        </Link>

      </div>
      <div className={style.blockRight}>
        <p>Mine by <Link className={style.addressLink} to={`/address/${miner}`}>{miner}</Link></p>
        <p><Link style={{color:"#3498db",fontWeight:"bold"}} to={`/txnList/${number}`}>{transactions.length} {transactions.length==1?"txn":"txns"}</Link> in 15 secs</p>
        <p>Block Reward {gasUsed} Wei</p>
      </div>
    </div>
  )
};
