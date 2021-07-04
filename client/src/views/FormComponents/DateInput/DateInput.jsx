import React from 'react'
import {Col,Row,Label} from "reactstrap";
import {Calendar} from "primereact/calendar";
import "./DateInput.scss";
function DateInputForm({labelStrong, label,required,onChange,value,...props}) {
    return ( 
        <Row className="align-items-center">
            <Col xs={5}>
                <Label htmlFor={props.id || props.name} className="textInputForm-label">
                    {labelStrong ? <strong>{label}</strong> : <>{label}</>}
                    {required && <span className="text-danger"> *</span>}
                </Label>
            </Col>
            <Col xs={7}>
                <Calendar dateFormat="yy-mm-dd" id={props.name} value={value} onChange={(e)=> onChange(e.value)} placeholder={props.placeholder}/>
            </Col>
        </Row>
    )
}

export default DateInputForm