import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link,useHistory,withRouter} from "react-router-dom";
import {Container,Dropdown,DropdownMenu,DropdownToggle} from "reactstrap";
import Logo from "../../../assets/logo.png";
import FeatherIcon from 'feather-icons-react';
import {logoutAction} from "../../../Store/ActionCreators/authentication";
import "./TopBanner.scss";
function TopBanner(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const authentication = useSelector(state => state.authentication);
    const [navLinks,setNavLinks] = useState([]);
    const [isOpen,setIsOpen] = useState(true);
    const [dropDownOpen,setDropDownOpen] = useState(false);
    const toggleDropdown = ()=>{
        setDropDownOpen(!dropDownOpen);
    }
    const activateParentDropdown = (item) => {
        const parent = item.parentElement;
        if (parent) {
        parent.classList.add("active"); // li
        const parent1 = parent.parentElement;
        parent1.classList.add("active"); // li
        if (parent1) {
                const parent2 = parent1.parentElement;
                parent2.classList.add("active"); // li
                if (parent2) {
                const parent3 = parent2.parentElement;
                parent3.classList.add("active"); // li
                if (parent3) {
                    const parent4 = parent3.parentElement;
                    parent4.classList.add("active"); // li
                }
                }
            }
        }
        };
    const openBlock = (level2_id) => {
        var tmpLinks = navLinks;
        tmpLinks.map((tmpLink) =>
            //Match level 2 id
            tmpLink.id === level2_id
            ? (tmpLink.isOpenSubMenu = !tmpLink.isOpenSubMenu)
            : false
        );
        setNavLinks(tmpLinks);
    };
        
    const openNestedBlock = (level2_id, level3_id) => {
        var tmpLinks = navLinks;
        tmpLinks.map((tmpLink) =>
            //Match level 2 id
            tmpLink.id === level2_id
            ? tmpLink.child.map((tmpchild) =>
                //if level1 id is matched then match level 3 id
                tmpchild.id === level3_id
                    ? //if id is matched then update status(level 3 sub menu will be open)
                    (tmpchild.isOpenNestedSubMenu = !tmpchild.isOpenNestedSubMenu)
                    : (tmpchild.isOpenNestedSubMenu = false)
                )
            : false
        );
        setNavLinks(tmpLinks);
    };
    const toggleLine=()=> {
        setIsOpen(!isOpen);
      }
      const handleLogout = () => {
        dispatch(logoutAction()).then(() => {
            history.push("/login");
        });
    }
    useEffect(()=>{
        if(authentication.profile==="Admin"){
            setNavLinks([
                { id:1, title: "Home", link:"/"},
                {
                    id:2,
                    title: "Manage",
                    link:"/#",
                    isOpenSubMenu: false,
                    child: [
                        {
                            id:3,
                            title:"Users",
                            link:"/#",
                            isOpenNestedSubMenu:false,
                            nestedChild: [
                                {title: "View All Users", link:"/view-users"},
                                {title: "Verify Users", link:"/verify-users"}
                            ]
                        },
                        {
                            id:4,
                            title:"Courses",
                            link:"/#",
                            isOpenNestedSubMenu:false,
                            nestedChild: [
                                {title: "View All Users", link:"/view-courses"},
                                {title: "Add course", link:"/create-course"}
                            ]
                        }
                    ]
                }
            ]);
        }
        else if(authentication.profile==="Student"){
            setNavLinks([
                { id:1, title: "Home", link:"/"},
                {
                    id:2,
                    title: "Self Growth",
                    link:"/#",
                    isOpenSubMenu: false,
                    child: [
                        {
                            id:3,
                            title:"Proposals",
                            link:"/#",
                            isOpenNestedSubMenu:false,
                            nestedChild: [
                                {title: "View Your Proposals", link:"/personal-proposals"},
                                {title: "Create new proposal", link:"/create-proposal"}
                            ]
                        },
                        {
                            id:4,
                            title:"Courses",
                            link:"/#",
                            isOpenNestedSubMenu:false,
                            nestedChild: [
                                {title: "Courses being offered", link:"/view-courses"},
                                {title: "Courses enrolled", link:"/courses-enrolled"}
                            ]
                        }
                    ]
                }
            ]);
        }
        var matchingMenuItem = null;
        var ul = document.getElementById("top-menu");
        var items = ul.getElementsByTagName("a");
        for (var i = 0; i < items.length; ++i) {
            if (props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i];
                break;
            }
        }
        if (matchingMenuItem) {
            activateParentDropdown(matchingMenuItem);
        }
        
    },[])
    return (
        <React.Fragment>
        <header id="topnav" className="defaultscroll sticky">
            <Container>
                <div>
                <Link className="logo" to="/index">
                    <img src={Logo} id="brandLogo" height="24" alt="" />
                </Link>
                </div>
                <div className="menu-extras">
                <div className="menu-item">
                    <Link
                    to="#"
                    onClick={toggleLine}
                    className={
                        isOpen ? "navbar-toggle open" : "navbar-toggle"
                    }
                    >
                    <div className="lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    </Link>
                </div>
                </div>

                <div
                id="navigation"
                style={{ display: isOpen ? "block" : "none" }}
                >
                <ul className="navigation-menu" id="top-menu">
                    {navLinks.map((navLink, key) =>
                    navLink.child ? (
                        <li className="has-submenu" key={key}>
                        {/* child item(menu Item) - Level 1 */}
                        <Link
                            to={navLink.link}
                            onClick={(event) => {
                            event.preventDefault();
                            openBlock(navLink.id);
                            }}
                        >
                            {navLink.title}
                        </Link>
                        {/* <i className="mdi mdi-chevron-right mr-1"></i> */}
                        <span className="menu-arrow"></span>
                        {navLink.isMegaMenu ? (
                            // if menu is mega menu(2 columns grid)
                            <ul
                            className={
                                navLink.isOpenSubMenu
                                ? "submenu megamenu open"
                                : "submenu megamenu"
                            }
                            >
                            <li>
                                <ul>
                                {navLink.child.map((item, childKey) =>
                                    item.id < 18 ? (
                                    <li key={childKey}>
                                        <Link to={item.link}>
                                        {item.title}
                                        {item.isNew ? (
                                            <span className="badge badge-danger rounded ml-2">
                                            new
                                            </span>
                                        ) : null}
                                        </Link>
                                    </li>
                                    ) : null
                                )}
                                </ul>
                            </li>
                            <li>
                                <ul>
                                {navLink.child.map((item, childKey) =>
                                    item.id < 33 && item.id > 17 ? (
                                    <li key={childKey}>
                                        <Link to={item.link}>
                                        {item.title}
                                        {item.isNew ? (
                                            <span className="badge badge-danger rounded ml-2">
                                            new
                                            </span>
                                        ) : null}
                                        </Link>
                                    </li>
                                    ) : null
                                )}
                                </ul>
                            </li>
                            <li>
                                <ul>
                                {navLink.child.map((item, childKey) =>
                                    item.id > 32 ? (
                                    <li key={childKey}>
                                        <Link to={item.link}>
                                        {item.title}
                                        {item.isOnePage ? (
                                            <span className="badge badge-warning rounded ml-2">
                                            Onepage
                                            </span>
                                        ) : null}
                                        {item.isupdatePage ? (
                                            <span className="badge badge-pill badge-info">
                                            Updated
                                            </span>
                                        ) : null}
                                        </Link>
                                    </li>
                                    ) : null
                                )}
                                </ul>
                            </li>
                            </ul>
                        ) : (
                            // if menu is not mega menu(1grid)
                            <ul
                            className={
                                navLink.isOpenSubMenu ? "submenu open" : "submenu"
                            }
                            >
                            {navLink.child.map((childArray, childKey) =>
                                childArray.nestedChild ? (
                                // sub menu item - Level 2
                                <li className="has-submenu" key={childKey}>
                                    <Link
                                    to={childArray.link}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        openNestedBlock(
                                        navLink.id,
                                        childArray.id
                                        );
                                    }}
                                    >
                                    {childArray.title}{" "}
                                    {childArray.isNew ? (
                                        <span className="badge badge-pill badge-success">
                                        Added
                                        </span>
                                    ) : null}
                                    </Link>
                                    <span className="submenu-arrow"></span>
                                    <ul
                                    className={
                                        childArray.isOpenNestedSubMenu
                                        ? "submenu open"
                                        : "submenu"
                                    }
                                    >
                                    {childArray.nestedChild.map(
                                        (nestedChildArray, nestedKey) => (
                                        // nested sub menu item - Level 3
                                        <li key={nestedKey}>
                                            <Link to={nestedChildArray.link}>
                                            {nestedChildArray.title}{" "}
                                            {nestedChildArray.isNewPage ? (
                                                <span className="badge badge-danger rounded">
                                                NEW
                                                </span>
                                            ) : null}
                                            {nestedChildArray.isupdatePage ? (
                                                <span className="badge badge-pill badge-info">
                                                Updated
                                                </span>
                                            ) : null}
                                            </Link>
                                        </li>
                                        )
                                    )}
                                    </ul>
                                </li>
                                ) : (
                                <li key={childKey}>
                                    <Link to={childArray.link}>
                                    {childArray.title}
                                    </Link>
                                </li>
                                )
                            )}
                            </ul>
                        )}
                        </li>
                    ) : (
                        <li key={key}>
                        <Link to={navLink.link}>{navLink.title}</Link>
                        </li>
                    )
                    )}
                </ul>
                <div className="logout-btn-container" onClick={handleLogout}>
                    <FeatherIcon icon="log-out" className="logout-icon" />
                    <span>Logout</span>
                </div>
                </div>
            </Container>
        </header>
    </React.Fragment>
    )
}

export default withRouter(TopBanner)
