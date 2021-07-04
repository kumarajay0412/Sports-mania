import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux";
import {Container,Row} from "reactstrap";
import {InputText} from "primereact/inputtext";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Tag} from "primereact/tag";
import {Toast} from "primereact/toast";
import {ProgressSpinner} from "primereact/progressspinner";
import "./ViewUsers.scss";
import { getAllUsers } from '../../utils/ViewUsers/ViewUsersRequest';
import {scrollNavigation} from "../../utils/scrollNavigation";
function ViewUsers() {
    const toast = useRef(null);
    const authentication = useSelector(state => state.authentication);
    const [authorized,setAuthorized] = useState(false);
    const [loading,setLoading] = useState(true);
    const [userList,setUserList] = useState(null);
    const [globalKeyword,setGlobalKeyword] = useState(null);

    useEffect(()=>{
        window.addEventListener("scroll", scrollNavigation, true);
        if(authentication.profile==="Admin"){
            setAuthorized(true);
            getAllUsers().then((response)=>{
                if(response.success){
                    setUserList(response.users);
                    setLoading(false);
                }
                else{
                    toast.current.show({severity:'error', summary: 'Oops something went wrong', detail: response.error, sticky:true});
                }
            })
        }
        return ()=>{
            window.removeEventListener("scroll", scrollNavigation, true);
        }
    },[])
    const renderHeader = ()=>{
        return (
            <div className="table-header">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalKeyword(e.target.value)} placeholder="Search for a user" />
                </span>
            </div>
        );
    }
    const header = renderHeader();

    const firstNameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.first_name}
            </React.Fragment>
        );
    }    
    const lastNameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.last_name}
            </React.Fragment>
        );
    } 
    const designationBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.profile}
            </React.Fragment>
        );
    }      
    const identifierBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.unique_identifier}
            </React.Fragment>
        );
    }
    const statusBodyTemplate = (rowData)=>{
        return (
            <React.Fragment>
                {rowData.status==="not applicable"?
                <Tag className="p-mr-2 na-tag" icon="pi pi-user" value="Not Applicable"></Tag>
                : 
                rowData.status==="unverified"? 
                <Tag className="p-mr-2" icon="pi pi-exclamation-triangle" severity="warning" value="Not Verified"></Tag>
                :
                <Tag className="p-mr-2" icon="pi pi-check" severity="success" value="Verified"></Tag>}
            </React.Fragment>
        )
    }
    return (
        <div className="main-container">
            <Toast ref={toast} position="bottom-right"/>
            {authorized?
            loading?
                <ProgressSpinner style={{ width: "100px", height: "100px" }} strokeWidth="8" animationDuration="0.5s" />
            :       
            <Container>
                <DataTable value={userList} className="p-datatable-users" dataKey="uid" rowHover globalFilter={globalKeyword}
                    header={header} paginator rows={10} emptyMessage="No users found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                    <Column field="first_name" header="First Name" body={firstNameBodyTemplate} sortable filter filterPlaceholder="Search by first name" />
                    <Column field="last_name" header="Last Name" body={lastNameBodyTemplate} sortable filter filterPlaceholder="Search by last name" />
                    <Column field="profile" header="Designation" body={designationBodyTemplate} sortable filter filterPlaceholder="Search by designation" />
                    <Column field="unique_identifier" header="Identifier" body={identifierBodyTemplate} sortable filter filterPlaceholder="Search by identifier" />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable filter />
                </DataTable>
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
        </div>
    )
}

export default ViewUsers
