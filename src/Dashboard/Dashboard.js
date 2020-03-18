import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import LatestBlock from './LatestBlock';
import SingleBlock from './SingleBlock';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Dashboard extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    componentDidMount(){
      document.title = "Blockchain | Dashboard"
    }

    logout = () => {
    	localStorage.clear();
    	window.location.href='/login';
    }   

    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }}>

                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}>
                        <div className="logo" />
                       
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <SubMenu
              key="sub1"
              title={
                <span>
              <AppstoreOutlined />
              <span>Blockchain</span>
                </span>
              }
            >
              <Menu.Item key="1">Latest Block<Link to="/dashboard/latestblock" /></Menu.Item>
              <Menu.Item key="2">Single Block<Link to="/dashboard/singleblock" /></Menu.Item>              
             
            </SubMenu>

            <Menu.Item key="7">Logout<Link to="#" onClick={this.logout} /></Menu.Item>
                        </Menu>

                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
                           Welcome Admin,                           
                        </Header>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Route exact path="/latestblocK" component={LatestBlock} />
                        <Route path="/dashboard/latestblock" component={LatestBlock} />
                        <Route path="/dashboard/singleblock" component={SingleBlock} />
                        </Content>
                        
                        <Footer style={{ textAlign: 'center' }}>Copyright © 2020 Chainyard. All Rights Reserved</Footer>

                    </Layout>

                </Layout>
            </Router>
        );
    }
}


export default Dashboard;
