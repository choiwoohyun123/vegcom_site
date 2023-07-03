import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { post as postApi } from '../../../api';

function RegisterForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [imageUrl, setImageUrl] = useState('http://placekitten.com/200/200');

    const validateEmail = useCallback(
        email => {
            return email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                );
        },
        [email],
    );

    const isEmailValid = useMemo(() => validateEmail(email), [email]);
    const isPasswordValid = useMemo(() => password.length >= 10, [password]);
    const isPasswordSame = useMemo(() => password === confirmPassword, [confirmPassword]);
    const isNicknameValid = useMemo(() => nickname.length >= 2 && nickname.length <= 10, [nickname]);

    // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
    const isFormValid = useMemo(
        () => isEmailValid && isPasswordValid && isPasswordSame && isNicknameValid,
        [isEmailValid, isPasswordValid, isPasswordSame, isNicknameValid],
    );

    const handleSubmit = async e => {
        try {
            const res = await postApi('user/register', {
                email,
                password,
                nickname,
                imageUrl,
            });
            alert(res.data);

            // 로그인 페이지로 이동함.
            navigate('/login');
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    };

    return (
        <div className="-mt-40 justify-center flex font-['NanumSquareNeo-Variable']">
            <div className="registerForm">
                <div className="-mt-40 mb-10 justify-center flex">
                    <img
                        onClick={() => navigate('/')}
                        src="/logolong.png"
                        alt="오채완 로고"
                        className="logo mb-10"
                        style={{ width: '800px', height: 'auto', maxWidht: '55vh' }}></img>
                </div>

                <div>
                    <div style={{ alignItems: 'center' }}>
                        <div className="space-y-15">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h1 style={{ color: '#008762', fontWeight: 'bold', fontSize: '2rem', marginBottom: '1rem' }}>
                                    회원가입
                                </h1>
                                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>오채완에서 탄소 감축을 함께 실현해요!</p>

                                <div className="grid grid-cols-1 gap-y-1">
                                    <div className="sm:col-span-4 flex items-center">
                                        <label
                                            htmlFor="email"
                                            className="block text-md font-medium leading-6 text-gray-900 pr-4"
                                            style={{ width: '160px' }}>
                                            이메일
                                        </label>
                                        <div className="mt-2 flex-grow">
                                            <div className="text-md flex-grow rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="w-full block border-0 bg-transparent py-1.5 pl-1 text-md text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="이메일을 입력해 주세요"
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {!isEmailValid && email !== '' && (
                                            <p style={{ marginLeft: '160px' }} className="text-success">
                                                이메일 형식이 올바르지 않습니다.
                                            </p>
                                        )}
                                        {!isFormValid && email === '' && (
                                            <p style={{ marginLeft: '160px' }} className="text-success">
                                                이메일을 입력해주세요.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className=" grid grid-cols-1 gap-y-1">
                                    <div className="sm:col-span-4 flex items-center">
                                        <label
                                            htmlFor="nickname"
                                            className="block text-md font-medium leading-6 text-gray-900 pr-4"
                                            style={{ width: '160px' }}>
                                            닉네임
                                        </label>
                                        <div className="mt-2 flex-grow">
                                            <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="text"
                                                    name="nickname"
                                                    id="nickname"
                                                    className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="이름을 입력해 주세요"
                                                    value={nickname}
                                                    onChange={e => setNickname(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {!isNicknameValid && nickname.length === 0 && (
                                            <p style={{ marginLeft: '160px' }} className="text-success mt-2">
                                                닉네임을 입력해 주세요.
                                            </p>
                                        )}
                                        {!isNicknameValid && nickname.length < 2 && (
                                            <p style={{ marginLeft: '160px' }} className="text-success mt-2">
                                                닉네임은 2글자 이상으로 설정해 주세요.
                                            </p>
                                        )}

                                        {!isNicknameValid && nickname.length > 10 && (
                                            <p style={{ marginLeft: '160px' }} className="text-success mt-2">
                                                닉네임은 10글자 이하로 설정해 주세요.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className=" grid grid-cols-1 gap-y-1">
                                    <div className="sm:col-span-4 flex items-center">
                                        <label
                                            htmlFor="password"
                                            className="block text-md font-medium leading-6 text-gray-900 pr-4"
                                            style={{ width: '160px' }}>
                                            비밀번호
                                        </label>
                                        <div className="mt-2 flex-grow">
                                            <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="비밀번호를 입력해 주세요"
                                                    value={password}
                                                    onChange={e => setPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {!isPasswordValid && (
                                            <p style={{ marginLeft: '160px' }} className="text-success mt-2">
                                                비밀번호는 10글자 이상으로 설정해 주세요.
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className=" grid grid-cols-1 gap-y-1">
                                    <div className="sm:col-span-4 flex items-center">
                                        <label
                                            htmlFor="confirmpassword"
                                            className="block text-md font-medium leading-6 text-gray-900 pr-4"
                                            style={{ width: '160px' }}>
                                            비밀번호 확인
                                        </label>
                                        <div className="mt-2 flex-grow">
                                            <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                                                <input
                                                    type="password"
                                                    name="confirmpassword"
                                                    id="confirmpassword"
                                                    className="w-full block border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="비밀번호를 다시 입력해 주세요"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {!isPasswordSame && (
                                            <p style={{ marginLeft: '160px' }} className="text-success mt-2">
                                                비밀번호가 일치하지 않습니다.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex text-lg justify-center gap-x-6">
                                <button
                                    type="button"
                                    className="rounded-2xl px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-30 mr-3"
                                    onClick={() => navigate('/login')}
                                    style={{ color: 'black' }}>
                                    로그인하기
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    disabled={!isFormValid}
                                    className={`rounded-2xl px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 ${
                                        isFormValid ? 'bg-[#008762] hover:bg-[#00B282]' : 'bg-gray-400 cursor-not-allowed'
                                    }`}>
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
