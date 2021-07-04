import React, { Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TopBanner from "../Layout/TopBanner/TopBanner";
import Jumbotron from "../Layout/Jumbotron/Jumbotron";
const SideBar = React.lazy(() => import('./SideBar/SideBar'));

const Loader = () => (
    <div id="preloader">
        <div id="status">
        <div className="spinner">
            <div className="double-bounce1" />
            <div className="double-bounce2" />
        </div>
        </div>
    </div>
);

function Layout(props) {
    const { children } = props;
    return (
        <div className="parent-container">
        <Suspense fallback={Loader()}>
          <TopBanner/>
          {props.jumbo?<Jumbotron heading={props.heading}/>:null}
          
          {children}
          {/* <div className="layout">
            <div className="sidebar-container">
              <SideBar />
            </div>
            <div className="content-container">{children}</div>
          </div> */}
        </Suspense>
      </div>
    );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default withRouter(Layout);