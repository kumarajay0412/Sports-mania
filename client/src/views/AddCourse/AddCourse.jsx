import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux";
import {Container,Row,Col} from "reactstrap";
import {format} from "date-fns"
import {Toast} from "primereact/toast";
import {Formik,Form} from "formik";
import {ProgressSpinner} from "primereact/progressspinner";
import TextInput from "../FormComponents/TextInput/TextInput";
import ListInput from "../FormComponents/ListInput/ListInput";
import DateInput from "../FormComponents/DateInput/DateInput";
import "./AddCourse.scss";
import {scrollNavigation} from "../../utils/scrollNavigation";
import { postNewCourse } from '../../utils/AddCourse/AddCourseRequests';
import { useHistory } from 'react-router';
import {Dialog} from "primereact/dialog";
import SuccessDialog from '../Dialogs/SuccessDialog/SuccessDialog';
function AddCourse() {
    const toast = useRef(null);
    const history = useHistory();
    const authentication = useSelector(state => state.authentication);
    const [authorized,setAuthorized] = useState(false);
    const [loading,setLoading] = useState(false);
    const [startDate,setStartDate] = useState(null);
    const [successDialog,setSuccessDialog] = useState(false);
    const [endDate,setEndDate] = useState(null);
    const [credit,setCredit] = useState(null);
    useEffect(()=>{
        window.addEventListener("scroll", scrollNavigation, true);
        if(authentication.profile==="Admin"){
            setAuthorized(true);
        }
        return ()=>{
            window.removeEventListener("scroll", scrollNavigation, true);
        }
    },[])
    const handleSubmit = async (values)=>{
        setLoading(true);
        const result = await postNewCourse(values.course_name,format(startDate,"yyyy-MM-dd"),format(endDate,"yyyy-MM-dd"),credit);
        if(result.success){
            setLoading(false);
            setSuccessDialog(true);
        }
        else{
            toast.current.show({severity:'error', summary: 'Oops something went wrong', detail: result.error, sticky:true});
        }
    }

    return (
        <div className="main-container">
            <Toast ref={toast} position="bottom-right"/>
            {authorized?       
            <Container>
                <Formik
                    initialValues={{
                        course_name:"",
                    }}
                    onSubmit={(values)=>{
                        handleSubmit(values);
                    }}
                >
                {()=>(
                    <Form>
                        <Row className="justify-content-center w-100 mx-auto">
                            <Col xs={8}>
                                <Row className="mt-4 mb-4">
                                    <Col xs={12}>
                                        <TextInput
                                        label="Course name"
                                        name="course_name"
                                        type="text"
                                        placeholder="Enter the course name here"
                                        required
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4 mb-4">
                                    <Col xs={12}>
                                        <DateInput
                                        label="Start Date"
                                        required
                                        value={startDate}
                                        onChange={(value)=>{
                                            setStartDate(value);
                                        }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4 mb-4">
                                    <Col xs={12}>
                                        <DateInput
                                        label="End Date"
                                        required
                                        value={endDate}
                                        onChange={(value)=>{
                                            setEndDate(value);
                                        }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4 mb-4">
                                    <Col xs={12}>
                                        <ListInput
                                        label="Credit(s)"
                                        required
                                        value={credit}
                                        onChange={(value)=>{
                                            setCredit(value)
                                        }}
                                        placeholder="Credit that can be earned from this course"
                                        options={[{name:1},{name:2}]}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-center w-100 mx-auto">
                            <Col xs={8}>
                                <div className="bottom-bar">
                                    <div className="left">
                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            history.push("/")
                                        }} type="button" className="btn btn-danger btn-pills">
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="right">
                                    {loading ? (
                                            <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" animationDuration="1s" />
                                        ) : (
                                            <div className="summary-btn-container">
                                                <button className="btn btn-success btn-pills" type="submit">
                                                    Add Course
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}
                </Formik>
            </Container>
            :
            <Container>
                <div className="height-80 d-flex flex-column justify-content-center align-items-center">
                    <div className="title-text">401</div>
                    <h1>Unauthorized!!!</h1>
                    <p className="mt-4">
                        You don't have access to this page, if you think this is a mistake please contact the admin or submit a query
                    </p>
                    <hr className="line mt-4" />
                </div>
            </Container>
            }
            <SuccessDialog message="Course added successfully" onHide={()=>{
                setSuccessDialog(false)
                setStartDate(null);
                setCredit(null);
                setEndDate(null);
            }} visible={successDialog}/>
        </div>
    )
}

export default AddCourse

