import React, { useState, useEffect, useReducer, createContext, useContext, lazy, Suspense } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { get as getApi } from './api.js';
import { loginReducer } from './reducer.jsx';

import Header from './src/sections/header.jsx';
import HeaderLogout from './src/sections/headerlogout.jsx';
import Footer from './src/sections/footer.jsx';
import Loading from './src/pages/loading.jsx';

const LoginForm = lazy(() => import('./src/pages/login/loginform'));
const RegisterForm = lazy(() => import('./src/pages/register/registerform'));
const MainPage = lazy(() => import('./src/pages/mainpage/mainpage'));
const Rank = lazy(() => import('./src/pages/rank/rank'));
const Story = lazy(() => import('./src/pages/story/story'));
const AddPost = lazy(() => import('./src/components/post/addpost'));
const PostDetail = lazy(() => import('./src/components/post/postdetail'));
const UserEdit = lazy(() => import('./src/components/user/useredit'));
const UserDetail = lazy(() => import('./src/components/user/userdetail'));
const PostEdit = lazy(() => import('./src/components/post/postedit'));
const SearchPost = lazy(() => import('./src/pages/story/searchpost'));
const NotFound = lazy(() => import('./src/pages/notfound'));

export const UserStateContext = createContext(null);
export const useUserStateContext = () => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error('현재 context를 호출하는 범위가 유효하지 않습니다.');
    }
    return context;
};
export const DispatchContext = createContext(null);

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = localStorage.getItem('userToken');

    const path = location.pathname;
    // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await getApi('user/isLogin');
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: currentUser,
            });

            console.log('%c localStorage에 토큰 있음.', 'color: #d93d1a;');
        } catch (err) {
            console.log('%c localStorage에 토큰 없음.', 'color: #d93d1a;');
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();

        if (isLogin && (path === '/login' || path === 'register' || path === '/')) {
            navigate('/rank');
        }
        if (!isLogin && path != '/login' && path != '/register' && path != '/') {
            navigate('/login');
            alert('로그인한 유저만 접근할 수 있습니다.');
        }
    }, []);

    if (!isFetchCompleted) {
        return <Loading />;
    }

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                <Suspense fallback={<Loading />}>
                    {isLogin && (
                        <>
                            <Header />
                        </>
                    )}
                    {location.pathname === '/' && (
                        <>
                            <HeaderLogout />
                        </>
                    )}
                    {/* <MainPage /> */}
                    <Routes>
                        <Route path="/" exact element={<MainPage />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/rank" element={<Rank />} />
                        <Route path="/story" element={<Story />} />
                        <Route path="/addpost" element={<AddPost />} />
                        <Route path="/useredit" element={<UserEdit />} />
                        <Route path="/post/:postId" element={<PostDetail />} />
                        <Route path="/mypage/:userId" element={<UserDetail />} />
                        <Route path="/postedit/:postId" element={<PostEdit />} />
                        <Route path="/searchpost" element={<SearchPost />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    {isLogin && (
                        <>
                            <Footer />
                        </>
                    )}
                </Suspense>
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
