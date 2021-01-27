import Head from 'next/head';
import Link from 'next/link';
import PageLayout from '../components/layout';
import { Badge, Card, Col, Row, List, Typography, Descriptions, Form, Button, Select } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import styles from "./perros.module.css";
// import { } from 'antd';
// const { Meta } = Card;
const { Text } = Typography;

const { Option } = Select;

// import {
//     ManOutlined,
//     WomanOutlined,
//     QuestionOutlined,
// } from '@ant-design/icons';
const sex = {
    0: "Desconocido",
    1: "Macho",
    2: "Hembra",
}
// const sexIcon = {
//     0: <QuestionOutlined />,
//     1: <ManOutlined />,
//     2: <WomanOutlined />,
// }
const size = {
    0: "Desconocido",
    1: "Pequeño",
    2: "Mediano",
    3: "Grande",
}
const coat = {
    0: "Desconocido",
    1: "Corto",
    2: "Largo",
}
const age = {
    0: "Todos",
    1: "Adulto",
    2: "Cachorro",
}
const sexType = {
    0: "Todos",
    1: "Macho",
    2: "Hembra",
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

const filterFormInitialValues = {
    race: "0",
    size: "0",
    age: "0",
    sex: "0",
    coat_type: "0",
} 

export default function Perros(props) {
    const unique_races_mother = [...new Set(props.sourceData.map(item => item.race_mother))]
    const unique_races_parent = [...new Set(props.sourceData.map(item => item.race_parent))]
    const unique_races = [...new Set([...unique_races_mother, ...unique_races_parent])]
    const [filteredData, setFilteredData] = useState(undefined);
    const [form] = Form.useForm();
    const onApplyFilter = (values) => {
        let filteredData = JSON.parse(JSON.stringify(props.sourceData));
        for (let filterProp of Object.keys(values)) {
            if (values[filterProp] !== "0") {
                console.log(filterProp)
                switch(filterProp) {
                    case "race":
                        filteredData = filteredData.filter(dog => 
                            dog.race_mother.indexOf(values[filterProp]) >= 0 || dog.race_parent.indexOf(values[filterProp]) >= 0
                        );
                        break;
                    case "age":
                        const isPuppy = values[filterProp] === "2";
                        filteredData = filteredData.filter(dog => dog.is_puppy === isPuppy);
                        break;
                    default:
                        filteredData = filteredData.filter(dog => dog[filterProp] === (values[filterProp]*1))
                        break;
                }
            }
        }
        setFilteredData(filteredData);
    };
    const onReset = () => {
        form.resetFields();
        setFilteredData(undefined);
    };
    const formCols = {
        xs: 24,
        sm: 24,
        md: 8,
    }
    return (
        <PageLayout>
            <Head>
                <title>Perros en adopción</title>
            </Head>
            <div className="site-card-wrapper">
                <Row style={{position: 'sticky', top: 0, zIndex: 1, background: '#f0f2f5', borderBottom: '1px solid #b4b4b4'}}>
                    <Col span={24} style={{padding: 20}}>
                        <Text strong>Filtrar por:</Text>
                        <Form
                            layout="inline"
                            form={form}
                            name="filterDogsForm"
                            initialValues={filterFormInitialValues}
                            onFinish={onApplyFilter}
                            className={styles.dogsForm}
                        >
                            <Form.Item label="Raza" name="race">
                                <Select style={{ width: 200 }} onChange={handleChange}>
                                    <Option key="Todas" value="0">Todas</Option>
                                    {unique_races.map(val =>
                                        <Option key={val} value={val}>{val}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Tamaño" name="size">
                                <Select style={{ width: 120 }} onChange={handleChange}>
                                    {Object.keys(size).map(val =>
                                        <Option key={val} value={val}>{val !== "0" ? size[val] : "Todos"}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Edad" name="age">
                                <Select style={{ width: 120 }} onChange={handleChange}>
                                    {Object.keys(age).map(val =>
                                        <Option key={val} value={val}>{age[val]}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Sexo" name="sex">
                                <Select style={{ width: 120 }} onChange={handleChange}>
                                    {Object.keys(sexType).map(val =>
                                        <Option key={val} value={val}>{sexType[val]}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Pelaje" name="coat_type">
                                <Select style={{ width: 120 }} onChange={handleChange}>
                                    {Object.keys(coat).map(val =>
                                        <Option key={val} value={val}>{val !== "0" ? coat[val] : "Todos"}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Aplicar filtros</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="button" onClick={onReset}>Borrar filtros</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 2,
                        xl: 2,
                        xxl: 3,
                    }}
                    style={{padding: 20}}
                    header={<div>{filteredData ? `${filteredData.length} perros filtrados de ${props.sourceData.length} perros` : `${props.sourceData.length} perros encontrados`}</div>}
                    dataSource={filteredData || props.sourceData}
                    renderItem={dog => (
                        <List.Item>
                            <Card
                                hoverable
                                key={dog.id}
                                cover={
                                    <img 
                                        alt={dog.id} 
                                        src={`http://127.0.0.1:5000/${dog.media[0]}`} 
                                        style={{maxHeight: 400, width: 'auto', maxWidth: '100%', margin: 'auto'}} 
                                    />
                                }
                                size="small"
                            >
                                <Descriptions
                                    style={{textTransform: "capitalize"}}
                                    bordered
                                    size="small"
                                    column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                                >
                                    <Descriptions.Item label="Raza">
                                        {dog.race_mother === dog.race_parent ?
                                            dog.race_mother
                                            :
                                            <>
                                                {dog.race_mother} /
                                                <br />
                                                {dog.race_parent}
                                            </>
                                        }
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tamaño">{size[dog.size]}</Descriptions.Item>
                                    <Descriptions.Item label="Edad">{dog.is_puppy ? "Cachorro" : "Adulto"}</Descriptions.Item>
                                    <Descriptions.Item label="Sexo">{sex[dog.sex]}</Descriptions.Item>
                                    <Descriptions.Item label="Pelaje">{coat[dog.coat_type]}</Descriptions.Item>
                                    <Descriptions.Item label="Nombre">{dog.name !== "" ? dog.name : "Por definir"}</Descriptions.Item>
                                    <Descriptions.Item label="Entrada">{moment(dog.channel_creation_date).format('DD-MM-YYYY')}</Descriptions.Item>
                                    <Descriptions.Item label="Lugar">{dog.channel}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </List.Item>
                    )}
                />
            </div>
        </PageLayout>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch('http://127.0.0.1:5000/api/dogs')
    const sourceData = await res.json()

    if (!sourceData) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
  
    return {
      props: {
        sourceData: sourceData,
      }, // will be passed to the page component as props
    }
  }