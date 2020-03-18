import React, { Component } from 'react';
import { Descriptions, Table, Modal } from 'antd';
class SingleBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            show_loading : false,         
            error_message: '',
            visibleTransaction: false,
            singleTransaction: {},
            modalTitle :'',
        }; 
    }
    columns = [
        {
          title: 'Hash',
          dataIndex: 'hash',
          key: 'hash',
        },
        {
          title: 'Version',
          dataIndex: 'ver',
          key: 'ver',
        },
        {
          title: 'Vin Size',
          dataIndex: 'vin_sz',
          key: 'vin_sz',
        },
        {
            title: 'Vout Size',
            dataIndex: 'vout_sz',
            key: 'vout_sz',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Weight',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },      
        
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
              <span>                
                <a id={record.hash} onClick={this.viewSingleTransaction.bind(record.hash)}>View Transaction</a>
              </span>
            ),
          }
    ];

    outColumns = [
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Addr',
            dataIndex: 'addr',
            key: 'addr',
          },
        {
          title: 'Script',
          dataIndex: 'script',
          key: 'script',
        },
    ]

    handleOk = e => {
        console.log(e);
        this.setState({
            visibleTransaction: false,
        });
      };
    
    handleCancel = e => {
        console.log(e);
        this.setState({
            visibleTransaction: false,
        });
    };

    getSingleBlock() {	  
        this.setState({loading:true});
        const latestBlockHash =  window.localStorage.getItem('hash');  
        fetch(process.env.REACT_APP_API_ENDPOINT + '/rawblock?hash=' +latestBlockHash, {
          method: 'GET'       
        }).then(response => response.json())
          .then(item => {        
            console.log(item)    
            if (item.hash) {            
              this.setState({ data:item, loading:false});              
            } else {
              this.setState({ data:{}, loading:false});
            }
          })
          .catch(err => console.log(err));
    
      }

    viewSingleTransaction = (e) => {	
        const hash = e.target.id;
        this.setState({loading:true, modalTitle : 'Hash : '+ hash });      
        fetch(process.env.REACT_APP_API_ENDPOINT + '/rawtx?hash='+ hash, {
          method: 'GET'       
        }).then(response => response.json())
          .then(item => {        
            console.log(item)    
            if (item.hash) {            
              this.setState({ visibleTransaction: true, singleTransaction:item, loading:false});              
            } else {
              this.setState({ singleTransaction:{}, loading:false});
            }
          })
          .catch(err => console.log(err));
    
      } 
    componentWillMount() {
        this.getSingleBlock();
    }
    render() {
        return(this.state.loading ?
          <div id="loadingContent">
            <img align="absmiddle" alt="" src="../images/loading.gif" />
          </div>:
          <div>
            <Descriptions title="Single Block" bordered>
                <Descriptions.Item label="Hash" span={2}>{this.state.data.hash}</Descriptions.Item>
                <Descriptions.Item label="Time">{this.state.data.time}</Descriptions.Item>
                <Descriptions.Item label="Block Index">{this.state.data.block_index}</Descriptions.Item>
                <Descriptions.Item label="Height">{this.state.data.height}</Descriptions.Item>
                <Descriptions.Item label="Version">{this.state.data.ver}</Descriptions.Item>
                <Descriptions.Item label="Prev_block">{this.state.data.prev_block}</Descriptions.Item>
                <Descriptions.Item label="Mrkl_root">{this.state.data.mrkl_root}</Descriptions.Item>
                <Descriptions.Item label="Nonce">{this.state.data.nonce}</Descriptions.Item>
                <Descriptions.Item label="Size">{this.state.data.size}</Descriptions.Item>
                <Descriptions.Item label="Main_chain">{this.state.data.main_chain}</Descriptions.Item>
                <Descriptions.Item label="Received_time">{this.state.data.received_time}</Descriptions.Item>
                <Descriptions.Item label="Relayed_by">{this.state.data.relayed_by}</Descriptions.Item>
                <Descriptions.Item label="Weight">{this.state.data.weight}</Descriptions.Item>          
            </Descriptions>
            <br></br>
            <h3>Tx Details</h3>
            <Table dataSource={this.state.data['tx']} columns={this.columns}></Table>
            <Modal
            title={this.state.modalTitle}
            visible={this.state.visibleTransaction}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            cancelText = 'Close'
            width="100"
                >
               <Descriptions title="Single Trasaction" bordered>
                    <Descriptions.Item label="Hash">{this.state.singleTransaction.hash}</Descriptions.Item>
                    <Descriptions.Item label="Version">{this.state.singleTransaction.ver}</Descriptions.Item>
                    <Descriptions.Item label="Vin Size">{this.state.singleTransaction.vin_sz}</Descriptions.Item>
                    <Descriptions.Item label="Vout Size">{this.state.singleTransaction.vout_sz}</Descriptions.Item>
                    <Descriptions.Item label="Lock time">{this.state.singleTransaction.lock_time}</Descriptions.Item>
                    <Descriptions.Item label="Size">{this.state.singleTransaction.size}</Descriptions.Item>
                    <Descriptions.Item label="Tx Index">{this.state.singleTransaction.tx_index}</Descriptions.Item>                   
                </Descriptions>
                <br></br>
            <h3>Output Details</h3>
            <Table dataSource={this.state.singleTransaction['out']} columns={this.outColumns}></Table>
            </Modal>
          </div>         
        );
    }
}


export default SingleBlock;
