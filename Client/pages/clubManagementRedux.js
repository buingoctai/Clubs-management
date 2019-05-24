import { Component } from 'react';
import {Provider} from 'react-redux';
import store from '../redux/store/store';
import {clubManagement} from './clubManagement';

class clubManagementRedux extends Component {
    render() {
      return (
        <Provider store={store}>  
            <clubManagement />
        </Provider>
  
      )
    }
  }
  export default clubManagementRedux;