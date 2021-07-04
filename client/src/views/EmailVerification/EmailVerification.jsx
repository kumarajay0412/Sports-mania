import React,{useEffect,useState} from "react";
import "./EmailVerification.scss";
import { Link } from "react-router-dom";
import {Container,Row,Col,Alert,Card,CardBody,Button,Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {Formik,Form} from "formik";
import TextInput from "../FormComponents/TextInput/TextInput";
import {confirmSignup} from "../../Store/ActionCreators/authentication";
import {clearAlert,setAlert} from "../../Store/ActionCreators/alerts";
export default function EmailVerification() {
    const [confirmed,setConfirmed] = useState(false);
    const dispatch = useDispatch();
    const authentication = useSelector((state) => state.authentication);
    const alert = useSelector(state => state.alerts);
    const handleSubmit = async (values) => {
        try {
        await dispatch(confirmSignup(authentication.user.username,values.code));
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        if (!authentication.isLoading) {
            if (authentication.error !== '') {
                dispatch(setAlert({ message: authentication.error, color: 'danger' }));
            }
            else if (authentication.isConfirmed){
                setConfirmed(true);
            }
            else if (!authentication.isConfirmed){
                setConfirmed(false);
            }
        }
    }, [authentication]);
  return (
    <div>
        {confirmed?
        <main className="email-ver">
            <section className="email-ver-body">
            <div className="email-ver-navigation"></div>
            <div className="email-ver-notification">
                <h3>Email Verification Successful</h3>
                <p>
                You can now <Link to="/login">login</Link> using your credentials
                </p>
                
            </div>
            </section>
        </main>
        :
        <Container className="mb-100 mt-150 main-container">
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
                        <h4 className="card-title text-center">Email Verification</h4>
                        <h6 className="text-center">We have sent a verification code to {authentication.user.username}</h6>
                        <Form>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput
                                    label="Verification Code"
                                    name="code"
                                    type="text"
                                    placeholder="Enter the code here"
                                    required
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {authentication.isLoading ? (
                                        <Spinner></Spinner>
                                    ) : (
                                        <>Verify</>
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
        }
        
    </div>
  );
}