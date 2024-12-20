import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Typography, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Text } = Typography;
const { Option } = Select

export default function Passenger() {
    const params = useParams()
    const [form] = Form.useForm();
    const [filteredTrain, setFilteredTrain] = useState()
    const [value, setValue] = useState([]);
    const [date, setDate] = useState(new Date());
    const [passenger, setPassenger] = useState([1])
    const [messageApi, contextHolder] = message.useMessage();
    const [id, setId] = useState("")
    const navigate = useNavigate()

    const bookingWarning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Booking available for only 4 passenger',
        });
    };

    const onFinish = (values) => {
        setValue([...value, values])
    };
    console.log('value', value);


    const onFinishContactDetails = (values) => {
        setValue(value.map((obj) => (
            {
                ...obj,
                mobile: values.mobile,
                email: values.email
            }
        )))
    };

    const onChangeCancellation = (values) => {

    }
    const handleDelete = (index) => {
        value.splice(index, 1)
        console.log('value', value);
    }

    const handleDate = (value, dateString) => {
        setDate(dateString)
    }

    const handlePassenger = () => {
        if (passenger.length > 3) {
            return bookingWarning()
        }
        setPassenger([...passenger, 1])
    }

    const disabledDate = (current) => {
        return current.isBefore(moment().subtract(1, "day"))
    };

    let randomId = Math.floor(100000 + Math.random() * 900000)
    console.log('date',date);
    
    const handleProceed = async () => {
        try {
            value.forEach(async (value) => {
                const postResponse = await axios.post("http://localhost:5000/user/book-user", {
                    name: value.username, gender: value.gender, age: value.age, berth: value.berth, mobile: value.mobile, email: value.email, bookingid: randomId, source: filteredTrain.start,
                    destination: filteredTrain.destination,
                    train: filteredTrain.name,
                    seat: value.seat,
                    code: filteredTrain.code,
                    date:value.date
                })
                navigate(`/ticket-summary/${postResponse.data.data.bookingid}`)
            })
        }
        catch (err) {
            return;
        }
    }
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:5000/train/getbyid/${params.id}`)
            setFilteredTrain(response.data)
        }
        fetchData()
    }, [params.id])

    return (
        <div className='parent-div'>Passenger Details
            {contextHolder}
            <div className='id-div'>
                <Text strong style={{ margin: 8 }}>IRCTC ID</Text>
                <Text style={{ margin: 8 }}>sasi123</Text>
            </div>
            <div className='id-div'>
                <Text strong style={{ margin: 8 }}>BOARDING POINT</Text>
                <Text style={{ margin: 8 }}>{filteredTrain?.start}, {filteredTrain?.arriving}</Text>
            </div>
            <div className='id-div'>
                <Text strong style={{ margin: 8 }}>PASSENGER DETAILS</Text>
                {
                    passenger.map((x, index) => (
                        <Form
                            // form={form}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            style={{ margin: 8 }}
                            onFinish={onFinish}
                            layout='vertical'
                            key={index}
                        >
                            <Form.Item
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select gender!',
                                    },
                                ]}
                            >
                                <Radio.Group style={{ margin: 8 }}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="transgender">Transgender</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter username',
                                    },
                                ]}
                            >
                                <Input placeholder='Enter the username' />
                            </Form.Item>
                            <Form.Item
                                label="Age"
                                name="age"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your age',
                                    },
                                ]}
                            >
                                <Input placeholder='Enter the age' />
                            </Form.Item>
                            <Form.Item
                                name="berth"
                                label="Berth Preference"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the berth'
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a berth preference"
                                    allowClear
                                >
                                    <Option value="no">No Berth Preference</Option>
                                    <Option value="lower">Lower</Option>
                                    <Option value="middle">Middle</Option>
                                    <Option value="upper">Upper</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="nation"
                                label="Nationality"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select your nation"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a Nation"
                                    allowClear
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter the nation'
                                        },
                                    ]}
                                >
                                    <Option value="India">India</Option>
                                    <Option value="Singapore">Singapore</Option>
                                    <Option value="Dubai">Dubai</Option>
                                    <Option value="Thailand">Thailand</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="date"
                                label="Journey date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the date'
                                    },
                                ]}
                            >
                                <DatePicker onChange={handleDate} disabledDate={disabledDate} format={'DD/MM/YYYY'} />
                            </Form.Item>
                            <Form.Item
                                name="seat"
                                label="Seat"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please select your nation"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a seat"
                                    allowClear
                                >
                                    {filteredTrain?.seats.map(item => {
                                        return <Option value={`${item.class} ${item.cost}`}>{item.class} ₹{item.cost}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item className='button-div' label={null}>
                                <Button htmlType="reset" onClick={() => handleDelete(index)} danger>
                                    Delete
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                                <Button type="primary" onClick={handlePassenger}>
                                    Add Passenger
                                </Button>
                            </Form.Item>
                        </Form>
                    ))
                }

            </div>
            <div className='id-div'>
                <Text strong style={{ margin: 8 }}>CONTACT DETAILS
                </Text>
                <Text style={{ margin: 8 }}>Your tickets will be sent to the below details
                </Text>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{ margin: 8 }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishContactDetails}
                    layout='vertical'
                >
                    <Form.Item
                        label="Mobile Number"
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mobile number!',
                            },
                        ]}
                    >
                        <Input placeholder='Enter the mobile number' />
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
                        <Input placeholder='Enter the email' />
                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='id-div'>
                <Text style={{ margin: 8 }} strong>FREE CANCELLATION</Text>
                <Radio.Group style={{ margin: 8 }} onChange={onChangeCancellation}>
                    <Space direction="vertical">
                        <Radio value="yes">Pay no charges when ticket is cancelled</Radio>
                        <Radio value="no">No: I don't want free cancellation</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className='id-div'>
                <Text style={{ margin: 8 }} strong>ADDRESS</Text>
                <Text style={{ margin: 8 }}>Address is mandatory as per the latest government rules</Text>
                <Text style={{ margin: 8 }}>Edapalayam , Chennai, Tamil Nadu, 600003
                </Text>
            </div>
            <div className='id-div'>
                <Checkbox style={{ margin: 8 }}>  <Text strong>I agree to the  CANCELLATION & REFUND POLICY</Text></Checkbox>
            </div>
            <div className='id-div'>
                <Button type='primary' onClick={handleProceed}>Proceed</Button>
            </div>
        </div>
    )
}
