import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'
import { Button, DatePicker, Form, Input, message, Modal, Radio, Select, Typography } from 'antd'
import { MinusOutlined, SearchOutlined, SwapOutlined } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import img from '../assets/retro-train.jpg'
import banner from '../assets/train_banner.png'
const { Text } = Typography;
const { Option } = Select;

export default function Home() {
    const [form] = Form.useForm();
    const [sourceCity, setSourceCity] = useState("");
    const [destinationCity, setDestinationCity] = useState();
    const [trainData, setTrainData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const [value, setLoginValue] = useState("mobile");
    const [messageApi, contextHolder] = message.useMessage();
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    let pattern1 = /^((?!0)\d{2}|0|\.\d{1,1})($&\.$|\.\d{1,1}$)/
    let pattern2 = /^((?!0)\d{1}|0|\.\d{1,1})($&\.$|\.\d{1,1}$)/
    let pattern3 = /^\d+$/
    let pattern4 = /^((?!0)\d{2}|0|\.\d{1,1})($&\.$|\.\d{2,2}$)/
    const error = () => {
        messageApi.open({
            type: 'error',
            content: `${errorMessage}`,
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: `${successMessage}`,
        });
    };

    const warning = useCallback(() => {
        messageApi.open({
            type: 'warning',
            content: 'source and destination cannot be same',
        });
    }, [messageApi]
    )

    const handleSwap = () => {
        setDestinationCity(sourceCity)
        setSourceCity(destinationCity)
    }

    window.addEventListener('popstate', () => {
        navigate('/')
    })

    const handleSearch = () => {
        setSearch(true)
        setFilteredData(trainData.filter(item => item.start === sourceCity && item.destination === destinationCity))
    }

    const style = {
        borderBottom: `5px solid red`,
        borderRadius: '10%',
    };

    const style1 = {
        borderBottom: `5px solid green`,
        borderRadius: '10%',
    };

    const cellRender = (current, info) => {
        if (info.type !== 'date') {
            return info.originNode;
        }
        if (typeof current === 'number' || typeof current === 'string') {
            return <div className="ant-picker-cell-inner">{current}</div>;
        }
        return (
            <div className="ant-picker-cell-inner" style={current.date() === 1 || current.date() === 15 || current.date() === 10 ? style : style1}>
                {current.date()}
            </div>
        );
    }

    const extraFooter = () => {
        return (
            <div className="ant-picker-cell-inner" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div><div style={{ height: "1px", width: "20px", borderBottom: '5px solid red' }}></div> Filled</div>
                <div><div style={{ height: "1px", width: "20px", borderBottom: '5px solid orange' }}></div> Filling</div>
                <div><div style={{ height: "1px", width: "20px", borderBottom: '5px solid green' }}></div> Available</div>
            </div>
        );
    }

    const handleSubmit = async (value) => {
        try {
            await axios.post("http://localhost:5000/user/sign-up", {
                username: value.name,
                email: value.email,
                password: value.password,
                mobile: value.mobile,
            })
            form.resetFields()
        }
        catch (err) {
            error()
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post("http://localhost:5000/user/sign-in", { email: values.email, password: values.password, mobile: values.mobile })
            if (response.data.success) {
                setSuccessMessage(response.data.message)
                success()
                localStorage.setItem("token", "stored")
                navigate('/filter-train')
            }
            else {
                setErrorMessage(response.data.message)
                error()
            }
        }
        catch (err) {
            setErrorMessage("Error occured")
            error()
        }
    };

    const onChangeValue = (e) => {
        setLoginValue(e.target.value);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+86</Option>
                <Option value="91">+91</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        async function fetchData() {
            let response = await axios.get("http://localhost:5000/train/getalltrain")
            setTrainData(response.data);
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (sourceCity.length !== 0 && sourceCity === destinationCity) {
            warning()
        }
    }, [sourceCity, destinationCity])

    return (
        <>
            {contextHolder}
            <div className='parent-nav'>
                <img src={img} alt="" height="65" />
                <div className='nav-options'>
                    <button>PNR status</button>
                    <button>Train running status</button>
                    <button>Print train ticket</button>
                    <button>Cancel train ticket</button>
                    <button onClick={showModal}>Login/Register</button>
                </div>
            </div>
            <div className='div-header'>
                <h1>Train ticket booking</h1>
            </div>
            <div
                style={{
                    padding: 24,
                    minHeight: 50,
                    background: 'rgb(237, 229, 216)'
                }}
            >
                <div className='filter-bar'>
                    <Select
                        value={sourceCity}
                        showSearch
                        style={{
                            width: 300,
                            height: 50,
                        }}
                        className='city-option'
                        placeholder="From"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: 'Chennai',
                                label: 'Chennai',
                            },
                            {
                                value: 'Coimbatore',
                                label: 'Coimbatore',
                            },
                            {
                                value: 'Banglore',
                                label: 'Banglore',
                            },
                            {
                                value: 'Delhi',
                                label: 'Delhi',
                            },
                            {
                                value: 'Trichy',
                                label: 'Trichy',
                            },
                            {
                                value: 'Madurai',
                                label: 'Madurai',
                            },
                        ]}
                        onChange={(e) => setSourceCity(e)}
                    />
                    <SwapOutlined style={{ border: '1px solid rgb(217, 217, 217)' }} onClick={handleSwap} />
                    <Select
                        value={destinationCity}
                        showSearch
                        style={{
                            width: 300,
                            height: 50
                        }}
                        placeholder="To"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={[
                            {
                                value: 'Chennai',
                                label: 'Chennai',
                            },
                            {
                                value: 'Coimbatore',
                                label: 'Coimbatore',
                            },
                            {
                                value: 'Banglore',
                                label: 'Banglore',
                            },
                            {
                                value: 'Delhi',
                                label: 'Delhi',
                            },
                            {
                                value: 'Trichy',
                                label: 'Trichy',
                            },
                            {
                                value: 'Madurai',
                                label: 'Madurai',
                            },
                        ]}
                        onChange={(e) => setDestinationCity(e)}
                    />
                    <DatePicker style={{
                        width: 300,
                        height: 50
                    }} cellRender={cellRender} renderExtraFooter={extraFooter} />
                    <Button style={{
                        width: 300,
                        height: 50
                    }} onClick={handleSearch} type="primary" icon={<SearchOutlined />}>
                        Search
                    </Button>

                </div>
                {filteredData.map(items => {
                    return <div>
                        <div className='main-train-details'>
                            <div className='train-details'>
                                <div><Text strong>{items.code} - {items.name}</Text></div>
                                <div>
                                    {items.availability.map(element => {
                                        return <Text type='success'>{element}</Text>
                                    })}

                                </div>
                            </div>
                            <div className='train-details'>
                                <div ><Text>{pattern4.test(items.arriving.toString()) && items.arriving}{pattern1.test(items.arriving.toString()) && items.arriving.toString().concat("0")} {pattern2.test(items.arriving.toString()) && items.arriving.toString().concat("0")} {pattern3.test(items.arriving.toString()) && items.arriving.toString().concat(".00")} {items.start} <MinusOutlined /> 08h 10m <MinusOutlined /> {pattern4.test(items.departure.toString()) && items.departure}{pattern1.test(items.departure.toString()) && items.departure.toString().concat("0")} {pattern2.test(items.departure.toString()) && items.departure.toString().concat("0")} {pattern3.test(items.departure.toString()) && items.departure.toString().concat(".00")} {items.destination}</Text></div>
                                <div><Text>View Schedule</Text></div>
                            </div>
                            <div className='avail-card'>
                                {items.seats.map(data => {
                                    return <div className='parent-train-avail'>
                                        <div onClick={showModal}>
                                            <div className='train-avail'>
                                                <div><Text>{data.class}</Text></div>
                                                <div><Text>₹{data.cost}</Text></div>
                                            </div>
                                            <div>{data.avail <= 0 ? <Text type="warning" style={{ marginLeft: 4 }} > PQWL51/31</Text> : <Text type="success" style={{ marginLeft: 4 }}> Availabe-{data.avail}</Text>}</div>
                                            <div>{data.avail <= 0 ? <Text type="warning" style={{ marginLeft: 4 }}> 50% Chance</Text> : <Text type="success" style={{ marginLeft: 4, fontSize: 12 }}>Availabe</Text>}</div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                })}
                {filteredData.length === 0 && search === true ? <div style={{ marginLeft: 500, marginTop: 25 }}><img src="https://www.westcomotors.com.au/site/user-assets/images/no-results.png" alt="" /></div> : null}

            </div>
            <Modal className='login-modal' title="Basic Modal" onCancel={handleCancel} open={isModalOpen} >
                <div className='modal'>
                    <img src={banner} alt="" height="450" />
                    {login ? <div>
                        <p style={{ marginLeft: 15 }} >Already have an account <p style={{ display: 'inline', color: 'blue', cursor: 'pointer' }} onClick={() => setLogin(false)}>SIGN IN</p></p>
                        <p style={{ marginLeft: 15, fontWeight: 'bolder', fontSize: 18, marginTop: 0, marginBottom: 0 }} >Create an account</p>
                        <Form
                            name="basic"
                            layout='vertical'
                            labelCol={{
                                span: 16,
                            }}
                            wrapperCol={{
                                span: 32,
                            }}
                            className='register-form'
                            initialValues={{
                                remember: true,
                                prefix: '91',
                            }}
                            form={form}
                            onFinish={(values) => handleSubmit(values)}

                        >

                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="mobile"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}

                                />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" block htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>

                        </Form>
                    </div> : <div>

                        <p style={{ marginLeft: 15 }} >Don't have an account <p style={{ display: 'inline', color: 'blue', cursor: 'pointer' }} onClick={() => setLogin(true)}>SIGN UP</p></p>
                        <h1 style={{ marginLeft: 15 }} >SIGN IN</h1>
                        <Form
                            name="basic"
                            layout='vertical'
                            labelCol={{
                                span: 16,
                            }}
                            wrapperCol={{
                                span: 32,
                            }}
                            className='register-form'
                            initialValues={{
                                remember: true,
                                prefix: '91',
                            }}
                            form={form}
                            onFinish={onFinish}
                        >
                            <Radio.Group style={{ marginLeft: 15 }} onChange={onChangeValue} value={value}>
                                <Radio value="mobile">Mobile</Radio>
                                <Radio value="email">Email</Radio>
                            </Radio.Group>
                            {value === 'mobile' ?
                                <>
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone number!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            addonBefore={prefixSelector}
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please enter your password',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                </>
                                : <>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your email!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </>}


                            <Form.Item>
                                <Button type="primary" block htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                            <p style={{ marginLeft: 15, textAlign: 'center', fontWeight: 'bolder' }} >OR</p>
                            <div style={{ marginLeft: 15 }} >
                                <GoogleLogin onSuccess={(CredentialReponse) => {
                                    localStorage.setItem("token", CredentialReponse.credential)
                                    navigate('/filter-train', { state: jwtDecode(CredentialReponse.credential) })
                                }}
                                    onError={() => {
                                        return;
                                    }
                                    }
                                />
                            </div>

                        </Form>
                    </div>}
                </div>
            </Modal>
        </>
    )
}
