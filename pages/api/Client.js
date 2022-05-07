import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css'
import { addClient } from './addClient';

import axios from 'axios'
import Link from 'next/link';
import {Table,
        TableBody,
        TableCell,
        TableContainer,
        TableHead,TableRow} from '@mui/material';
import {Form,
        Skeleton,
        Modal,
        Input,
        Button,
        Card,
        Row,
        Divider,
        message,
        Select,
        Layout,
        Popconfirm } from 'antd';
import { width } from "@mui/system";

const array=[]
const App = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    message.error('Canceled');
  };

  const { Header, Content,  Sider  } = Layout;
  const [contacts, setContacts] = useState(array)
    const [clientName, setclientName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [website, setWebsite] = useState('')
    const [phone, setPhone] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [imageUrl,setImageUrl]=useState()
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [users, setUsers] = useState([]);
    const {Option}=Select;

  const fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/adventurus/admin/listclients`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleClick=(e) =>{
    e.preventDefault()
    const data = {
      id: "",
        clientName : clientName,
        city : city,
        state:state,
        website : website,
        phone : phone,
        userName: userName,
        emailAddress: emailAddress,
        password:password,
        imageUrl :imageUrl
    };

    array.push({fetchData})
      console.log(array);
      const newContact = [{
        id: "",
        clientName : clientName,
        city : city,
        state:state,
        website : website,
        phone : phone,
        userName: userName,
        emailAddress: emailAddress
      }]
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);


    addClient(data)
    .then((response) => {
      let responseMessage = response.responseMessage;
      if (response.statusCode === 200 ) {
        message.success({ content: responseMessage, key: 'updatable' })
      } else {
        message.error({ content: responseMessage, key: 'updatable' })
      }
    })
    .catch((err) => {
      message.error(err)
    })
    }
    useEffect(() => {
      fetchData()
    })

    function cancel(e) {
      console.log(e);
      message.error('Canceled');
    }

    function deleteUser(clientName) {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/adventurus/admin/deleteclient?clientName=${clientName}`, {
        method: 'DELETE'
      }).then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          fetchData()
        })
      })
    }

    function selectUser(id)
    {
      console.log(id);
      console.log(users);
      let item=users[id];
          setclientName(item.clientName)
          setEmailAddress(item.emailAddress)
          setPhone(item.phone);
          setWebsite(item.website)
          setCity(item.city)
          setState(item.state)
          setImageUrl(item.imageUrl)
          setIsModalVisible(true);
    }

    const updateUser =async() => {
      setIsModalVisible(false);
      message.success('Edited');
      return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/adventurus/admin/modifyclient?city=${city}&clientName=${clientName}&emailAddress=${emailAddress}&imageUrl=${imageUrl}&phone=${phone}&state=${state}&website=${website}`, {
        method: "PUT",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }).then((response) => response.json());
    };


  return (
<div>
    <Header style={{ backgroundColor:'#F6F6F6'}}>
        <div>
        <b style={{fontSize:25}} >New Client</b>
        </div>
    </Header>
    <Layout style={{ backgroundColor:'#EEECED'}}>
    <Content
      className="bg"
      style={{
        padding: 56,
        height:600,
        marginLeft:200,
        backgroundColor:'#EEECED',
      }}>
         <div >
        <Card style={{width:200,height:200,borderRadius:10,marginLeft:-200,marginTop:50}}>
          <Skeleton.Image style={{marginLeft:25,marginTop:25}}/>
        </Card>
          </div>
           <div style={{marginTop:-235,marginLeft:35}} >
           <Divider orientation='left' orientationMargin="0" ><p style={{opacity:0.4}}>Client Details</p></Divider>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7 xs:gap-y-10 mt-6"></div></div>
        <Form onSubmit={handleClick}>
      <Row>
        <Input label="Client Name *" placeholder='Client Name'  style={{width:250,height:30,marginLeft:35}} type="text" required   onChange={(e)=>setclientName(e.target.value)} />
      <Form.Item label=""  style={{width:250,height:30,marginLeft:35}}>
         <Select
           placeholder="City"
          value={city}
          onChange={(e)=> {
           setCity(e)
          }}
        >
          <Option value="Chennai">Chennai</Option>
          <Option value="tuticorin">tuticorin</Option>
        </Select>
        </Form.Item>
         <Form.Item label=""  style={{width:250,height:30,marginLeft:35}}>
        <Select
          placeholder="State"
          value={state}
          onChange={(e)=> {
           setState(e)
          }}
        >
            <Option value="TamilNadu">TamilNadu</Option>
            <Option value="Kerala">Kerala</Option>
            <Option value="Karnataka">Karnataka</Option>
        </Select>
        </Form.Item>
        </Row><br/>
        <Row>
        <Input label="Website *"  style={{width:250,height:30,marginLeft:35}} type="text" placeholder='website'  required   onChange={(e)=>setWebsite(e.target.value)} />
        <Input label="Contact *"  style={{width:250,height:30,marginLeft:35}} type="number" required  placeholder='Contact' onChange={(e)=>setPhone(e.target.value)} />
        <Input label="Mail id *"  style={{width:250,height:30,marginLeft:35}} type="text" required   placeholder='Email'  onChange={(e)=>setEmailAddress(e.target.value)} />
        </Row><br/>
        <div style={{marginLeft:35}}>
        <Divider orientation='left' orientationMargin="0" ><p style={{opacity:0.4}}>Login Details</p></Divider>
        </div>
        <Row>
        <Input label="UserName *"  style={{width:250,height:30,marginLeft:35}} type="text" required   placeholder='UserName' onChange={(e)=>setUserName(e.target.value)} />
        <Input label="Password *"  style={{width:250,height:30,marginLeft:35}} type="password" required   placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
        <Input label="Confirm Password *"  style={{width:250,height:30,marginLeft:35}} type="password" required   placeholder='Confirm Password'   onChange={(e)=>setConfirmPass(e.target.value)} />
        </Row><br/><br/>
      <Form.Item  style={{width:200}}>
      <Button  type="submit" variant="contained" style={{marginLeft:390}}onClick={handleClick}>submit</Button>
      </Form.Item>
    </Form>
<TableContainer>
      <Table sx={{ minWidth: 650  }}
      size="small"
      aria-label="a dense table">
        <TableHead style={{backgroundColor:"gray"}}>
          <TableRow >
          <TableCell align="center">S.No</TableCell>
            <TableCell align="center">clientName</TableCell>
            <TableCell align="center">city</TableCell>
            <TableCell align="center">state</TableCell>
            <TableCell align="center">website</TableCell>
            <TableCell align="center">Contact</TableCell>
            <TableCell align="center">mail</TableCell>
            <TableCell align="right" >Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((item,index) => {
            return(
              <TableRow key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center" >{item.clientName}</TableCell>
              <TableCell align="center">{item.city}</TableCell>
              <TableCell align="center">{item.state}</TableCell>
              <TableCell align="center">{item.website}</TableCell>
              <TableCell align="center">{item.phone}</TableCell>
              <TableCell align="center">{item.emailAddress}</TableCell>
              <TableCell align="right">
              {(  <div>
                   <Popconfirm
                   title="Are you sure to delete this Client?"
                   onConfirm={()=>deleteUser(item.clientName)}
                   onCancel={cancel}
                   okText="Yes"
                   cancelText="No"
                 >
                   <Button href="#">Delete</Button>
                 </Popconfirm>
                 <div>
                 <Button type="primary" onClick={() => selectUser(index)}>
                 Edit
               </Button>
               <Modal title="Basic Modal" visible={isModalVisible} onOk={updateUser} onCancel={handleCancel}>
                  <Form className="flex flex-wrap md:flex-nowrap mt-14 gap-x-14 mb-14">
               <Row>
                 <Input label="Client Name *" value={clientName} style={{width:200,height:30,marginLeft:30}} type="text" required placeholder='cleintname'  onChange={(e)=>setclientName(e.target.value)} />
               <Form.Item label="" style={{width:200,height:30,marginLeft:30}}>
                 <Select
                   placeholder="City"
                   value={city}
                   onChange={(e)=> {
                   setCity(e)
                   }}
                 >
                  <Option value="Chennai">Chennai</Option>
                  <Option value="tuticorin">tuticorin</Option>
                 </Select>
                 </Form.Item>
                 <Form.Item label=""  style={{width:200,height:30,marginLeft:30}}>
                 <Select
                   placeholder="State"
                   value={state}
                   onChange={(e)=> {
                   setState(e)
                   }}
                 >
                   <Option value="TamilNadu">TamilNadu</Option>
                   <Option value="Kerala">Kerala</Option>
                   <Option value="Karnataka">Karnataka</Option>
                 </Select>
                 </Form.Item>
                 </Row><br/>
                 <Row>
                 <Input label="Website *"  style={{width:200,height:30,marginLeft:30}} placeholder='Website' type="text" required value={website}  onChange={(e)=>setWebsite(e.target.value)} />
                 <Input label="Contact *"  style={{width:200,height:30,marginLeft:30}}  type="text" placeholder='mail' required  value={emailAddress} onChange={(e)=>setEmailAddress(e.target.value)} />
                 <Input label="Mail id *"  style={{width:200,height:30,marginLeft:30}} type="text" placeholder='phone' required  value={phone} onChange={(e)=>setPhone(e.target.value)} />
                 </Row><br/>
                 <Divider orientation='left' orientationMargin="0" className='!text-[13px] font-semibold !text-gray-400 !mt-12'>Login Details</Divider><br/>
                 <Row>
                 <Input label="username *"  style={{width:200,height:30,marginLeft:30}} type="text" required value={userName} placeholder='username'
                 onChange={(e)=>setUserName(e.target.value)}
                 />
                 <Input label=" password *"  style={{width:200,height:30,marginLeft:30}} type="" required value={password}  placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
                 <Input label=" imageUrl *"  style={{width:200,height:30,marginLeft:30}} type="" required value={imageUrl}  onChange={(e)=>setImageUrl(e.target.value)} />
                 </Row><br/><br/>
                 </Form>
               </Modal>
               </div>
               </div>
                    )}
            </TableCell>
            </TableRow>
          )})
            }
        </TableBody>
      </Table>
    </TableContainer>
    </Content>
    </Layout>
    </div>
  );
};
export default App;