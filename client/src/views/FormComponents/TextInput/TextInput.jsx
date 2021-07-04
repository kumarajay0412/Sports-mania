import React from 'react';
import { Label, Input } from 'reactstrap';
import {Container,Col,Row} from "reactstrap";
import { useField } from 'formik';
import './TextInput.scss';

export default function TextInputForm({ label, labelStrong, required, ...props}) {
    const [field, meta] = useField(props);
    return (
            <Row className="align-items-center" style={{opacity:props.disabled?0.5:1}}>
                <Col xs={5}>
                    <Label htmlFor={props.id || props.name} className="textInputForm-label">
                        {labelStrong ? <strong>{label}</strong> : <>{label}</>}
                        {required && <span className="text-danger"> *</span>}
                    </Label>
                </Col>
                <Col xs={7}>
                    <Input className="textInputForm-input" {...field} {...props} disabled={props.disabled} />
                    {meta.touched && meta.error ? (
                        <div className="error mt-2">{meta.error}</div>
                    ) : null}
                </Col>
            </Row>
    );
}