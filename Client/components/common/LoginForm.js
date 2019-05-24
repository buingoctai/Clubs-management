// // import { Form, Icon, Input, Button, Checkbox } from 'antd';

// // class LoginForm extends React.Component {
// //   handleSubmit = e => {
// //     e.preventDefault();
// //     this.props.form.validateFields((err, values) => {
// //       if (!err) {
// //         console.log('Received values of form: ', values);
// //       }
// //     });
// //   };

// //   render() {
// //     const { getFieldDecorator } = this.props.form;
// //     return (
// //       <Form onSubmit={this.handleSubmit} className="login-form">
// //         <Form.Item>
// //           {getFieldDecorator('username', {
// //             rules: [{ required: true, message: 'Please input your username!' }],
// //           })(
// //             <Input
// //               prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
// //               placeholder="Username"
// //             />,
// //           )}
// //         </Form.Item>
// //         <Form.Item>
// //           {getFieldDecorator('password', {
// //             rules: [{ required: true, message: 'Please input your Password!' }],
// //           })(
// //             <Input
// //               prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
// //               type="password"
// //               placeholder="Password"
// //             />,
// //           )}
// //         </Form.Item>
// //         <Form.Item>
// //           {getFieldDecorator('remember', {
// //             valuePropName: 'checked',
// //             initialValue: true,
// //           })(<Checkbox>Remember me</Checkbox>)}
// //           <a className="login-form-forgot" href="">
// //             Forgot password
// //           </a>
// //           <Button type="primary" htmlType="submit" className="login-form-button">
// //             Log in
// //           </Button>
// //           Or <a href="">register now!</a>
// //         </Form.Item>
// //       </Form>
// //     );
// //   }
// // }
// // export default LoginForm;
// import {
//   Form,
//   Select,
//   InputNumber,
//   DatePicker,
//   Switch,
//   Slider,
//   Button,
//   Input,
//   Icon
// } from 'antd'


// const FormItem = Form.Item
// const Option = Select.Option
// export default class LoginForm extends React.Component {
//   componentDidMount() {
//     // To disabled submit button at the beginning.
//     this.props.form.validateFields();
//   }

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields((err, values) => {
//       if (!err) {
//         console.log('Received values of form: ', values);
//       }
//     });
//   };
//   render() {
//     const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
//     const usernameError = isFieldTouched('username') && getFieldError('username');
//     const passwordError = isFieldTouched('password') && getFieldError('password');
//     return (
//       <div style={{ marginTop: 100 }}>
//         <Form layout='horizontal'>
//           <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''>
//             {getFieldDecorator('username', {
//               rules: [{ required: true, message: 'Please input your username!' }],
//             })(
//               <Input
//                 prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                 placeholder="Username"
//               />,
//             )}
//           </Form.Item>
//           <FormItem
//             label='DatePicker'
//             labelCol={{ span: 8 }}
//             wrapperCol={{ span: 8 }}
//           >
//             <DatePicker name='startDate' />
//           </FormItem>
//           <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
//             <Button size='large' type='primary' htmlType='submit'>
//               OK
//         </Button>
//             <Button size='large' style={{ marginLeft: 8 }}>
//               Cancel
//         </Button>
//           </FormItem>
//         </Form>
//       </div>
//     );
//   }
// }


// import React, { Component } from 'react';
// import { Form, Input, Button } from 'antd';
// const FormItem = Form.Item;
// class LoginForm extends Component{
//     handleSubmit = (e) => {
//         // 阻止事件冒泡
//         e.preventDefault();
//         var formData = this.props.form.getFieldsValue();
//         console.log(formData);
//     };
//     render()  {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form layout="horizontal" onSubmit={this.handleSubmit}>
//                 <FormItem label="Account">
//                     <Input placeholder="please input the account"
//                         {...getFieldDecorator('userName')}/>
//                 </FormItem>
//                 <FormItem label="Password">
//                     <Input type="password" placeholder="Please input the pasword"
//                         {...getFieldDecorator('passWord')}/>
//                 </FormItem>
//                 <Button type="primary" htmlType="submit">Submit</Button>
//             </Form>
//         );
//     }
// }
// export default LoginForm = Form.create()(LoginForm);

import { Form, Icon, Input, Button, Checkbox } from 'antd';

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    );
  }
}
export default LoginForm = Form.create()(LoginForm);
