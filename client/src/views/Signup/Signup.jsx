import React,{useState} from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { Col, Row, Button, Spinner, Alert,Card,CardBody,Container } from "reactstrap";
import TextInput from "../FormComponents/TextInput/TextInput";
import { Redirect, useHistory, Link } from "react-router-dom";
import { registerAction } from "../../Store/ActionCreators/authentication";
import "./Signup.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert, setAlert } from "../../Store/ActionCreators/alerts";
import ListInputForm from "../FormComponents/ListInput/ListInput";

const profileOptions = [
    {name:"Admin"},
    {name:"Student"},
    {name:"Faculty"},
    {name:"Security Personnel"},
    {name:"Coach"},
    {name:"Sports Coordinator"},
]
export default function Register() {
    const history = useHistory();
    const dispatch = useDispatch();
    const authentication = useSelector((state) => state.authentication);
    const alert = useSelector((state) => state.alerts);
    const [profile,setProfile] = useState(null);
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("Required"),
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
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
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            console.log(profile);
            await dispatch(registerAction(values?.email, values?.password, values?.firstName, values?.lastName, values?.identifier,profile));
            history.push("/login");
            dispatch(setAlert({ message: "Sign up successful, log in using your credentials ", color: "success" }));
            setTimeout(()=>{
                dispatch(clearAlert());
            },3000)
        } catch (err) {
            console.log(err.message);
        }
    }

    React.useEffect(() => {
        if (!authentication.isLoading) {
            if (authentication.error !== "") {
                dispatch(setAlert({ message: authentication.error, color: "danger" }));
            }
            // } else if (authentication.isRegistered) {
            //     history.push("/email-verification");
            // }
        }
    }, [authentication, dispatch, history]);

    if (authentication.user && authentication.user.attributes) {
        return <Redirect to="/" />;
    }
    return (
    <div className="register">
        {alert.isAlert && (
            <Row className="mb-2">
                <Col xs={12}>
                    <Alert color={alert.color} className="error">{alert.msg}</Alert>
                </Col>
            </Row>
        )}
        <Formik
            initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
            dispatch(clearAlert());
            if (!authentication.isLoading) {
                handleSubmit(values);
            }
            }}
        >
            {(props) => (
                <Container>
                <Row className="justify-content-center align-items-center w-100 mx-auto">
                    <Col xs={8} >
                    <Card className="login-page bg-white shadow rounded border-0">
                        <CardBody>
                        <h4 className="card-title text-center">Sign up</h4>
                        <Form>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput label="Email" name="email" type="text" placeholder="Your email address goes here" required />
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput label="First name" placeholder="Your first name goes here" name="firstName" type="text" required />
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput label="Last Name" name="lastName" type="text" placeholder="Your last name goes here" required />
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput label="Password" placeholder="Your account's password goes here" name="password" type="password" required />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
                                    <TextInput label="Confirm Password" placeholder="Confirm Password" name="confirmPassword" type="password" required />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
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
                                    <ListInputForm value={profile} onChange={(value)=>{
                                        console.log(value);
                                        setProfile(value)
                                    }}
                                    options={profileOptions}
                                    label="Designation"
                                    placeholder="Choose a designation"
                                    required/>
                                </Col>
                            </Row>
                            <Row className="mt-4 mb-4">
                                <Col xs={12}>
                                    <TextInput label="Unique Identifier" name="identifier" type="text" placeholder="Your roll number/ faculty ID goes here" required />
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <p className="mb-0 mt-2">
                                    <small className="text-primary mr-2">
                                        Already have an account ?
                                            <Link to="/login">
                                            Login
                                            </Link>
                                    </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
                                    <Button className="btn btn-secondary btn-pills" color="primary" type="submit" block>
                                        {authentication.isLoading ? <Spinner></Spinner> : <>CREATE ACCOUNT</>}
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
        </div>
    );
}
