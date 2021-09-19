import { STORE_CUST } from "../actions/mainAction";

export function mainReducer(
  state = {
    red_ApplType: 0,
    // red_CustMob: '9967451865',
    red_CustMob: "",
    red_CustId: "",
    red_CustBreadcrumb: {},
    JointRefId: "NA",
    sesParamExistingCust: "",
    sesParamCustId: "",
    // red_CustId: "3103210000000102",
    sesParamOpUserId: "",
    sesParamOpUserCode: "",
    sesParamOpUserRole: "",
    sesParamCBSCustNo: "",
    red_OperatorRefId: "",
    red_OperatorMobileNo: "",
    red_latitude:"",
    red_longitude:"",
    basic_CustomerData:{},
    pending_custId:""
  },
  action
) {
  switch (action.type) {
    case STORE_CUST:
      // console.log('case in ', action);
      state[action.key] = action.value;
      return Object.assign({}, state);
    default:
      return state;
  }
}
