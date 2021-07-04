import React from 'react'
import {Col,Row,Label} from "reactstrap";
import {InputNumber} from "primereact/inputnumber";
import "./NumberInput.scss";
function NumberInput({labelStrong, label,required,onChange,type,...props}) {
    return ( 
        <Row className="align-items-center">
            <Col xs={5}>
                <Label htmlFor={props.id || props.name} className="textInputForm-label">
                    {labelStrong ? <strong>{label}</strong> : <>{label}</>}
                    {required && <span className="text-danger"> *</span>}
                </Label>
            </Col>
            <Col xs={7}>
                {type?
                <Row>
                    <Col xs={6}>
                        <InputNumber id={props.name} locale="en-US" onChange={(e)=>{
                            onChange(e.value)
                        }}
                        placeholder={props.placeholder}  min={0}/>
                    </Col>
                    <Col xs={6}>
                        <InputNumber id={props.name2} locale="en-US" onChange={(e)=>{
                            props.onChange2(e.value)
                        }}
                        placeholder={props.placeholder2} max={props.max2} min={0}/>
                    </Col>
                </Row>
                :
                <InputNumber id={props.name} locale="en-US" onChange={(e)=>{
                    onChange(e.value)
                }}
                placeholder={props.placeholder} min={0}/>
                }
                
            </Col>
        </Row>
    )
}

export default NumberInput;