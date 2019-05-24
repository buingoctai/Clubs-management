import { Form, Row, Col, Input, Button, Icon } from 'antd';


class DisplayClubDetailInfor extends React.Component {

    // To generate mock Form.Item
    getFields() {
        const count = 6;
        const { getFieldDecorator } = this.props.form;
        const fieldName = ['Club Name', 'short Name', 'Stadium', 'Place', 'President', 'Founded'];
        const children = [];
        for (let i = 0; i < 6; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <Form.Item label={fieldName[i]}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [
                                {
                                    // required: true,
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
    async postDetailClubInfor(data){
        fetch("http://localhost:8000/clubs/1/adddetailclubs",{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                data:data
            })
        })
        .then(res=>{
            if (res.status != 200) {
                dispatch(setError(res.status + '===>' + res.statusText + '===>' + res.url))
            }
            return response.json();
        })
        .then(json=>{
            dispatch(setData(json, q))
        })
        .catch(err=>{
            console.log(err);
        })
    }


    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const detailData={"shortName":values['field-1'],"nameClub":values['field-0'],"stadium":values['field-2'],"place":values['field-3'],"president":values['field-4'],"founded":values['field-5']}
            this.postDetailClubInfor(detailData);
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

export default DisplayClubDetailInfor = Form.create()(DisplayClubDetailInfor);