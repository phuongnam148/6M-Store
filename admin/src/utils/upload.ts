import axios from "axios";

export const upload = async (file: string) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dkf6noze7/image/upload",
      data
    );
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default upload;