import React, { useEffect, useState } from 'react';
import { Typography, Table, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import axios from "axios";
import { load } from '@cashfreepayments/cashfree-js';
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
const { Text } = Typography;

export default function Ticket() {
    const params = useParams();
    const navigate = useNavigate();
    const [bookedUser, setBookedUser] = useState([]);
    const [bookedTrainSeat, setBookedTrainSeat] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        location: "",
        date: "",
    });
    const [orderId, setOrderId] = useState("");

    const columns = [
        {
            title: 'Passenger',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
        },
        {
            title: 'Quota',
            dataIndex: 'quota',
            key: 'quota',
        },
    ];

    const data = bookedUser
        ? bookedUser.map(items => {
            return {
                name: items.name,
                class: items.seat ? items.seat.split(" ")[0] : "N/A",
                quota: "GN",
            }
        })
        : [];

    const amount = bookedUser?.reduce((partialSum, acc) => {
        return partialSum + Number(acc.seat.split(" ")[1])
    }, 0) || "N/A"

    const htmltoImage = async () => {
        const domElements = document.getElementsByClassName("comments-result");
        const arr = Array.from(domElements);
        const generateImage = async (domElement) => {
            const canvas = await html2canvas(domElement, {
                onclone: (document_1) => {
                    document_1.getElementById("innerDiv").style.display = "block";
                },
                windowWidth: 1600,
            });
            return canvas.toDataURL("image/jpeg", 1.0);
        };
        return Promise.all(arr.map((element) => generateImage(element)));
    };

    let cashfree;

    const initializeSDK = async () => {
        cashfree = await load({ mode: "sandbox" });
    };


    initializeSDK();


    const getSessionId = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/payment/${amount}`);
            if (res.data && res.data.payment_session_id) {
                setOrderId(res.data.order_id);
                return res.data.payment_session_id;
            }
        } catch (error) {
            return;
        }
    };

    const verifyPayment = async () => {
        try {
            const res = await axios.post("http://localhost:5000/verify", { orderId });
            if (res && res.data) {
                alert("Payment verified");
            }
        } catch (error) {
            return;
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const sessionId = await getSessionId();
            const checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            };
            cashfree.checkout(checkoutOptions).then(async () => {
                const updatedSeats = bookedTrainSeat?.seats?.map((seat) => {
                    if (bookedUser.some(item => seat?.class.includes(item.seat?.split(" ")[0]))) {
                        return { ...seat, avail: seat.avail - bookedUser.length };
                    }
                    return seat;
                });

                await axios.put(
                    `http://localhost:5000/train/updatetrainseats/${bookedTrainSeat._id}`,
                    {
                        ...bookedTrainSeat,
                        seats: updatedSeats,
                        bookedSeats: bookedTrainSeat.bookedSeats + bookedUser.length,
                    }
                );
                await htmltoImage();
                setFormData({ name: bookedUser.name })
                import("./pdfGenerator")
                    .then(async (module) => {
                        const PdfFile = module.default;
                        const doc = <PdfFile title="Personal Doc" data={formData} />;
                        const blob = await pdf(doc).toBlob();
                        saveAs(blob, "pdfdoc.pdf");
                    })
                    .catch((error) => {
                        return;
                    });
                navigate("/filter-train");
                verifyPayment();
            });
        } catch (error) {
            return;
        }
    };
    useEffect(() => {
        const fetchBookedUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/user/getallbooking");
                setBookedUser(data.filter(data => data.bookingid == params.id));
            } catch (error) {
                return;
            }
        };
        fetchBookedUser();
    }, [params.id]);

    useEffect(() => {
        const fetchTrain = () => {
            bookedUser?.forEach(async (item) => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/train/getbytraincode/${item.code}`);
                    setBookedTrainSeat(data);
                } catch (error) {
                    return;
                }
            })
        };
        fetchTrain();
    }, [bookedUser]);



    return (
        <div className='parent-div1'>
            <div className='id-div1'>
                <div>
                    <Text strong>Ticket Summary</Text>
                    <Text>{bookedUser[0]?.train} - {bookedUser[0]?.code}</Text>
                    <Text>{bookedUser[0]?.source} <ArrowRightOutlined /> {bookedUser[0]?.destination}</Text>
                </div>
                <div>
                    <Text>Available</Text>
                    <Text type='success'>GNWL178/WL52</Text>
                    <Text>Boarding Date: {bookedUser[0]?.date.split("T")[0]}</Text>
                </div>
            </div>
            <div className='id-div2'>
                <Text>Journey Date: {bookedUser[0]?.date.split("T")[0]}</Text>
            </div>
            <div className='id-div2'>
                <Table style={{ width: 600 }} columns={columns} dataSource={data} />
            </div>
            <div className='id-div2'>
                <Text strong>Pay Amount</Text>
                <Text strong>₹{amount}</Text>
            </div>
            <div className='id-div2'>
                <Button type='primary' onClick={handleClick} block>Proceed to pay</Button>
            </div>
        </div>
    );
}