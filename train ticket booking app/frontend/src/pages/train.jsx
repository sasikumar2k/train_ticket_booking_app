import { MinusOutlined, SearchOutlined, SwapOutlined, UserOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, Flex, Layout, Menu, Radio, Select, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Sider } = Layout;
const { Text } = Typography;


export default function Train() {
  const [quotaValue, setQuotaValue] = useState();
  const [sourceCity, setSourceCity] = useState("");
  const [destinationCity, setDestinationCity] = useState();
  const [arrivalTimeValue, setArrivalTimeValue] = useState();
  const [classValue, setClassValue] = useState();
  const [departureTimeValue, setDepartureTimeValue] = useState();
  const [trainData, setTrainData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [search, setSearch] = useState(false)
  const navigate = useNavigate()
  let pattern1 = /^((?!0)\d{2}|0|\.\d{1,1})($&\.$|\.\d{1,1}$)/
  let pattern2 = /^((?!0)\d{1}|0|\.\d{1,1})($&\.$|\.\d{1,1}$)/
  let pattern3 = /^\d+$/
  let pattern4 = /^((?!0)\d{2}|0|\.\d{1,1})($&\.$|\.\d{2,2}$)/

  window.addEventListener('popstate', () => {
    navigate('/filter-train')
  })

  const handleSwap = () => {
    if (sourceCity.length === 0) {
      return alert('Enter the valid source')
    }
    setDestinationCity(sourceCity)
    setSourceCity(destinationCity)
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

  const handleSearch = () => {
    if (sourceCity === destinationCity) {
      return search;
    }
    setSearch(true)
    setFilteredData(trainData.filter(item => item.start === sourceCity && item.destination === destinationCity))
  }

  const onChange = (date, dateString) => {
  };

  const onChangeQuota = (e) => {
    setQuotaValue(e.target.value);
  };

  const onChangeArrivalTime = (e) => {
    setArrivalTimeValue(e.target.value);
  };

  const onChangeDepartureTime = (e) => {
    setDepartureTimeValue(e.target.value);
  };

  const onChangeClass = (e) => {
    setClassValue(e.target.value);
  };

  useEffect(() => {
    setFilteredData(trainData.filter(item => item.quota === quotaValue || item.classes.includes(classValue) || item.arriving >= arrivalTimeValue?.split("-")[0] && item.arriving <= arrivalTimeValue?.split("-")[1] || item.departure >= departureTimeValue?.split("-")[0] && item.departure <= departureTimeValue?.split("-")[1]))
  }, [quotaValue, classValue, arrivalTimeValue, departureTimeValue])

  useEffect(() => {
    if (sourceCity.length !== 0 && sourceCity === destinationCity) {
      setSearch(false)
      alert("Source and destination cannot be same")
    }
  }, [sourceCity, destinationCity])

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get("http://localhost:5000/train/getalltrain")
      setTrainData(response.data);
    }
    fetchData()
  }, [])

  return (
    <>
      <Layout>
        <Sider
          style={{
            backgroundColor: 'white',
            height: '100vh',
            position: 'fixed',
            top: 15,
            bottom: 0,
          }}
        >
          <Menu>
            <Flex justify='space-between' style={{ margin: 15 }} >
              <Text strong>Quick Filters </Text>
              <Text>Reset all </Text>
            </Flex>
            <Divider />
            <Text style={{ marginLeft: 15 }} strong>Quota</Text>
            <Radio.Group onChange={onChangeQuota} style={{ marginLeft: 15 }} value={quotaValue}>
              <Radio value="general">General</Radio>
              <Radio value="ladies">Ladies</Radio>
            </Radio.Group>
            <Divider />
            <Text style={{ marginLeft: 15 }} strong>Class</Text>
            <Radio.Group onChange={onChangeClass} style={{ marginLeft: 15 }} value={classValue}>
              <Radio value="CC">CC AC-Chair</Radio>
              <Radio value="Sleeper">Sleeper</Radio>
              <Radio value="3A">AC 3 Tier Sleeper</Radio>
              <Radio value="2S">2S Second sitting</Radio>
            </Radio.Group>
            <Divider />
            <Text style={{ marginLeft: 15 }} strong>Arrival Time</Text>
            <Radio.Group style={{ marginLeft: 15 }} onChange={onChangeArrivalTime} value={arrivalTimeValue}>
              <Radio value="05.00-11.00">05:00 - 11:00</Radio>
              <Radio value="11.00-17.00">11:00 - 17:00</Radio>
              <Radio value="17.00-23.00">17:00 - 23:00</Radio>
              <Radio value="23.00-5.00">23:00 - 5:00</Radio>
            </Radio.Group>
            <Divider />
            <Text style={{ marginLeft: 15 }} strong>Departure Time</Text>
            <Radio.Group style={{ marginLeft: 15 }} onChange={onChangeDepartureTime} value={departureTimeValue}>
              <Radio value="05.00-11.00">05:00 - 11.00</Radio>
              <Radio value="11.00-17.00">11.00 - 17-00</Radio>
              <Radio value="17.00-23.00">17.00 - 23.00</Radio>
              <Radio value="23.00-5.00">23.00 - 5.00</Radio>
            </Radio.Group>
            <Divider />
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              position: 'sticky',
              top: 0,
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 50,
                background: 'rgb(237, 229, 216)'
              }}
            >
              <div className='filter-bar'>
                <Select
                  showSearch
                  style={{
                    width: 300,
                    height: 50,
                  }}
                  value={sourceCity}
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
                }} onChange={onChange} cellRender={cellRender} renderExtraFooter={extraFooter} />
                <Button style={{
                  width: 300,
                  height: 50
                }} onClick={handleSearch} type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
                <Button type="primary" onClick={() => navigate("/profile")} style={{ marginLeft: 20, marginTop: 8 }} icon={<UserOutlined />}>Profile</Button>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '50px 60px 50px 250px',
            }}
          >
            <div className='sort-train'>
              <div>Sort by</div>
              <div>Departure</div>
              <div>Duration</div>
              <div>Arrival</div>
            </div>
            {filteredData.length === 0 && search === false ? trainData.map(items => {
              return <div key={items._id}>
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
                        <div onClick={() => navigate(`/passenger-details/${items._id}`)}>
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
            }) :
              filteredData.map(items => {
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
                          <div onClick={() => navigate(`/passenger-details/${items._id}`)}>
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
              })
            }
            {filteredData.length === 0 && search === true ? <div style={{ marginLeft: 420, marginTop: 25 }}><img src="https://www.westcomotors.com.au/site/user-assets/images/no-results.png" alt="" /></div> : null}
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
