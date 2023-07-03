import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { post as postApi } from '../../../api';

import { DispatchContext } from '../../../App';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useContext(DispatchContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
    const validateEmail = useCallback(
        email => {
            if (email === '') {
                return false;
            }
            return email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                );
        },
        [email],
    );

    const isEmailValid = useMemo(() => validateEmail(email), [email]);
    const isPasswordValid = useMemo(() => password.length >= 4, [password]);
    const isFormValid = useMemo(() => isEmailValid && isPasswordValid, [isEmailValid, isPasswordValid]);

    const handleSubmit = async () => {
        try {
            const res = await postApi('user/login', {
                email,
                password,
            });

            const user = res.data;
            const jwtToken = user.token;

            localStorage.setItem('userToken', jwtToken);
            localStorage.setItem('userId', user.userId);

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: user,
            });

            navigate('/rank', { replace: true });
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    };

    return (
        <div className="-mt-40 justify-center flex">
            <div className="login-pag">
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                        onClick={() => navigate('/')}
                        src="/logolong.png"
                        alt="오채완 로고"
                        className="logo mb-10 "
                        style={{ width: '800px', height: 'auto', maxWidht: '55vh' }}></img>
                </div>
                <div className="flex flex-col  ml-10 mr-20 font-['NanumSquareNeo-Variable']">
                    <div className="flex items-center my-2">
                        <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900 mr-2 w-24">
                            이메일
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="flex-grow block text-md rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            placeholder="id@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center my-2">
                        <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900 mr-2 w-24">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="flex-grow text-md block rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            placeholder="*********"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mt-8 flex justify-center text-lg text-black space-x-10">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!isFormValid}
                            className={`rounded-2xl px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 ${
                                isFormValid ? 'bg-[#008762] hover:bg-[#00B282]' : 'bg-gray-400 cursor-not-allowed'
                            }`}>
                            로그인
                        </button>
                        <button
                            type="button"
                            className="rounded-2xl px-10 py-2 shadow-xl backdrop-blur-md transition-colors duration-30 mr-3"
                            onClick={() => navigate('/register')}
                            style={{ color: 'black' }}>
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
