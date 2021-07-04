
import React, { Suspense, useState,useEffect } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  withRouter,
  Redirect
} from 'react-router-dom';
import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Layout from "../Layout/Layout";
import routes from '../../routes';
import {useDispatch,useSelector} from "react-redux";
import {getUser} from "../../Store/ActionCreators/authentication";

const Unauthorized = React.lazy(()=>import("../Unauthorized/Unauthorized"));

function withLayout(WrappedComponent,heading,jumbo) {
  return class extends React.PureComponent {
    render() {
      return (
        <Layout heading={heading} jumbo={jumbo}>
          <WrappedComponent />
        </Layout>
      );
    }
  };
}

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

function App(props) {
  const dispatch = useDispatch();
  const authentication = useSelector(state => state.authentication)
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    dispatch(getUser()).then(()=>{
      setLoading(false);     
    });
  }, [])
  return (
    <>
      <Router>
        <Suspense fallback={Loader()}>
          <Switch>
            
            {
              loading?
                <Loader/>
              :
              !authentication.user?
                routes.map((route, idx) =>
                <Route
                  path={route.path}
                  exact
                  component={route.noAuth?route.component:Unauthorized}
                  key={idx}
                />
                )
                :
                routes.map((route, idx) =>
                  <Route
                    path={route.path}
                    exact
                    component={route.noAuth?route.component:withLayout(route.component,route.heading,route.jumbo)}
                    key={idx}
                  />
                )
            }
            <Redirect to="/404"/>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
export default App;
