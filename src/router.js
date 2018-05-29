import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const routes = [
  {
    path: '/',
    models: () => [import('./models/home')],
    component: () => import('./routes/Home/Home')
  },
  {
    path: '/txn/:id',
    models: () => [],
    component: () => import('./routes/BlockChain/txnDetail')
  },
  {
    path: '/txnList',
    models: () => [],
    component: () => import('./routes/BlockChain/TxnList')
  },
  {
    path: '/txnList/:block',
    models: () => [],
    component: () => import('./routes/BlockChain/TxnList')
  },
  {
    path: '/block/:id',
    models: () => [],
    component: () => import('./routes/BlockChain/BlockDetail')
  },
  {
    path: '/blockList',
    models: () => [],
    component: () => import('./routes/BlockChain/BlockList')
  },
  {
    path: '/address/:id',
    models: () => [],
    component: () => import('./routes/BlockChain/AddressDetail')
  },
  {
    path: '/addressList',
    models: () => [],
    component: () => import('./routes/BlockChain/AddressList')
  },
  {
    path: '/tokenList',
    models: () => [],
    component: () => import('./routes/Token/tokenList')
  },
  {
    path: '/tokenTransfers',
    models: () => [],
    component: () => import('./routes/Token/tokenTransfers')
  },
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route
              exact
              key={key}
              path={path}
              component={dynamic({
                app,
                ...dynamics
              })} />
          ))
        }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
