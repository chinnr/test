import React from 'react';
import { Breadcrumb } from 'antd';
import {Link} from "dva/router";
import style from './breadcrumbList.less';

const BreadcrumbList = (props)=>{
  const {breadcrumbList,Value,Key} = props;
  return(
    <div className={style.wrap}>
      <div className={style.container}>
        <h1 className={style.title}>
          {Key} <span style={{fontSize:"16px",fontWeight:200,color:"#999999"}}>{Value}</span>
        </h1>
        <span>
        <Breadcrumb>
        {breadcrumbList.map((item,index)=>{
          return(
            <Breadcrumb.Item key={item+index}>{item.href?<Link to={`${item.href}`}>{item.title}</Link>:item.title}</Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
      </span>
      </div>
    </div>
  )
};

export default BreadcrumbList;
