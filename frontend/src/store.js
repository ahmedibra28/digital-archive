import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userLogHistoryReducer,
} from './reducers/userReducers'

import {
  departmentListReducer,
  departmentCreateReducer,
  departmentUpdateReducer,
  departmentDeleteReducer,
} from './reducers/departmentReducers'

import {
  documentListReducer,
  documentCreateReducer,
  documentDeleteReducer,
  documentFileCreateReducer,
  documentFileDeleteReducer,
} from './reducers/documentReducers'

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userLogHistory: userLogHistoryReducer,

  departmentList: departmentListReducer,
  departmentCreate: departmentCreateReducer,
  departmentUpdate: departmentUpdateReducer,
  departmentDelete: departmentDeleteReducer,

  documentList: documentListReducer,
  documentCreate: documentCreateReducer,
  documentDelete: documentDeleteReducer,

  documentFileCreate: documentFileCreateReducer,
  documentFileDelete: documentFileDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
