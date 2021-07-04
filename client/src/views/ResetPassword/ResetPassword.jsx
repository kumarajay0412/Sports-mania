import React, { useEffect, useState } from 'react';
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
import { Redirect } from 'react-router-dom';
import {
    resetAuthDetails,
    resetPassword,
    resetPasswordConfirm
} from '../../Store/ActionCreators/authentication';

import './ResetPassword.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert, setAlert } from '../../Store/ActionCreators/alerts';

export default function ResetPassword() {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const [username, setUsername] = useState('');
    const authentication = useSelector((state) => state.authentication);
    const alert = useSelector((state) => state.alerts);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        password: Yup.string()
        .min(8, 'Password has to be longer than 8 characters!')
        .matches(
            /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
            'Needs one special character'
        )
        .matches(/[0-9]/, 'Needs one digit')
        .matches(/[a-z]/, 'Needs one lowercase character')
        .matches(/[A-Z]/, 'Needs one uppercase character')
        .required('Required'),
        passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
        code: Yup.string().required('Required')
    });

    const handleSubmit = async (values) => {
        try {
        await dispatch(resetPassword(values.username));
        setUsername(values.username);
        setConfirm(true);
        } catch (err) {
        alert(err.message);
        }
    };

    const handleSubmitConfirm = async (values) => {
        try {
        await dispatch(
            resetPasswordConfirm(values.username, values.code, values.password)
        );
        } catch (err) {
        alert(err.message);
        }
    };

    useEffect(() => {
        if (!authentication.isLoading) {
        if (authentication.error !== '') {
            dispatch(setAlert({ message: authentication.error, color: 'danger' }));
        } else if (authentication.user) {
            dispatch(
            setAlert({ message: 'Verification Email sent', color: 'success' })
            );
        } else if (authentication.resetPasswordStatus) {
            dispatch(setAlert({ message: 'Password changed!', color: 'success' }));
            dispatch(resetAuthDetails());
        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authentication]);

    if (authentication.resetPasswordStatus) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
        <Container className="mb-100 mt-150">
            {alert.isAlert && (
            <Row className="mb-2">
                <Col xs={12}>
                <Alert color={alert.color}>{alert.msg}</Alert>
                </Col>
            </Row>
            )}
            <Container>
            <Row className="justify-content-center w-100">
                <Col xs={12} md={8} lg={6}>
                <Card className="login-page bg-white shadow rounded border-0">
                    <CardBody>
                    <h4 className="card-title text-center">Reset Password</h4>
                    <Row>
                        <Col xs={12}>
                        <p className="mb-0 mt-3">
                            <small className="text-dark mr-2">
                            {confirm ? (
                                <>
                                A verification code has been sent to{' '}
                                {authentication.resetPasswordDestination
                                    ? authentication.resetPasswordDestination
                                    : 'your email'}
                                </>
                            ) : (
                                <>A verification code will be sent to your email</>
                            )}
                            </small>
                        </p>
                        </Col>
                    </Row>
                    {confirm ? (
                        <>
                        <Formik
                            initialValues={{
                            username: username,
                            password: '',
                            passwordConfirm: '',
                            code: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                            dispatch(clearAlert());
                            if (!authentication.isLoading) {
                                handleSubmitConfirm(values);
                            }
                            }}
                        >
                            {(props) => (
                            <Form>
                                <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="Username/Email"
                                    name="username"
                                    type="text"
                                    placeholder="Username/Email"
                                    required
                                    />
                                </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="Verification Code"
                                    name="code"
                                    type="text"
                                    required
                                    />
                                </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="New Password"
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    required
                                    />
                                </Col>
                                <Col xs={12} className="mt-2">
                                    <small className="text-dark mr-2">
                                    <em>
                                        Password must have minimum 8 characters, 1
                                        special character, 1 number & 1 uppercase
                                        character.
                                    </em>
                                    </small>
                                </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    name="passwordConfirm"
                                    type="password"
                                    required
                                    />
                                </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {authentication.isLoading ? (
                                        <Spinner>idk</Spinner>
                                    ) : (
                                        <>Set Password</>
                                    )}
                                    </Button>
                                </Col>
                                </Row>
                            </Form>
                            )}
                        </Formik>
                        <Row>
                            <Col xs={12} className="text-center">
                            <p className="mb-0 mt-3">
                                <small className="text-dark mr-2">
                                <Button
                                    color="link"
                                    onClick={() => setConfirm(false)}
                                >
                                    Don't have a code?
                                </Button>
                                </small>
                            </p>
                            </Col>
                        </Row>
                        </>
                    ) : (
                        <>
                        <Formik
                            initialValues={{
                            username: ''
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                            dispatch(clearAlert());
                            if (!authentication.isLoading) {
                                handleSubmit(values);
                            }
                            }}
                        >
                            {(props) => (
                            <Form>
                                <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="Username/Email"
                                    name="username"
                                    type="text"
                                    placeholder="Username/Email"
                                    required
                                    />
                                </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {authentication.isLoading ? (
                                        <Spinner>idk</Spinner>
                                    ) : (
                                        <>Get Verification Code</>
                                    )}
                                    </Button>
                                </Col>
                                </Row>
                            </Form>
                            )}
                        </Formik>
                        <Row>
                            <Col xs={12} className="text-center">
                            <p className="mb-0 mt-3">
                                <small className="text-dark mr-2">
                                <Button
                                    color="link"
                                    onClick={() => setConfirm(true)}
                                >
                                    I already have a code
                                </Button>
                                </small>
                            </p>
                            </Col>
                        </Row>
                        </>
                    )}
                    </CardBody>
                </Card>
                </Col>
            </Row>
            </Container>
        </Container>
        </div>
    );
}