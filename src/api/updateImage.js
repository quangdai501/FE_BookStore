import axios from "axios";

export const updateImage = async (file) => {
  try {
    const CLIENT_ID = "9c91f1381f04ebfca748c8df47eb1632";
    const url = "https://api.imgbb.com/1/upload";
    const config={
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    params:{
        key:CLIENT_ID
    }
  }
    const imgurForm = new FormData();
    imgurForm.append("image", file);

    const {data} = await axios.post(url, imgurForm,config );
    // console.log(data);
    return data
  } catch (error) {
    return error
  }
};
