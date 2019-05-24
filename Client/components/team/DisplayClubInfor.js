import { Pagination, Form, Card } from 'antd';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';

class DisplayClubInfor extends React.Component {
    // Use a constant here to keep track of number of cards per page

    constructor(props) {
        super(props);
        this.state = {
            minValue: 0,
            maxValue: 5,
            dataClub:{}
        };
    }
    async getClubInfor () {
        // eslint-disable-next-line no-undef
        const res = await fetch('http://localhost:8000/clubs/show')
        const json = await res.json()
        return { dataClub: json }
    }
    componentDidMount() {
        console.log("BUI NGOC TAI");
        this.getClubInfor()
        .then(data=>{
            this.setState({dataClub:data.dataClub});
            console.log(data);
        })

    }
    handleChange = value => {
        if (value <= 1) {
            this.setState({
                minValue: 0,
                maxValue: 5
            });
        } else {
            this.setState({
                minValue: this.state.maxValue,
                maxValue: value * 5
            });
        }
    };
    
    render() {
        
        let data =this.state.dataClub;
        console.log("data for get request:",data);
        return (
            <div className="club-infor">
                {data &&
                    data.length > 0 &&
                    data.slice(this.state.minValue, this.state.maxValue).map(val => (
                        <Card
                            title={"Team "+val.id}
                            extra={<a href="#">More</a>}
                            style={{ width: 300 }}
                        >
                            <p>{val.nameClub}</p>
                        </Card>
                    ))}
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={5}
                    onChange={this.handleChange}
                    total={15}
                />
            </div>
        )
    }
}

export default DisplayClubInfor = Form.create()(DisplayClubInfor);
