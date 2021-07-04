import React,{useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";
import {useHistory} from "react-router-dom";
import {Sidebar} from "primereact/sidebar";
import {PanelMenu} from "primereact/panelmenu";
import {useDispatch,useSelector} from "react-redux";
import {logoutAction} from "../../../Store/ActionCreators/authentication"
import FeatherIcon from 'feather-icons-react';
import Logo from "../../../assets/logo.png";
import "./SideBar.scss"
function SideBar() {
    const [visible,setVisible] = useState(false);
    const authentication = useSelector(state => state.authentication);
    const dispatch = useDispatch();
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const history = useHistory();
    const [adminMenu,setAdminMenu] = useState(null);
    const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            history.push("/login");
        });
    }
    useEffect(()=>{
        console.log(authentication.profile);
        switch(authentication.profile){
            case "Admin":
                setAdminMenu( [
                    {
                        label: 'Users',
                        items: [
                            {
                                label: 'View all users',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                command:()=>{ history.push("/view-users")}
                            },
                            {
                                label: 'Verify users',
                                icon: 'pi pi-fw pi-arrow-circle-right',
                                command:()=> {history.push("/verify-users")}
                            },
                        ]
                    }
                ]);
        }
    },[])
    return (
        <div>
            <Button icon="pi pi-arrow-right" onClick={() => setVisible(true)} className="p-mr-2" />
            <Sidebar visible={visible} baseZIndex={1000000} onHide={() => setVisible(false)} id="panel">
                    <div className="logo-container" onClick={()=>{
                        history.push("/");
                    }}>
                        <img src={Logo} className="menu-logo" />
                        <div className="sub-heading"><p>User</p><p>Dashboard</p></div>
                    </div>
                    <div className="info-container">
                        <Avatar icon="pi pi-user" className="p-mr-2 avatar" size="xlarge" shape="circle" />
                        <div className="info-sub-container">
                            <h6>Ahoy <span className="menu-username">{authentication.user ? authentication.user.attributes?`${authentication.user.attributes["given_name"]}!`:`${authentication.user.challengeParam.userAttributes.given_name}!` : "Saatvik!"}</span></h6>
                            {/* <Link className="account-link"><p>My account</p></Link> */}
                        </div>
                    </div>
                    <div className="panel-menu-container">
                        <PanelMenu model={adminMenu} className="panel-menu" />
                    </div>
                    <div className="bottom-container">
                        <div className="logout-btn-container" onClick={handleLogout}>
                            <FeatherIcon icon="log-out" className="logout-icon" />
                            <span>Logout</span>
                        </div>
                        <div className="copyright-container">
                            <span>Copyright {currentYear} - Likvidi Securities Ltd</span>
                            {/* <FeatherIcon icon="settings" className="settings-icon" /> */}
                        </div>
                    </div>
            </Sidebar>
        </div>
    )
}

export default SideBar
