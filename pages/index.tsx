import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <h1 className="title">Dashboard</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      protected: true,
    },
  }
}
