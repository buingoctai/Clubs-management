import { Form, Input, Icon, Button, Alert, InputNumber } from 'antd';
import { number } from 'prop-types';
import fetch from 'isomorphic-unfetch';
import {connect} from 'react-redux';
import {UpdateDisplay} from '../../redux/actions/actions';

function mapDispatchToProps(dispatch){
    return{
        updateVisible:(res)=>{dispatch(UpdateDisplay(res))}
    }
}
let id = 0;

class ClubInfor extends React.Component {
    constructor(){
        super();
        this.state={
            starts:0
        };
    }

    async getData () {
        // eslint-disable-next-line no-undef
        const res = await fetch('https://api.github.com/repos/zeit/next.js')
        const json = await res.json()
        return { starts: json.id }
    }
    
   
    componentDidMount() {
        console.log("BUI NGOC TAI");
        this.getData()
        .then(data=>{
            this.setState({starts:data.starts});
            console.log(data);
        })

    }
    async postClubInfor(data){
        fetch("http://localhost:8000/clubs/addclubs",{
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
    
    //-----------------
    state = {
        disabled: true,
    };

    toggle = (value) => {
        this.setState({
            disabled: !this.state.disabled,
        });
    };
   
    //---------------------
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        console.log("props=",this.props);
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);

        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("values=",values);
                const { keys, FullName,ShortName } = values;
                // console.log('Received values of form: ', values);
                // console.log('Merged values:', keys.map(key => names[key]));
                // this.postClubInfor(FullName[0],ShortName[0]);
                var clubData=[];
                for(var i=0;i<FullName.length;i++){
                    clubData.push({"nameClub":FullName[i],"shortName":ShortName[i]});
                }
                //const data=[{"nameClub":"fc hanoi","shortName":"barca"},{"nameClub":"fc haiphong","shortName":"hp"},{"nameClub":"fc dong tam long an","shortName":"dtla"}];
               
                this.postClubInfor(clubData);
                this.props.updateVisible(1);
            }
            
        });
        
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        console.log("keys=",keys);
        const formItems = keys.map((k, index) => (
            <Form.Item

                {...(index === 0 ? formItemLayout : formItemLayout)}
                label={index === 0 ? 'Nhập thông tin đội bóng số' : 'Nhập thông tin đội bóng số'}
                required={false}
                key={k}
            >
                <Alert message={index} type="info" />
                {getFieldDecorator(`FullName[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })
                (
                    <Input placeholder="FullName" style={{ width: '60%', marginRight: 8 }} />
                )}
                {getFieldDecorator(`ShortName[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: "Please input passenger's name or delete this field.",
                        },
                    ],
                })
                (
                    <Input placeholder="ShortName" style={{ width: '60%', marginRight: 8 }} />
                )
                }

                
                
                {keys.length > 0 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <div>
                <div>
                    <InputNumber min={1} max={10} disabled={this.state.disabled} onChange={this.onChange} defaultValue={3} />
                    <div style={{ marginTop: 20 }}>
                        <Button onClick={this.toggle} type="primary">
                            Club number
                        </Button>
                    </div>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        {formItems}
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                                <Icon type="plus" /> Add Team
                            </Button>
                        </Form.Item>
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>                                                                                                                                                            
                </div>

                <div>
                    <ul>
                        <li>{this.state.starts}</li>
                    </ul>
                </div>
            </div>
        )
    }
}
const SubmitClubInfor = Form.create()(ClubInfor);
const AddClubInfor =connect(null,mapDispatchToProps)(SubmitClubInfor)
export default AddClubInfor