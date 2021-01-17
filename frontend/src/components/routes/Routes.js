import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import PrivateRoute from '../routes/PrivateRoute'
import AdminPrivateRoute from '../routes/AdminPrivateRoute'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import DepartmentScreen from '../../screens/DepartmentScreen'
import DocumentFileScreen from '../../screens/DocumentFileScreen'

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <AdminPrivateRoute
          path='/admin/users/logs'
          component={UserLogHistoryScreen}
        />
        <AdminPrivateRoute path='/register' component={RegisterScreen} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
        <PrivateRoute path='/department' component={DepartmentScreen} />
        <AdminPrivateRoute
          exact
          path='/admin/users'
          component={UserListScreen}
        />
        <AdminPrivateRoute
          path='/admin/users/page/:pageNumber'
          component={UserListScreen}
        />

        <PrivateRoute exact path='/' component={HomeScreen} />
        <PrivateRoute exact path='/:id' component={DocumentFileScreen} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
