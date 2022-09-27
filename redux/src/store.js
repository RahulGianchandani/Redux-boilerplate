import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './redux/reducers' 
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
const middleware = [thunk];





const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export { store };