import React from "react";
import {Link} from "dva/router";
import style from "./TransactionList.less";

export default (props)=>{
  const {
    to,
    from,
    value,
    hash,
    height,
    time,
    gasPrice,
  } = props;
  return (
    <div className={style.Transaction}>
      <span>
        <i className={"fa fa-hdd-o fa-2x"}></i>
      </span>
      <div className={style.TransactionRight}>
        <p>TX# <Link className={style.addressLink} to={`/txn/${hash}`}>{hash}</Link>
          <span>>{time}</span>
        </p>
        <p>from <Link className={style.addressLink} to={`/address/${from}`}>{from}</Link>
        to <Link className={style.addressLink} to={`/address/${to}`}>{to}</Link>
        </p>
        <p>Amount {gasPrice} Wei</p>
      </div>
    </div>
  )
}
