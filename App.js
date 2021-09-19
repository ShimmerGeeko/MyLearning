import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { Route, BrowserRouter } from "react-router-dom";
import LayoutOp from "./components/LayoutOp/layoutOp.jsx";
import CustHome from "./components/LayoutCust/CustHome.jsx";
import CustIndex from "./components/LayoutCust/CustIndex.jsx";
import CustInfo from "./components/LayoutCust/CustInfo.jsx";
import BadgeOverlap from "./components/common/Badge.jsx";
import CustReview from "./components/LayoutCust/CustReview.jsx";
import ScheduleNow from "./components/LayoutCust/ScheduleNow.jsx";
import CustCallIndex from "./components/LayoutCust/CustCallIndex.jsx";
import CustAccountIndex from "./components/AccountOpening/CustAccountIndex.js";
import AccountopeningInfo from "./components/AccountOpening/AccountopeningInfo.jsx";
import CreditCardIndex from "./components/CreditCard/CreditCardIndex.js";
//import Kycaccopening from "./components/CreditCard/Kycaccopening";
import RekycIndex from "./components/RekycForm/RekycIndex.jsx";
import Custinfocc from "./components/CreditCard/CustInfoCC.jsx";
import CustInfoReKYC from "./components/RekycForm/CustInfoReKYC.jsx";
import ScheduleCall from "./components/LayoutCust/ScheduleCall.jsx";
import OperatorCallIndex from "./components/LayoutOp/OperatorCallIndex.jsx";
import "./index.css";
import Login from "./components/LayoutOp/layoutOp.jsx";
import AuthorizerKYCStatusfrom from "./components/Authorizer/AuthorizerKYCStatus.jsx";
import AuthorizerDashboard from "./components/Authorizer/AuthorizerDashboard.jsx";
import AdminDashboard from "./components/Authorizer/AdminDashboard.jsx";
import { Dashboard } from "./components/LayoutOp/Dashboard.jsx";
import './i18n';
import CreateUser from './components/Authorizer/createUser.jsx';
import EditUser from './components/Authorizer/editUser.jsx';
import AuthorizerCk from "./components/Authorizer/AuthorizorCK";
import CustAadharFile from "./components/LayoutCust/CustAadharFile";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="VideoKyc">
        {/* Opertator path start */}
        <Route exact path="/login" component={Login} />

        <Route exact path="/OperatorCallIndex" component={OperatorCallIndex} />

        {/* Opertator path End */}
        {/* Customer path start */}
        <Route
          exact
          path="/AuthorizerDashboard"
          component={AuthorizerDashboard}
        />
        <Route exact path="/AdminDashboard" component={AdminDashboard} />
        <Route exact path="/CreateUser" component={CreateUser} />
        <Route exact path="/custInformation" component={CustAadharFile} />
        <Route exact path="/EditUser" component={EditUser} />
        <Route exact path="/Dashboard" component={Dashboard} />
        <Route exact path="/" component={CustHome} />
        <Route exact path="/custIndex" component={CustIndex} />
        <Route exact path="/custInfo" component={CustInfo} />
        <Route exact path="/custInfoReKYC" component={CustInfoReKYC} />
        <Route exact path="/CustAccountIndex" component={CustAccountIndex} />
        <Route
          exact
          path="/AuthorizerKYCStatusfrom"
          component={AuthorizerKYCStatusfrom}
        />
        <Route
          exact
          path="/AccountopeningInfo"
          component={AccountopeningInfo}
        />
        <Route exact path="/RekycIndex" component={RekycIndex} />
        <Route exact path="/CreditCardIndex" component={CreditCardIndex} />
        <Route exact path="/Custinfocc" component={Custinfocc} />
        <Route exact path="/CustReview" component={CustReview} />
        <Route exact path="/ScheduleNow" component={ScheduleNow} />
        <Route exact path="/CustCallIndex" component={CustCallIndex} />
        <Route exact path="/ScheduleCall" component={ScheduleCall} />
        <Route exact path="/AuthorizerCk" component={AuthorizerCk} />
        <Route exact path="/l" component={LayoutOp} />
        <Route exact path="/x" component={BadgeOverlap} />
        {/* Customer path End */}
      </BrowserRouter>
    </Provider>
  );
}
