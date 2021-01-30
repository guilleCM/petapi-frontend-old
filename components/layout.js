import 'antd/dist/antd.css'
import { Layout } from 'antd';
import styles from "./layout.module.css";

const { Header, Footer, Content } = Layout;


export default function PageLayout({ children }) {
    return (
        <Layout>
            <Header className={styles.appHeader}>
                <img className={styles.logoHeader} src="/adoptallorca-inverse.png" alt="adoptallorca logo"></img>
                <div className={styles.sloganHeader}>
                    <img className={styles.sloganImg} src="/slogan-logo.png" alt="adoptallorca logo"></img>
                </div>
            </Header>
            <Content>{children}</Content>
            <Footer>Footer</Footer>
        </Layout>
    )
}