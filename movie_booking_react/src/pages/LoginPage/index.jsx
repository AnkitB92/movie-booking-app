import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Endpoints from '../../api/Endpoints';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const nav = useNavigate();

  const [requestResponse, setRequestResponse] = useState({
    textMessage: '',
    alertClass: ''
  });

  const initialValues = useMemo(() => ({
    username: '',
    password: ''
  }), []);

  useEffect(() => {
    const savedUsername = localStorage.getItem('saved_username');
    const savedPassword = localStorage.getItem('saved_password');
    if (savedUsername) {
      initialValues.username = savedUsername;
      setRememberMe(true);
    }
    if (savedPassword) {
      initialValues.password = savedPassword;
    }
  }, [initialValues]);

  const onSubmit = (values) => {
    axios.post(Endpoints.LOGIN, values)
      .then((response) => {
        const { access, refresh, user_id } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user_id', user_id);

        if (rememberMe) {
          localStorage.setItem('saved_username', values.username);
          localStorage.setItem('saved_password', values.password);
        } else {
          localStorage.removeItem('saved_username');
          localStorage.removeItem('saved_password');
        }

        setRequestResponse({
          textMessage: 'Login Successful',
          alertClass: 'alert alert-success px-2 py-1 font-weight-bold',
        });
        setLoading(true);

        nav('/');
      })
      .catch((error) => {
        setRequestResponse({
          textMessage: 'Login Failed. Try again!',
          alertClass: 'alert alert-danger px-2 py-1 font-weight-bold',
        });
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required')
      .min(5, 'Add at least 5 characters')
      .max(8, 'Maximum character limit is 8'),
    password: Yup.string().required('Password is required')
      .min(5, 'Add at least 5 characters')
      .max(12, 'Maximum character limit is 12')
  });

  return (
    <>
      <Navbar />
      <div className='account-bg'>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div className="wrapper">
                <div className={requestResponse.alertClass}>
                  {requestResponse.textMessage} &nbsp;
                  {loading && (<span className="spinner-border spinner-border-sm text-success"></span>)}
                </div>
                <h6 className='teal'>HELLO</h6>
                <h4 className='font-weight-bold mb-4'>WELCOME BACK</h4>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                  validateOnMount
                >
                  {(formik) => {
                    return (
                      <Form>
                        <div className="form-group acc-group">
                          <label htmlFor="username">USERNAME</label>
                          <Field
                            type="text"
                            name='username'
                            id='username'
                            className={
                              formik.touched.username && formik.errors.username ?
                                'form-control is-invalid' : 'form-control'
                            }
                            placeholder='john01'
                          />
                          <ErrorMessage name='username'>
                            {(errorMessage) => (<small className='text-danger'>{errorMessage}</small>)}
                          </ErrorMessage>
                        </div>
                        <div className="form-group acc-group">
                          <label htmlFor="password">PASSWORD</label>
                          <Field
                            type="password"
                            name='password'
                            id='password'
                            className={
                              formik.touched.password && formik.errors.password ?
                                'form-control is-invalid' : 'form-control'
                            }
                            placeholder='**********'
                          />
                          <ErrorMessage name='password'>
                            {(errorMessage) => (<small className='text-danger'>{errorMessage}</small>)}
                          </ErrorMessage>
                        </div>

                        <div className="form-group form-check">
                          <Field
                            type="checkbox"
                            name="rememberMe"
                            id="rememberMe"
                            className="form-check-input"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                        </div>

                        <div className="account-container">
                          <input type="submit" disabled={!formik.isValid} className="join-btn account-btn" value='LOG IN' />
                          <Link to='/signup' className='account-link'>
                            Don't have an account? <span className='teal'>Sign up now</span>
                          </Link>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;