import { Form, Row, Col, Input, Button, Icon } from 'antd';


class AddResultSchedule extends React.Component {

    // To generate mock Form.Item
    getFields() {
        const count = 6;
        const { getFieldDecorator } = this.props.form;
        const fieldName = ['Team A', 'Team B', 'Score', 'Yellow Number', 'Red Number'];
        const children = [];
        for (let i = 0; i < 4; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={fieldName[i]}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder" />)}
                    </Form.Item>
                </Col>,
            );
        }
       
        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    };

    handleReset = () => {
        this.props.form.resetFields();
    };
    render() {
        return (
            <div className="club-detail-infor">
                <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit infor
                        </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Clear
                        </Button>
                        </Col>
                    </Row>
                </Form>

            </div>

        );
    }
}

export default AddResultSchedule = Form.create()(AddResultSchedule);