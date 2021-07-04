import React from 'react';
import { Label, Input } from 'reactstrap';
import {Col,Row} from "reactstrap";
import './ListInput.scss';
import { Dropdown } from 'primereact/dropdown';
export default function ListInputForm({ label, labelStrong, required, options,value,onChange,...props}) {
    return (
            <Row className="align-items-center" >
                <Col xs={5}>
                    <Label htmlFor={props.id || props.name} className="textInputForm-label">
                        {labelStrong ? <strong>{label}</strong> : <>{label}</>}
                        {required && <span className="text-danger"> *</span>}
                    </Label>
                </Col>
                <Col xs={7}>
                <Dropdown value={value} options={options} onChange={(event)=>{
                    onChange(event.value)
                }} optionLabel="name" placeholder={props.placeholder}/>
                    
                </Col>
            </Row>
    );
}