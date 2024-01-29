import axios from "axios";
import { useEffect } from "react";
import { GOOGLE_CALL_BACK, baseUrl } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";
import Spinner from "../../../Components/Global/Spinner";
export default function GoogleCaLLBack() {
  const cookie = Cookie();
  const location = useLocation();

  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          baseUrl + GOOGLE_CALL_BACK + location.search
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
        window.location.pathname = "/";
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, [cookie,location.search]);
  return <Spinner />;
}
