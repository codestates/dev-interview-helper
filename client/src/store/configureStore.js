import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(thunk))
    : composeWithDevTools(applyMiddleware(thunk, logger));

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
const store = createStore(rootReducer, enhancer);

export default store;
