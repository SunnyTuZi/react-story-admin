import React from 'react';
import {getCode, login} from "../../services/apiList";
import './login.less';
import {connect} from "react-redux";
import {setAdmin, setToken} from "../../redux/actions";
import {setStore} from "../../until/localStorage";
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import {Link, withRouter} from 'react-router-dom';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {codeImg: ''};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values);
            }
        });

    }
    async login(data){
        let result = await login(data);
        if(result){
            this.props.setAdmin(result.data);
            this.props.setToken(result.token);
            setStore('adminInfo',result.data);
            setStore('token',result.token);
            this.props.history.push('/admin');
        }
    }
    async getCodeImg(){
        let result = await getCode();
        if(result){
           this.setState({
               codeImg:result.codeImg
           });
        }
    }

    componentWillMount(){
        this.getCodeImg();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form-box">
                <Form onSubmit={this.handleSubmit} className="login-form" key="00">
                    <FormItem>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input  prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="账号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('psw', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <div>
                                <Input  prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码"  />
                            </div>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <div>
                                <Input  prefix={<Icon type="safety" style={{ fontSize: 13 }} />} type="text" placeholder="验证码" className="code-inpt"  />
                                <img alt="验证码" className="code-img" src={this.state.codeImg}></img>
                            </div>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <Link className="login-form-forgot" to="">忘记密码</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                           登陆
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const Login = withRouter(Form.create()(NormalLoginForm));

export default connect(null,{setAdmin,setToken})(Login);
