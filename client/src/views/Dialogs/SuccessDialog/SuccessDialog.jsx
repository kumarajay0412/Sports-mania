import React from 'react'
import {Dialog} from "primereact/dialog";
import "./SuccessDialog.scss";
function SuccessDialog({message,visible,onHide}) {
    return (
        <Dialog header="Success" onHide={onHide} visible={visible}>
            <div className="success-dialog-container">
                <i className="pi pi-check-circle"></i>
                <h4>{`${message}`}</h4>
            </div>
        </Dialog>
    )
}

export default SuccessDialog
