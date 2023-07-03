# 🌱 하루 한끼의 채식! 지구의 내일을 바꿔요!

<br/>

<img src="./vegcom_front/public/logoshort.png" alt="logo" width="10%" />

<br/>

## 📄 개요

- 서비스명: 오채완
- 기획 기간: 2023.05.26 ~ 2023.06.01
- 개발 기간: 2023.06.01 ~ 2023.06.16
- 주제: 환경 보호
- 목표: 데이터 분석 수치를 활용해 **육류소비의 탄소배출량의 심각성 파악** 및 **유저 간 채식문화 장려 하는 서비스 제공**
- API 문서: [바로가기](https://docs.google.com/spreadsheets/d/1t-DNUbVY4GI5NZWTBwCLrzPFFoJMj4t_p9wfY_jemhA/edit?usp=sharing)

<br/>

## 🫶 팀원 소개

**민준영**

- Back-End

**정재훈**

- Back-End

**김지원**

- Back-End

**이영현**

- Front-End

**최우현**

- Front-End

<br/>

## 기술 스택

### Front-End

<div>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
</div>
<br />

### Server-Infra

<div>
<img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
<img src="https://img.shields.io/badge/pm2-2B037A?style=flat-square&logo=pm2&logoColor=white"/>
</div>
<br />

## 🗂 프로젝트 구조

### [Front-End ](#)

```
📦src
 ┣ 📂components
 ┃ ┣ 📂datagraph
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┣ 📜co2bargarphdata.js
 ┃ ┃ ┃ ┣ 📜linegraphdata.js
 ┃ ┃ ┃ ┗ 📜piegraphdata.js
 ┃ ┃ ┗ 📂graph
 ┃ ┃ ┃ ┣ 📜bargraph.jsx
 ┃ ┃ ┃ ┣ 📜co2bargraph.jsx
 ┃ ┃ ┃ ┣ 📜linegraph.css
 ┃ ┃ ┃ ┣ 📜linegraph.jsx
 ┃ ┃ ┃ ┗ 📜piegraph.jsx
 ┃ ┣ 📂pointbar
 ┃ ┃ ┗ 📜pointbar.jsx
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜addpost.jsx
 ┃ ┃ ┣ 📜postcard.jsx
 ┃ ┃ ┣ 📜postdetail.jsx
 ┃ ┃ ┗ 📜postedit.jsx
 ┃ ┣ 📂rankcard
 ┃ ┃ ┗ 📜rankcard.jsx
 ┃ ┣ 📂rankpagesentence
 ┃ ┃ ┗ 📜rankpagesentence.jsx
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📜usercard.jsx
 ┃ ┃ ┣ 📜userdetail.jsx
 ┃ ┃ ┗ 📜useredit.jsx
 ┣ 📂pages
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜loginform.jsx
 ┃ ┣ 📂mainpage
 ┃ ┃ ┗ 📜mainpage.jsx
 ┃ ┣ 📂rank
 ┃ ┃ ┗ 📜rank.jsx
 ┃ ┣ 📂register
 ┃ ┃ ┗ 📜registerform.jsx
 ┃ ┣ 📂story
 ┃ ┃ ┣ 📜searchpost.jsx
 ┃ ┃ ┗ 📜story.jsx
 ┃ ┣ 📜loading.jsx
 ┃ ┗ 📜notfound.jsx
 ┣ 📂sections
 ┃ ┣ 📜header.jsx
 ┃ ┗ 📜headerlogout.jsx
 ┗ 📂utils
 ┃ ┣ 📂conts
 ┃ ┃ ┗ 📜bucket.js
 ┃ ┣ 📜chunkArray.js
 ┃ ┣ 📜getdays.js
 ┃ ┣ 📜gethours.js
 ┃ ┣ 📜gettime.js
 ┃ ┗ 📜tierdecision.js> `
```

### [Back-End](#)

```
📦src
 ┣ 📂controllers
 ┃ ┣ 📜commentController.js
 ┃ ┣ 📜likeController.js
 ┃ ┣ 📜postController.js
 ┃ ┣ 📜rankController.js
 ┃ ┣ 📜searchController.js
 ┃ ┗ 📜userController.js
 ┣ 📂db
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Comment.js
 ┃ ┃ ┣ 📜Like.js
 ┃ ┃ ┣ 📜Post.js
 ┃ ┃ ┣ 📜Rank.js
 ┃ ┃ ┣ 📜Search.js
 ┃ ┃ ┗ 📜User.js
 ┃ ┗ 📜index.js
 ┣ 📂middlewares
 ┃ ┣ 📜addComment_validate.js
 ┃ ┣ 📜addPost_validate.js
 ┃ ┣ 📜commentParams_validate.js
 ┃ ┣ 📜errorMiddleware.js
 ┃ ┣ 📜getComment_validate.js
 ┃ ┣ 📜getPost_vaildate.js
 ┃ ┣ 📜login_required.js
 ┃ ┣ 📜login_validate.js
 ┃ ┣ 📜postParams_validate.js
 ┃ ┣ 📜register_validate.js
 ┃ ┣ 📜search_validate.js
 ┃ ┣ 📜setComment_validate.js
 ┃ ┣ 📜setPost_validate.js
 ┃ ┣ 📜setUser_validate.js
 ┃ ┗ 📜userParams_validate.js
 ┣ 📂routers
 ┃ ┣ 📜commentRouter.js
 ┃ ┣ 📜likeRouter.js
 ┃ ┣ 📜postRouter.js
 ┃ ┣ 📜rankRouter.js
 ┃ ┣ 📜searchRouter.js
 ┃ ┗ 📜userRouter.js
 ┣ 📂services
 ┃ ┣ 📜commentService.js
 ┃ ┣ 📜likeService.js
 ┃ ┣ 📜postService.js
 ┃ ┣ 📜rankService.js
 ┃ ┣ 📜searchService.js
 ┃ ┗ 📜userService.js
 ┣ 📂utils
 ┃ ┗ 📜statusCode.js
 ┣ 📜app.js
 ┣ 📜aws.config.js
 ┗ 📜babel.config.json
```

<br />

## 🔎 주요기능

- **회원가입, 로그인 기능**: 사용자의 회원 가입 및 로그인 기능 제공
- **식단 업로드 기능**: 비건, 베지테리언 식단 업로드 가능
- **피드 댓글, 대댓글 기능**: 식단 피드에서 댓글, 대댓글을 통해 유저들과 소통 가능
- **탄소 배출 감소량에 따른 포인트 부여**: 식단 피드 업로드하면 포인트 부여
- **마이페이지 기능**:
  - 개인 정보, 포인트, 좋아요 등을 확인할 수 있는 마이페이지 기능 제공
  - 개인 정보, 포인트, 좋아요 등
  - 올린 식단 사진 archive
  - 좋아요한 피드 archive
- **개인정보수정 기능**: 닉네임, 프로필사진, 자기소개 수정 가능
- **건강 배틀 sns**: 포인트 적립 순위 리스트(랭킹) 기능
- **Infinite Scroll**: 스크롤을 통해 오래된 피드도 볼 수 있게 하여 사용자의 몰입도를 높이기 위한 기능능
- **게시물 검색 기능**: 검색한 내용과 일치하는 모든 피드들을 볼 수 있는 기능

## 🏁 테스트 방법

---

1. 해당 프로젝트를 clone 합니다.

   ```
   git clone https://github.com/choiwoohyun123/vegcom_site.git
   ```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

   ```
   cd vegcom_front
   yarn install
   ```

3. 프론트엔드를 실행합니다.

   ```
   cd vegcom_front
   yarn dev
   ```

<br />

## <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red"><title>YouTube Studio</title><path d="M20.919 13.176c.048-.384.084-.768.084-1.176s-.036-.792-.084-1.176l2.532-1.98a.605.605 0 0 0 .144-.768l-2.4-4.152a.603.603 0 0 0-.732-.264l-2.988 1.2a8.767 8.767 0 0 0-2.028-1.176l-.456-3.18A.585.585 0 0 0 14.403 0h-4.8c-.3 0-.552.216-.588.504l-.456 3.18A9.22 9.22 0 0 0 6.531 4.86l-2.988-1.2a.585.585 0 0 0-.732.264l-2.4 4.152a.592.592 0 0 0 .144.768l2.532 1.98c-.048.384-.084.78-.084 1.176s.036.792.084 1.176l-2.532 1.98a.605.605 0 0 0-.144.768l2.4 4.152c.144.264.468.36.732.264l2.988-1.2c.624.48 1.296.876 2.028 1.176l.456 3.18a.585.585 0 0 0 .588.504h4.8c.3 0 .552-.216.588-.504l.456-3.18a9.22 9.22 0 0 0 2.028-1.176l2.988 1.2c.276.108.588 0 .732-.264l2.4-4.152a.605.605 0 0 0-.144-.768l-2.532-1.98zM9.603 15.6V8.4l6 3.6-6 3.6z"/></svg> Demo Vedio

---

[![오채완 시연영상](http://img.youtube.com/vi/oaIJNOqY1oQ/0.jpg)](https://www.youtube.com/watch?v=oaIJNOqY1oQ "오채완 시연영상")
