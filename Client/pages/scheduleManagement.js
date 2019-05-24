import { Component } from 'react';
import DisplayMain from '../components/common/DisplayMain'
import DisplaySchedule from "../components/team/DisplaySchedule";
import AddResultSchedule from "../components/team/AddResultSchedule";
import Layout from '../components/layout/layout'
class scheduleManagement extends Component {
    render() {
        return (
            <Layout>
                <div>
                    <DisplayMain />
                    {/* <DisplaySchedule /> */}
                    <AddResultSchedule />
                </div>
            </Layout>

        )
    }
}
export default scheduleManagement;