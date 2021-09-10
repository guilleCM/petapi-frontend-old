import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Col, Row, List, Typography, Avatar, Button, Form, Input, Alert,
} from 'antd';
import Fade from 'react-reveal/Fade';
import { arrayOf, object } from 'prop-types';

import PageLayout from '../components/layout';

import styles from './index.module.css';

const { Title } = Typography;

const listPoints = [
  {
    title: 'Busca y encuentra a los peluditos en adopción',
    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    // description:
    //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'Las medidas de higiene a causa del COVID obliga a los usuarios de las perreras a reservar cita previa para conocer a los perros. Aquí podrás buscarlos y filtrarlos cómodamente por tamaño, sexo, raza, edad e incluso el tipo de pelo.',
    img: '/undraw_pet_adoption.svg',
  },
  {
    title: 'Recibe notificaciones cuando entren nuevos perros',
    content: 'Podrás ser el primero en enterarte de la entrada de nuevos peluditos en las perreras. Recibe una notificación por email directamente en tu móvil. Sé el primero en reservarlo.',
    img: '/undraw_newsletter.svg',
  },
  {
    title: 'Disfruta de una web adaptada a móvil',
    content: 'Las webs de las perreras son my antiguas y no están preparadas para ver desde el móvil. Nuestra web está pensada para los tiempos que corren, así que se puede disfrutar desde todos los dispositivos actuales: ordenador, tablet y móvil.',
    img: '/undraw_mobile_app.svg',
  },
  {
    title: 'Mantente al día desde una única web',
    content: 'Te mantenemos al día de las entradas de perros en diferentes perreras, para que no tengas que ir consultandolas una a una. Nosotros lo hacemos por ti. Gana tiempo.',
    img: '/undraw_online_organizer.svg',
  },
];

// function UnsubscribeModal(props) {
//   const [ isLoading, setLoading ] = useState(true);
//   const [ success, setSuccess ] = useState(false);
//   const [ message, setMessage ] = useState('Espere...');
//   useEffect(() => {
//     // code to run on component mount
//     const email = window.location.search.split('=')[1];
//     const url = `http://127.0.0.1:5000/api/subscribers/${email}?active=false`;
//     // const data = values;
//     fetch(url, {
//       method: 'PUT', // or 'PUT'
//       // mode: 'no-cors',
//       body: JSON.stringify({ active: false }), // data can be `string` or {object}!
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }).then((res) => res.json())
//       .catch((error) => {
//         console.error('Error:', error);
//         setLoading(false);
//         setMessage('Se ha producido un error. Prueba más tarde.');
//       })
//       .then((response) => {
//         console.log('Success:', response);
//         setSuccess(true);
//         setLoading(false);
//         setMessage('Has cancelado la suscripción correctamente.');
//       });
//   }, []);
//   return (
//     <Modal
//       title="Dar de baja su suscripción"
//       closable={false}
//       visible
//       footer={null}
//     >
//       <Spin spinning={isLoading}>
//         <Alert
//           message={message}
//           description=""
//           type={isLoading ? 'info' : success ? 'success' : 'error'}
//           showIcon
//         />
//       </Spin>
//       <div className={styles.modalUnsubBtnDiv}>
//         <Button type="primary" onClick={() => props.setUnsub(false)}>Cerrar</Button>
//       </div>
//     </Modal>
//   );
// }

export default function Home({ sourceData }) {
  const [ form ] = Form.useForm();
  const [ isSubscribing, setSubscribing ] = useState(false);
  const [ isSubscribed, setSubscribed ] = useState(false);
  // useEffect(() => {
  //   // code to run on component mount
  //   if (window.location.search && window.location.search.includes('unsubscribe=')) {
  //     setUnsub(true);
  //   }
  // }, []);
  const onSubmit = (values) => {
    // console.log(values)
    // const res = await fetch('http://127.0.0.1:5000/api/dogs')
    // const sourceData = await res.json()
    setSubscribing(true);
    const url = `http://127.0.0.1:5000/api/subscribers/${values.email}`;
    // const data = values;
    fetch(url, {
      method: 'PUT', // or 'PUT'
      // mode: 'no-cors',
      body: JSON.stringify(values), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .catch((error) => {
        console.error('Error:', error);
        setSubscribing(false);
      })
      .then((response) => {
        console.log('Success:', response);
        setSubscribing(false);
        setSubscribed(true);
      });
  };
  // const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
  //     setFormLayout(layout);
  // };
  return (
    <PageLayout>
      <Head>
        <title>Buscar perros en adopción en Mallorca</title>
      </Head>
      <div className="site-card-wrapper">
        <Row className={styles.welcomeRow}>
          <Col className={styles.welcomeCol} span={24}>
            <div className={styles.welcomeWrapper}>
              <h1 className={styles.welcomeTitle}>Bienvenidos a Adoptallorca</h1>
              <h3 className={styles.welcomeDescription}>La web para buscar y encontrar todos los perros en adopción de Mallorca.</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 18, offset: 3 }} className={styles.explainAppCol}>
            <Title className={styles.explainApp}>¿Porqué nace esta Web?</Title>
            <p className={styles.explainAppDescription}>
              {`
                Adoptar a un perro de las perreras de Mallorca es toda una odisea. 
                Las entradas de estos animales de compañía en los centros de protección animal son muy escasas y la demanda muy alta. 
                La situación actual te obliga a estar pendiente de las diversas perreras y de cuando van subiendo las nuevas entradas 
                a sus webs. De modo que si te despistas o no puedes estar siempre pendiente de las webs de las perreras es probable que cuando des con un ejemplar
                que te guste ya se te hayan adelantado en el proceso de reserva. 
              `}
            </p>
          </Col>
        </Row>
        <Row className={styles.explainPointsRow}>
          <Col xs={24} sm={24} md={24} lg={{ span: 18, offset: 3 }} className={styles.explainPointsCol}>
            <Title className={styles.explainPointsTitle}>¿Cómo te ayudamos?</Title>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={listPoints}
              renderItem={(item, index) => (
                <Fade right={index % 2 === 0} left={index % 2 === 1}>
                  <List.Item
                    className={styles.helpList}
                    key={item.title}
                  >
                    {index % 2 === 0 && (
                      <img
                        className={styles.listImg}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                    {index % 2 === 1 && (
                      <img
                        className={styles.listImgMobileShow}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                    <div className={styles.helpListTextWrapper}>
                      <Title level={4}>{item.title}</Title>
                      <p>{item.content}</p>
                    </div>
                    {index % 2 === 1 && (
                      <img
                        className={styles.listImgMobileHidden}
                        alt="logo"
                        src={item.img}
                      />
                    )}
                  </List.Item>
                </Fade>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={{ span: 18, offset: 3 }} className={styles.lastEntriesCol}>
            <Title className={styles.explainPointsTitle}>Últimos perros</Title>
            <Fade top>
              <Avatar.Group className={styles.lastEntriesGroup}>
                {sourceData.map((dog) => (
                  <Avatar
                    className={styles.avatarEntrie}
                    size={{
                      xs: 150, sm: 150, md: 150, lg: 170, xl: 180, xxl: 200,
                    }}
                    key={dog.id}
                    src={`http://127.0.0.1:5000/${dog.media[0]}`}
                  />
                ))}
              </Avatar.Group>
            </Fade>
          </Col>
          <Col xs={{ span: 18, offset: 3 }} sm={{ span: 16, offset: 4 }} md={{ span: 12, offset: 6 }} lg={{ span: 6, offset: 9 }} className={styles.goToAllDogsCol}>
            <Link href="/perros">
              <Button block type="primary" size="large">Ver todos los perros</Button>
            </Link>
          </Col>
        </Row>
        <Row className={styles.subRow}>
          <Col span={24}>
            <Title className={styles.subTitle}>Suscríbete gratis</Title>
            <p className={styles.subDescription}>Recibe en tu email avisos cuando entren nuevos perros</p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }} lg={{ span: 6, offset: 12 }}>
            <Form
              layout="vertical"
              form={form}
              size="large"
              onFinish={onSubmit}
            >
              <Form.Item label="Email:" className={styles.emailLabel} name="email">
                <Input placeholder="" type="email" required />
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  loading={isSubscribing}
                >
                  Suscribirse
                </Button>
              </Form.Item>
            </Form>
            {isSubscribed && (
              <Alert
                message="Te has suscrito correctamente!"
                type="success"
                showIcon
                closable
                afterClose={() => setSubscribed(false)}
              />
            )}
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
}

Home.propTypes = {
  sourceData: arrayOf([ object ]),
};
Home.defaultProps = {
  sourceData: [],
};

export async function getServerSideProps(context) {
  const res = await fetch('http://127.0.0.1:5000/api/dogs?limit=5');
  const sourceData = await res.json();
  if (!sourceData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sourceData,
    },
  };
}
