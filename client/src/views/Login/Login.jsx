import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Container,
  Col,
  Row,
  Button,
  CardBody,
  Card,
  Spinner,
  Alert
} from 'reactstrap';
import TextInput from '../FormComponents/TextInput/TextInput';
import { Link, Redirect,useHistory } from 'react-router-dom';
import { loginAction,getUser} from '../../Store/ActionCreators/authentication';
import './Login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert, setAlert } from '../../Store/ActionCreators/alerts';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const authentication = useSelector((state) => state.authentication);
    const alert = useSelector((state) => state.alerts);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = async (values) => {
        try {
        await dispatch(loginAction(values.email, values.password));
        } catch (err) {
        alert(err.message);
        }
    };
    useEffect(() => {
        if (!authentication.isLoading) {
            if (authentication.error !== '') {
                dispatch(setAlert({ message: authentication.error, color: 'danger' }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [authentication]);
    if(authentication.user && authentication.user.attributes){
        return <Redirect to="/"/>;
    }
    return (
        <div>
        <Container className="mb-100 mt-150">
            {alert.isAlert && (
            <Row className="mb-2 alert-container justify-content-center">
                <Col xs={8}>
                <Alert color={alert.color}>{alert.msg}</Alert>
                </Col>
            </Row>
            )}
            <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(clearAlert());
                if (!authentication.isLoading) {
                handleSubmit(values);
                }
            }}
            >
            {(props) => (
                <Container>
                <Row className="justify-content-center w-100 mx-auto">
                    <Col xs={8}>
                    <Card className="login-page bg-white shadow rounded border-0">
                        <CardBody>
                        <h4 className="card-title text-center">Login</h4>
                        <Form>
                            <Row className="mt-4 mb-4">
                            <Col xs={12}>
                                <TextInput
                                label="Email/Username"
                                name="email"
                                type="text"
                                placeholder="Email/Username"
                                required
                                />
                            </Col>
                            </Row>
                            <Row className="mt-4">
                            <Col xs={12}>
                                <TextInput
                                label="Password"
                                placeholder="Password"
                                name="password"
                                type="password"
                                required
                                />
                            </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className="mt-3">
                                    <small className="text-primary mr-2">
                                        <Link to="/reset-password">
                                        Forgot Password ?
                                        </Link>
                                    </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className="mt-3">
                                    <small className="text-primary mr-2">
                                        Don't have an account ?  
                                        <Link to="/signup">
                                        Sign Up
                                        </Link>
                                    </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {authentication.isLoading ? (
                                        <Spinner></Spinner>
                                    ) : (
                                        <>Sign In</>
                                    )}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>
                </Container>
            )}
            </Formik>
        </Container>
        </div>
    );
}