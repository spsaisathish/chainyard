import React, { Component } from 'react';
import { Descriptions } from 'antd';
class LatestBlock extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          data: {},
          show_loading : false,         
          error_message: ''
        };        
    }
    getLatestBlock() {	  
      this.setState({loading:true});      
      fetch('/api/latestblock', {
        method: 'GET'       
      }).then(response => response.json())
        .then(item => {          
          if (item.hash) {
            window.localStorage.setItem('hash', item.hash);    
            this.setState({ data:item, loading:false});
          } else {
            this.setState({ data:{}, loading:false});
          }
        })
        .catch(err => console.log(err));
  
    }
    componentWillMount() {
      this.getLatestBlock();
    }
    render() {
      return(this.state.loading ?
        <div id="loadingContent">
          <img align="absmiddle" alt="" src="../images/loading.gif" />
        </div>:
        <Descriptions title="Latest Block" bordered>
        <Descriptions.Item label="Hash" span={2}>{this.state.data.hash}</Descriptions.Item>
        <Descriptions.Item label="Time">{this.state.data.time}</Descriptions.Item>
        <Descriptions.Item label="Block Index">{this.state.data.block_index}</Descriptions.Item>
        <Descriptions.Item label="Height">{this.state.data.height}</Descriptions.Item>
        <Descriptions.Item label="TxIndexes">
        {this.state.data.txIndexes}
        </Descriptions.Item>        
      </Descriptions>
      );
  }
}


export default LatestBlock;
