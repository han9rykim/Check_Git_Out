import axios from "axios";
import { useEffect } from "react";
import qs from "qs";
import { Octokit } from "@octokit/rest";
import Spinner from "react-bootstrap/Spinner";

function Callback({ history, location }) {
  useEffect(() => {
    async function getToken() {
      const { code } = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });
      try {
        // 이 부분은 express에 요청하여 JWT 토큰을 발급합니다.
        const response = await axios.post(`http://168.188.129.200:3001/auth`, {
          code,
        });
        localStorage.setItem("access_token", response.data.access_token);
        const access_token = localStorage.getItem("access_token");

        const { data } = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `token ${access_token}`,
          },
        });
        // const user = new Octokit({
        //   auth: String(access_token),
        // });

        localStorage.setItem("username", data.login);
        localStorage.setItem("ProfileURL", data.avatar_url);

        history.push("/"); // 로그인이 완료되면 보여줄 페이지
      } catch (error) {
        history.push("/error"); // api요청이 실패했을때 애러 핸들링 페이지
      }
    }

    getToken();
  }, [location, history]);

  return (
    <div>
      <Spinner animation="border" />
    </div>
  );
}

export default Callback;
