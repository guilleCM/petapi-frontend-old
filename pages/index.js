import Head from 'next/head'
import PageLayout from '../components/layout';
import { Badge, Card, Col, Row, List, Typography, Descriptions, Form, Button, Select, Modal, Space } from 'antd';
import styles from "./index.module.css";

const { Title } = Typography;

const listPoints = [
    {
        title: `Busca y encuentra a los peluditos en adopción`,
        // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        // description:
        //   'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'Las medidas de higiene a causa del COVID obliga a los usuarios de las perreras a reservar cita previa para conocer a los perros. Aquí podrás buscarlos y filtrarlos cómodamente por tamaño, sexo, raza, edad e incluso el tipo de pelo.',
        img: '/undraw_pet_adoption.svg',
    },
    {
        title: 'Recibe notificaciones cuando entren nuevos perros',
        content: 'Podrás ser el primero en enterarte de la entrada de nuevos peluditos en las perreras. Recibe una notificación via email o via push directamente en tu móvil. Sé el primero en reservarlo.',
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
]

export default function Home() {
    return (
        <PageLayout>
            <Head>
                <title>Adoptar perros en Mallorca</title>
            </Head>
            <div className="site-card-wrapper">
                <Row>
                    <Col span={24} style={{ padding: 20 }}>
                        <Title>Bienvenidos a Adoptallorca</Title>
                        <Title level={3}>Aquí puedes buscar y encontrar los perros en adopción de las perreras de Mallorca.</Title>
                        <img src='/good_doggy.svg' alt='bienvenidos' />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ padding: 20 }}>
                        <Title>¿Porqué nace esta App?</Title>
                        <p>
                            {`
                            Adoptar a un perro de las perreras de Mallorca es toda una odisea. 
                            Las entradas de estos animales de compañía en los centros de protección animal son muy escasas y la demanda muy alta. 
                            La situación actual te obliga a estar pendiente de las diversas perreras y de cuando van subiendo las nuevas entradas 
                            a sus webs. De modo que si te despistas o no puedes estar siempre pendiente de las webs de las perreras es probable que cuando des con un ejemplar
                            que te guste ya se te hayan adelantado en el proceso de reserva. 
                            `}
                        </p>
                        <Title>¿Cómo te ayudamos?</Title>
                        <List
                            itemLayout="vertical"
                            size="large"
                            dataSource={listPoints}
                            renderItem={item => (
                                <List.Item
                                    className={styles.helpList}
                                    key={item.title}
                                    extra={
                                    <img
                                        className={styles.listImg}
                                        alt="logo"
                                        src={item.img}
                                    />
                                    }
                                >
                                    <List.Item.Meta
                                    // avatar={<Avatar src={item.avatar} />}
                                        title={item.title}
                                    />
                                    {item.content}
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ padding: 20 }}>
                        <Title>Ultimas entradas</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ padding: 20 }}>
                        <Title>Estadisticas</Title>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ padding: 20 }}>
                        <Title>Suscribirse</Title>
                    </Col>
                </Row>
            </div>
        </PageLayout>
    )
}
