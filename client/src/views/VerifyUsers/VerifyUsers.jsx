import React, { useRef, useState,useEffect } from 'react'
import {TabView,TabPanel} from "primereact/tabview";
import { getUnverifiedUsers, verifyRequest } from '../../utils/VerifyUsers/VerifyUsersRequests';
import { Toast } from 'primereact/toast';
import {Container,Row,Col} from "reactstrap";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { useSelector } from 'react-redux';
import { ProgressSpinner} from "primereact/progressspinner";
import {scrollNavigation} from "../../utils/scrollNavigation";
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import "./VerifyUsers.scss";
function VerifyUsers() {
    const ref = useRef(null);
    const authentication = useSelector(state => state.authentication)
    const [loading,setLoading] = useState({
        users:false,
        verification:false,
    });
    const [category,setCategory] = useState("Faculty");
    const [authorized,setAuthorized] = useState(false);
    const [userList,setUserList] = useState([]);
    const [displayVerifyDialog,setDisplayVerifyDialog] = useState(false);
    const [globalKeyword,setGlobalKeyword] = useState(null);
    const [selectedUser,setSelectedUser] = useState(null);
    useEffect(()=>{
        window.addEventListener("scroll", scrollNavigation, true);
        if(authentication.profile==="Admin"){
            setAuthorized(true);
            fetchUsers("Faculty");
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
    const fetchUsers =async (profile)=>{
        setLoading((prev)=>{
            return {...prev,users:true}
        });
        const result = await getUnverifiedUsers(profile);
        console.log(result);
        if(result.success){
            setUserList(result.users);
            setLoading((prev)=>{
                return {...prev,users:false}
            });
        }
        else{
            ref.current.show({severity:'error', summary: 'Oops something went wrong', detail: result.error, sticky:true})
            setLoading((prev)=>{
                return {...prev,users:false}
            });
        }
    }
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
    const identifierBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {rowData.unique_identifier}
            </React.Fragment>
        );
    }
    const verifyButtonTemplate = (rowData) =>{
        return (
            <Button onClick={()=>{
                setSelectedUser(rowData)
                setDisplayVerifyDialog(true)
            }} label="Verify" icon="pi pi-check-circle"/>
        )
    }
    const handleVerify =async () =>{
        setLoading((prev)=>{
            return {...prev,verification:true}
        })
        const result = await verifyRequest(selectedUser,category);
        if(result.success){
            setLoading((prev)=>{
                return {...prev,verification:false}
            })
            setDisplayVerifyDialog(false);
            fetchUsers(category);
        }
        else{
            setLoading((prev)=>{
                return {...prev,verification:false}
            })
            setDisplayVerifyDialog(false);
            ref.current.show({severity:'error', summary: 'Oops something went wrong', detail: result.error, sticky:true})
        }
        
    }
    const renderDialogFooter = ()=>{
        return (
            <div className="footer-container">
                {loading.verification?
                    <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" animationDuration="0.5s" />
                :
                <>
                    <Button label="Cancel" onClick={() => {
                        setDisplayVerifyDialog(false)
                    }} className="verification-cancel-btn"/>
                    <Button label="Proceed"  onClick={handleVerify} className="verification-proceed-btn"/>
                    
                </>
                }
            </div>


        )
    }
    useEffect(()=>{
        fetchUsers(category);
    },[category])
    return (
        <div>
            <Toast ref={ref} position="bottom-right"/>
            <div className="verify-radio-container">
                <h5>Choose a category</h5>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="Faculty" name="city" value="Faculty" onChange={(e) => setCategory(e.value)} checked={category==="Faculty"} />
                    <label htmlFor="Faculty">Faculty</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="Coach" name="city" value="Coach" onChange={(e) => setCategory(e.value)} checked={category==="Coach"} />
                    <label htmlFor="Faculty">Coach</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="Security Personnel" name="city" value="Security Personnel" onChange={(e) => setCategory(e.value)} checked={category==="Security Personnel"} />
                    <label htmlFor="Faculty">Security Personnel</label>
                </div>
                <div className="p-field-radiobutton">
                    <RadioButton inputId="Sports Coordinator" name="city" value="Sports Coordinator" onChange={(e) => setCategory(e.value)} checked={category==="Sports Coordinator"} />
                    <label htmlFor="Faculty">Sports Coordinator</label>
                </div>
            </div>
            <div className="tab-container">
                {authorized?
                loading.users?
                    <ProgressSpinner style={{ width: "100px", height: "100px" }} strokeWidth="8" animationDuration="0.5s" />
                    :
                    userList.length?
                    <Container>
                        <DataTable value={userList} className="p-datatable-users" dataKey="uid" rowHover globalFilter={globalKeyword}
                            header={header} paginator rows={10} emptyMessage="No users found" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}>
                            <Column field="first_name" header="First Name" body={firstNameBodyTemplate} sortable filter filterPlaceholder="Search by first name" />
                            <Column field="last_name" header="Last Name" body={lastNameBodyTemplate} sortable filter filterPlaceholder="Search by last name" />
                            <Column field="unique_identifier" header="Identifier" body={identifierBodyTemplate} sortable filter filterPlaceholder="Search by identifier" />
                            <Column header="Verify" body={verifyButtonTemplate}/>
                        </DataTable>
                    </Container>
                    :
                    <Container>
                        <Row>
                            <Col xs={{offset:3,size:6}}>
                                <h3>No unverified users in this category</h3>
                            </Col>
                        </Row>
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
            <Dialog header="Verify Confirmation"  visible={displayVerifyDialog} footer={renderDialogFooter} baseZIndex={10000} className="verification-dialog">
                <Container>
                    <Row className="mb-4">
                        <Col xs={6}>Name</Col>
                        <Col xs={6}>{`${selectedUser?selectedUser.first_name:"John"} ${selectedUser?selectedUser.last_name:"Doe"}`}</Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={6}>Unique Identifier</Col>
                        <Col xs={6}>{`${selectedUser?selectedUser.unique_identifier:null}`}</Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={6}>UID</Col>
                        <Col xs={6}>{`${selectedUser?selectedUser.uid:null}`}</Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={12}>
                            <h6 className="warning-verify">WARNING: Verifying this user would give them category privileges</h6>
                        </Col>
                    </Row>
                </Container>
            </Dialog>
        </div>
    )
}

export default VerifyUsers
