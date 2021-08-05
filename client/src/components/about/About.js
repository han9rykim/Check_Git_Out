import React from 'react';
import qs from 'qs';   //parsing library

function About( {location}){
    // console.log(location);
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true   //query문에서 ?생략하려고
    });

    const detail = query.detail ==='true';

    console.log(query);


    return (
			<div>
				<h1>About</h1>
				<h2>Github 자동 이력관리 서비스</h2>
				{detail && <p>detail is true!</p>}
				<h2>
					오픈소스 기여 장려를 위한 서비스입니다. <br></br>오픈소스에 기여하면서 랭킹과
					교내외활동 인증 배지까지!!
				</h2>
				<p>
					<h4>문제: Github를 통한 개발자의 이력 파악</h4>
					<h4>목적: 대학생들의 오픈소스 기여 장려</h4>
					<ul>
						학교별 github을 사용하는 학생들의 랭킹 및 상호관계 표현
						<br />
						깃헙 아이디를 이용하여 개발자의 이력서를 자동완성
						<br />
						학생의 교내외 활동 관리를 보다 간편하게 하기
					</ul>
				</p>
			</div>
		);
}


export default About;