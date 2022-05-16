
import { API_URL } from "../config";
import Axios from "axios";


export const UploadImage = (
  file,
) => {

    var bodyFormData = new FormData();
    bodyFormData.set("web_img", file);
 
  return Axios({
    method: 'POST',
    url: API_URL + "/banner_image_upload",
    data: bodyFormData,
  });
};

  

