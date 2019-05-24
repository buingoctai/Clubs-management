import { Component } from 'react';
import DisplayMain from '../components/common/DisplayMain'
import Layout from '../components/layout/layout'
import AddClubNumber from "../components/team/AddClubNumber";
import AddClubInfor from "../components/team/AddClubInfor";
import DisplayClubInfor from "../components/team/DisplayClubInfor";
import DisplayClubDetailInfor from "../components/team/DisplayClubDetailInfor";
import { Provider } from 'react-redux';
import store from '../redux/store/store';
import "../style.css";

// const WrappedOne = AuthWrapper(AddClubInfor)
// const WrappedTwo = AuthWrapper(DisplayClubInfor)

class clubManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSubmit: false
    }
  }

  render() {
    const { isSubmit } = this.state
    return (

      <Layout>
        <DisplayMain />
        {/* <AddClubNumber /> */}
        <AddClubInfor />
        <DisplayClubInfor />
        <DisplayClubDetailInfor />
      </Layout>



    )
  }
}
export default clubManagement;