import dva from 'dva';
import './index.css';
import { createLogger } from 'redux-logger';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  onAction: createLogger()
});

// 2. Plugins
app.use(createLoading());


// 3. Model
app.model(require('./models/global').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
