import { Pagination, Form, Card } from 'antd';


class DisplaySchedule extends React.Component {
    // Use a constant here to keep track of number of cards per page

    constructor(props) {
        super(props);
        this.state = {
            minValue: 0,
            maxValue: 5
        };
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
        let count=1;
        let data = [
            { title: "Match 1", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 2", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 3", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 4", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 5", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 6", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 7", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 8", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 9", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 10", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 11", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 12", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 13", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 14", value: "FC Barcelona vs FC Real Marrid" },
            { title: "Match 15", value: "FC Barcelona vs FC Real Marrid" }
        ];
        return (
            <div className="club-infor">
                {data &&
                    data.length > 0 &&
                    data.slice(this.state.minValue, this.state.maxValue).map(val => (
                 
                        
                        <Card
                            title={val.title}
                            extra={<a href="#">More</a>}
                            style={{ width: 300 }}
                        >
                            <p>{val.value}</p>
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
export default DisplaySchedule = Form.create()(DisplaySchedule);