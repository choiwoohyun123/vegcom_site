import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserCircleIcon } from '@heroicons/react/24/solid';

import { put as putApi, get as getApi } from '../../../api';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';

function UserEdit() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem('userId'));
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [userImage, setUserImage] = useState('');

    const isDesValid = useMemo(() => description?.length <= 200, [description]);
    const isNicknameValid = useMemo(() => nickname.length < 10 && nickname.length >= 2);

    const isFormValid = useMemo(() => isDesValid && isNicknameValid, [isDesValid, isNicknameValid]);

    const handleSubmit = async userId => {
        try {
            const formData = new FormData();
            formData.append('image', userImage);
            formData.append('nickname', nickname);
            formData.append('description', description);

            await putApi(`/user/${userId}`, formData);
            navigate(`/mypage/${userId}`);
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    };

    const fetchUser = useCallback(
        async userId => {
            try {
                const res = await getApi(`user/${userId}`);
                const userData = res.data.userInfo;
                setDescription(userData.description);
                setNickname(userData.nickname);

                if (userData.userImage.startsWith('http')) {
                    setUserImage(userData.userImage);
                } else {
                    setUserImage(`${BUCKET_BASE_URL}${userData.userImage}`);
                }
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            }
        },
        [userId],
    );

    const handleImageUpload = e => {
        const input = e.target;

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                const preview = document.getElementById('preview');
                if (preview) {
                    preview.src = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    useEffect(() => {
        fetchUser(userId);
    }, []);

    return (
        <div className="userEditForm relative flex justify-center" style={{ marginTop: '-10rem' }}>
            <div>
                <h2 style={{ color: '#008762', fontWeight: 'bold', fontSize: '2rem', marginBottom: '1rem' }}>유저 정보 변경</h2>
                <div className="formSection flex flex-col mt-10" style={{ width: '40vw', minWidth: '350px' }}>
                    <label
                        style={{ fontWeight: 'bold' }}
                        htmlFor="username"
                        className="text-left  block text-md font-medium leading-6 text-gray-900">
                        닉네임
                    </label>
                    <div className="userNickname w-full mt-2">
                        <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <textarea
                                type="text"
                                className="w-60 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                                placeholder={nickname}
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}></textarea>
                        </div>
                        <div>
                            {!isNicknameValid && nickname.length === 0 && <p className="text-sm mt-2">닉네임을 입력해 주세요.</p>}
                            {!isNicknameValid && nickname.length < 2 && (
                                <p className="text-sm mt-2">닉네임은 2글자 이상으로 설정해 주세요.</p>
                            )}

                            {!isNicknameValid && nickname.length > 10 && (
                                <p className="text-sm mt-2">닉네임은 10글자 이하로 설정해 주세요.</p>
                            )}
                        </div>
                    </div>

                    <label
                        htmlFor="userImage"
                        style={{ fontWeight: 'bold' }}
                        className="text-left  mt-7 block text-md font-medium leading-6 text-gray-900">
                        프로필 사진
                    </label>
                    <div className="imageSection grid-cols-2">
                        <div className="mt-2 flex items-center gap-x-3">
                            {userImage && (
                                <div>
                                    <img className="h-12 w-12 text-gray-300" id="preview" src={userImage} alt="Preview" />
                                </div>
                            )}
                            {/* <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                            <input
                                onChange={e => {
                                    setUserImage(e.target.files[0]);
                                    handleImageUpload(e);
                                }}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                type="file"
                                multiple></input>
                        </div>
                    </div>
                    <label
                        htmlFor="about"
                        style={{ fontWeight: 'bold' }}
                        className=" text-left mt-7 block text-md font-medium text-gray-900">
                        자기소개
                    </label>
                    <div className="w-full mt-2">
                        <textarea
                            autoComplete={description}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "></textarea>
                        <div>{!isDesValid && <p className="text-sm mt-2">자기소개는 200자까지 입력할 수 있습니다.</p>}</div>
                    </div>
                    <div style={{ marginTop: '5rem' }} className="buttonSection justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="rounded-2xl px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-30 mr-3">
                            취소
                        </button>
                        <button
                            onClick={() => handleSubmit(userId)}
                            type="submit"
                            className={`rounded-2xl px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 ${
                                isFormValid ? 'bg-[#008762] hover:bg-[#00B282]' : 'bg-gray-400 cursor-not-allowed'
                            }`}>
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
