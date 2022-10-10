import classnames from 'classnames';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

import Layout from '../../components/layout';

import { authActions } from "../../store/auth/auth.slice";

interface ILoginFormData {
  email: string;
  password: string
}

export default function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: ILoginFormData) => {
    dispatch(authActions.login({ email: data.email, password: data.password }));
  };

  return (
    <Layout>
      <h1 className="title">Login</h1>

      <div className="box">
        <form onSubmit={handleSubmit(login)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input 
                className={classnames('input', { 'is-danger': !!errors.email })}
                {...register('email', { required: true })} 
              />
            </div>
            {errors.email && <p className="help is-danger">Email is required</p>}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input 
                className={classnames('input', { 'is-danger': !!errors.password })}
                type="password" 
                {...register('password', { required: true })}
              />
            </div>
            {errors.password && <p className="help is-danger">Password is required</p>}
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Login</button>
            </div>
          </div>
        </form>
      </div>

    </Layout>
  );
}
