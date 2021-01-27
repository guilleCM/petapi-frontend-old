import 'antd/dist/antd.css'
import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;


export default function PageLayout({ children }) {
    return (
        <Layout>
            <Header>Header</Header>
            <Content>{children}</Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}