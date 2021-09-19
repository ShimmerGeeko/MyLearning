// export const serviceURL = 'http://192.168.4.145/FinVkycDemoWebAPI/api/';
// export const schServiceURL = 'http://192.168.4.145/FinVkycScheduleManagerDemoWebAPI/api/';

// //WebRTC Start
// export const webSocketURL = 'ws://192.168.4.46:9090';
// export const MODEL_URL = './models'

// export const stunURL = 'stun:stun2.1.google.com:19302';
// export const turnURL = 'turn:turn.203.112.132.52:3478';
// export const turnUsername = 'finturnadmin';
// export const turnCredential = 'fincore@123';
// //WebRTC End

// export const detectionServer1URL = 'http://192.168.4.113:'
// export const detectionServer2URL = 'http://192.168.4.130:'
// export const detectionServerAPI = 'http://192.168.4.130:7073'

// export const Port = '7060'

// export const CBSURL = "http://192.168.4.248/fcvnxtwebapiexternal/ex/api/";


// const panOCRURL = 'http://192.168.4.130:7068/PanOCR';
// const panDetectionURL = 'http://192.168.4.113:7060/PanDetection';
// const passportDetectionURL = 'http://192.168.4.113:7061/PassportDetection';
// const aadhaarDetectionURL = 'http://192.168.4.113:7063/AadhaarDetection';
// const aadhaarMaskingURL = 'http://192.168.4.130:7066/AadhaarMasking';
// const MaskDetectionURL = ' http://192.168.4.113:7064/MaskDetection';
// const MaskDetectionURL_DEV = 'http://192.168.4.113:7001/MaskDetection';

// const LivenessCheckURL = 'http://192.168.4.130:7069/LivenessCheck';


// export const serviceURL = 'http://192.168.4.145/FinVkycDemoWebAPI/api/';
// export const schServiceURL = 'http://192.168.4.145/FinVkycScheduleManagerDemoWebAPI/api/';

export const serviceURL = process.env.REACT_APP_SERVER_URL +'/FinVkycDemoWebAPI/api/';
export const schServiceURL = process.env.REACT_APP_SERVER_URL +'/FinVkycScheduleManagerDemoWebAPI/api/';

// export const webSocketURL = 'ws://192.168.4.46:9090';
export const webSocketURL = process.env.REACT_APP_WEBSOCKET_URL;
export const MODEL_URL = process.env.PUBLIC_URL + '/models';

// export const stunURL = 'stun:stun2.1.google.com:19302';
export const stunURL = process.env.REACT_APP_STUN_URL;
// export const turnURL = 'turn:203.112.132.52:5349?transport=tcp';
export const turnURL = process.env.REACT_APP_TURN_URL;
export const turnUsername = 'finturnadmin';
export const turnCredential = 'fincore@123';

// export const CBSURL = 'http://192.168.4.248/fcvnxtwebapiexternal/ex/api/';
export const CBSURL = process.env.REACT_APP_CBS_URL + '/fcvnxtwebapiexternal/ex/api/';

// const IP_Address = 'http://192.168.4.113'
const IP_Address = process.env.REACT_APP_IP_ADDRESS;


// const Port = '6006'

const Port = process.env.REACT_APP_PORT;
const VideoKycInteface_URL = '/VideoKycInterface'

// const Root_URL = 'http://' + IP_Address + ':' + Port + VideoKycInteface_URL
const Root_URL =  IP_Address + ':' + Port + VideoKycInteface_URL

export const panDetectionURL = Root_URL + '/PanDetection'
export const panOCRURL = Root_URL + '/PanOCR'
export const aadhaarDetectionURL = Root_URL + '/AadhaarDetection'
// export const aadhaarMasking_URL = Root_URL + '/AadhaarMasking'
// export const PassportMRZDetails_URL = Root_URL + '/PassportMRZDetails'
export const PassportOCR_URL = Root_URL + '/PassportOCR'
export const FaceDetection_URL = Root_URL + '/FaceDetection'
export const MaskDetectionURL = Root_URL + '/MaskDetection'
export const LivenessCheckURL = Root_URL + '/LivenessCheck'
export const FaceVerification = Root_URL + '/FaceVerification'
// export const FaceVerification_URL = Root_URL + '/FaceVerification'


// const serviceURL = 'https://bharatvkyc.finacuspayments.com:8443/FinDemoVkycWebAPI';
// const schServiceURL = 'https://bharatvkyc.finacuspayments.com:8443/FinDemoVkycScheduleManagerWebAPI';

// const webSocketURL = 'wss://bharatvkyc.finacuspayments.com:9191';
// const MODEL_URL = './models'

// const stunURL = 'stun:stun2.1.google.com:19302';
// const turnURL = 'turn:203.112.132.52:5349?transport=tcp';
// const turnUsername = 'finturnadmin';
// const turnCredential = 'fincore@123';

// const CBSURL = 'http://192.168.4.248/fcvnxtwebapiexternal/ex';

// const IP_Address = 'bharatvkyc.finacuspayments.com'
// const Port = '7060'
// const VideoKycInteface_URL = '/VideoKycInterface'

// const Root_URL = 'https://' + IP_Address + ':' + Port + VideoKycInteface_URL

// const panDetectionURL = Root_URL + '/PanDetection'
// const panOCRURL = Root_URL + '/PanOCR'
// const aadhaarDetectionURL = Root_URL + '/AadhaarDetection'
// const aadhaarMasking_URL = Root_URL + '/AadhaarMasking'
// const PassportMRZDetails_URL = Root_URL + '/PassportMRZDetails'
// const PassportOCR_URL = Root_URL + '/PassportOCR'
// const FaceDetection_URL = Root_URL + '/FaceDetection'
// const MaskDetectionURL = Root_URL + '/MaskDetection'
// const LivenessCheckURL = Root_URL + '/LivenessCheck'
// const FaceVerification_URL = Root_URL + '/FaceVerification'