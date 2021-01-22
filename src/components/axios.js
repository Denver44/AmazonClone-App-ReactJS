// fetch the request.

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/clone-80082/us-central1/api", // THE API (Cloud Function) URL
});

export default instance;
