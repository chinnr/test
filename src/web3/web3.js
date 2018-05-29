// const Web3 = require("web3");
import Web3 from 'web3';
import { web3Interface, ethubInterface } from '../utils/constant';

// 实例化并且导出web3
export const web3 = new Web3(
  new Web3.providers.HttpProvider(web3Interface)
);


export async function getBlocks (page,number) {
  let num = number||await web3.eth.getBlockNumber();
  num = num-(page-1)*10;
  let res = [];
  for(let i = 0; i<10;i++){
    console.log(num);
    const b = await web3.eth.getBlock(num);
    res.push(b);
    num--;
    if(num<0)break;
  }
  return res;
}

export async function getTransactions(page,json=null) {
  let variables = {form:{limit:10,page}};
  if(json)
    variables.form.keyJson = json;

  let transaction = await fetch(ethubInterface,{
    method: 'POST',
    body: JSON.stringify({query:`query aa($form:FormQuery){
  eth {
    tx(query:$form) {
      meta {
        count
      }
      data {
        to
        from
        value
        hash
        height
        time
        gasPrice
      }
    }
  }
}`,variables})
  }).then(response => response.json())
    .then(responseJson => {
      return responseJson;
    });

  return transaction;
}

export async function getAddress(adr,page){

  let res = await fetch(ethubInterface,{
    method: 'POST',
    body: JSON.stringify({query:`{
  eth {
    tx(query:{limit:10,page:${page}},address:"${adr}") {
      meta {
        count
      }
      data {
        to
        from
        value
        hash
        height
        time
        gasPrice
      }
    }
  }
}`})
  }).then(response => response.json())
    .then(responseJson => {
      return responseJson;
    });

  return res;
}

export async function getTransaction(hash){
  if(hash.length==64)
    hash = "0X" + hash;
  let res = await web3.eth.getTransaction(hash);
  const {gasUsed} = await web3.eth.getTransactionReceipt(hash);
  res.gasUsed = gasUsed;
  return res;
}

export async function getBlock(hash){
  if(hash.length==64)
    hash = "0X" + hash;
  const res = await web3.eth.getBlock(hash);

  return res;
}

export async function getBalance(adr){
  const res = await web3.eth.getBalance(adr);

  return res;
}

export async function getAccounts(){
  const res = await web3.eth.getAccounts();

  return res;
}

export async function getTxnCount(adr){
  const res = await web3.eth.getTransactionCount(adr);

  return res;
}
