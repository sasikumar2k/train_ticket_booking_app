import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate('/')
    }
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:5000/user/getallbooking")
            setData(response.data)
        }
        fetchData()
    }, [])
    return (
        <div class="container bg-white mt-5 mb-5">
            <div class="row" style={{display:'flex',justifyContent:'space-evenly'}}>
                <div>
                    <div class="d-flex text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><div class="font-weight-bold">Sasikumar</div><span class="text-black-50">sasi@gmail.com</span><span> <Button type="primary" danger onClick={handleLogout}>Logout</Button></span></div>
                </div>
                <div>
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right ms-5">Ticket booking history</h4>
                        </div>
                        {data.map(item => {
                            return <div class="container">
                                <div class="card mt-4 active pb-0 ">
                                    <div class="p-2">
                                        <div class="row" style={{ width: 550, border: '1px solid black', marginTop: 10, marginLeft: 10,padding:15 }}>
                                            <div class="col-12 ">
                                                <b>{item.train} - {item.code}</b>
                                                <h4 style={{ display: 'inline', marginLeft: 100 }}>booking id:{item.bookingid}</h4>
                                                <p className='mb-1'>{item.source} <ArrowRightOutlined /> {item.destination}  <h5 style={{ display: 'inline', marginLeft: 115 }}>Date:{item?.date}</h5></p>
                                            </div>
                                            <div class="col">
                                                <p class="card-subtitle mb-2 " style={{ display: 'inline' }}>
                                                    berth: {item.berth}
                                                </p>
                                                <p style={{ display: 'inline', marginLeft: 200 }}>Seat type:{item.seat.split(" ")[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
