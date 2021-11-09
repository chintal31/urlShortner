import axios from "axios";

export async function shortUrl(url) {
  try {
    let body = { url };
    const res = await axios.post("/url-shortner", body);
    console.log("res: ", res);
    if (res.status === 200 && res.data && res.data.addedUrl)
      return { success: true, addedUrl: res.data.addedUrl };
    else {
      console.log("In else: ", res);

      return { success: false, error: res.err };
    }
  } catch (error) {
    console.error("Error: ", error);

    error =
      error.response && error.response.data
        ? error.response.data.err
        : error.message;
    return { success: false, error };
  }
}

export async function fetchAllUrls() {
  try {
    const res = await axios.get("/fetchAllUrls");
    console.log("res: ", res);
    if (res.status === 200 && res.data && res.data.urls)
      return { success: true, urls: res.data.urls };
    else {
      console.log("In else: ", res);

      return { success: false, error: res.err };
    }
  } catch (error) {
    console.error("Error: ", error);

    error =
      error.response && error.response.data
        ? error.response.data.err
        : error.message;
    return { success: false, error };
  }
}
