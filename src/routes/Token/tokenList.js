import React from "react";
import MainLayout from '../../components/MainLayout/MainLayout';
import BreadcrumbList from './component/breadcrumbList';
import style from './tokenList.less';

class tokenList extends React.Component{
  state = {
    tokens:[],
    total:0,
    loading:false,
  };

  render(){
    const {location} = this.props;
    const breadcrumbList = [
      {
        title: 'home',
        href: '/'
      },
      {
        title: 'Tokens'
      }
    ];

    return(
      <MainLayout location={location}>
        <BreadcrumbList breadcrumbList={breadcrumbList} Key={"Token Tracker"}></BreadcrumbList>
        <div className={style.contain}>
          asdasd
        </div>
      </MainLayout>
    )
  }
}

export default tokenList;
