import React,{PureComponent} from 'react';
import {Input, notification} from 'antd';
import {withRouter} from 'dva/router';
import {getTransaction} from '../../../web3/web3'

const Search = Input.Search;

class HeaderTop extends PureComponent {

  search = (value)=>{
    const {history} = this.props;
    console.log("length:          ",value.length);
    if(value.length==40||value.length==42){
      history.push(`/address/${value}`);
    }else if(value.length>0&&value.length<=8){
      history.push(`/block/${value}`);
    }else if(value.length==66||value.length==64){
      getTransaction(value).then(res=>{
        if(res)
          history.push(`/txn/${value}`);
        else
          history.push(`/block/${value}`);
      })
    }else{
      this.openNotification();
    }
  }

  openNotification = () => {
    notification.open({
      message: '无用的搜索信息',
      description: '请输入block/txn/address有关的信息',
    });
  };

  render (){
    return(
      <div style={{float:'right'}}>
        <Search
          placeholder="Search by address / txHash / block"
          onSearch={this.search}
          enterButton
          style={{width:'350px'}}
        />
      </div>
    )
  }
}
export default withRouter(HeaderTop);
