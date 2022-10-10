import { useSelector } from "react-redux";

import Layout from '../../components/layout';

import { getUser } from "../../store/auth/auth.slice";

export default function Profile() {
  const user = useSelector(getUser);

  return (
    <Layout>
      <h1 className="title">Profile</h1>

      <>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            {user.firstName} {user.lastName}
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            {user.email}
          </div>
        </div>
      </>

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
