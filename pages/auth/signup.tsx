import classnames from 'classnames';
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';

import Layout from '../../components/layout';

import { authActions } from "../../store/auth/auth.slice";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string
  confirmPassword: string
}

export default function Login() {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = (data: IFormData) => {
    dispatch(authActions.signup({ 
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email, 
      password: data.password,
    }));
  };

  return (
    <Layout>
      <h1 className="title">Create free account</h1>

      <div className="box">
        <form onSubmit={handleSubmit(login)}>
          <div className="field">
            <label className="label">First Name</label>
            <div className="control">
              <input 
                className={classnames('input', { 'is-danger': !!errors.firstName })}
                {...register('firstName', { required: true })} 
              />
            </div>
            {errors.firstName && <p className="help is-danger">First Name is required</p>}
          </div>
          <div className="field">
            <label className="label">Last Name</label>
            <div className="control">
              <input 
                className={classnames('input', { 'is-danger': !!errors.lastName })}
                {...register('lastName', { required: true })} 
              />
            </div>
            {errors.lastName && <p className="help is-danger">Last Name is required</p>}
          </div>
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
            <label className="label">Confirm Password</label>
            <div className="control">
              <input 
                className={classnames('input', { 'is-danger': !!errors.confirmPassword })}
                type="password" 
                {...register('confirmPassword', { 
                  required: { value: true, message: 'Confirm Password is required' },
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
            </div>
            {errors.confirmPassword && <p className="help is-danger">{errors.confirmPassword.message.toString()}</p>}
          </div>

          <div className="field">
            <div className="control">
              <button className="button is-link">Sign up</button>
            </div>
          </div>
        </form>
      </div>

    </Layout>
  );
}
