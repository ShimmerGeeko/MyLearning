import { serviceURL,panDetectionURL, schServiceURL,  CBSURL, aadhaarDetectionURL, panOCRURL, MaskDetectionURL, LivenessCheckURL, PassportOCR_URL, FaceVerification } from './ApiConstant';
import axios from 'axios';

class HttpService {
  PostAjaxData(data, ApiController) {
    
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(serviceURL + ApiController, data, options);
  }

  PostCBSAjaxData(data, ApiController) { 
    debugger;
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(CBSURL + ApiController, data, options);
  }

  PostAjaxData_Multipart(data, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios.post(serviceURL + ApiController, data, options);
  }

  PostAjaxDataSCH(data, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(schServiceURL + ApiController, data, options);
  }

  PostAjaxDataDetectServer1(data, port, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(detectionServer1URL + port + ApiController, data, options);
  }

  
  PostAjaxDataDetectServerPancard(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("panDetectionURL", panDetectionURL )
    console.log("process.env.panDetectionURL", process.env.panDetectionURL);
    return axios.post(panDetectionURL, data, options);
  }

  PostAjaxDataDetectServerAadharcard(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(aadhaarDetectionURL, data, options);
  }

  PostAjaxDataDetectServerMaskDetection(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(MaskDetectionURL, data, options);
  }


  PostAjaxDataDetectServer1_Multipart(data, port, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios.post(detectionServer1URL + port + ApiController, data, options);
  }

  PostAjaxDataDetectServer_LivenessCheck(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios.post(LivenessCheckURL, data, options);
  }

  PostAjaxDataDetectServer2(data, port, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(detectionServer2URL + port + ApiController, data, options);
  }

  PostAjaxDataDetectServerPanOcr(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(panOCRURL, data, options);
  }

  GetJsonData(ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.get(ApiController);
  }

  PostAjaxDataDetectAPI(data, ApiController) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(detectionServerAPI + ApiController, data, options);
  }

  PostAjaxDataDetectAPI_PassportOcr(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(PassportOCR_URL, data, options);
  }

  PostAjaxDataCompareFace(data) {
    const options = {
      // method : method,
      // body : JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return axios.post(FaceVerification, data, options);
  }
}


export default new HttpService();
