import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeartIcon } from '@heroicons/react/24/solid';

import Loading from '../../pages/loading';

import { get as getApi } from '../../../api';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetDays from '../../utils/getdays';
import { chunkArray } from '../../utils/chunkArray';

function UserDetail() {
    // post/:postId 로 받아와서 구현
    const location = useLocation();
    const navigate = useNavigate();

    const currentUserId = localStorage.getItem('userId');
    const userId = location.pathname.match(/\/mypage\/(\d+)/)[1];

    const isEditing = currentUserId === userId;

    const [userInfo, setUserInfo] = useState([]);
    const [userImage, setUserImage] = useState('');
    const [archivePostList, setArchivePostList] = useState([]);
    const [likePostList, setLikePostList] = useState([]);

    const [isFetchArchiveCompleted, setIsFetchArchiveCompleted] = useState(false);
    const [isFetchLikesCompleted, setIsFetchLikesCompleted] = useState(false);
    const [isSelect, setIsSelect] = useState(false);

    const fetchArchive = useCallback(
        async userId => {
            try {
                // 유저 id를 가지고 "/user/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
                const user = await getApi(`user/${userId}`);
                // 사용자 정보는 response의 data임.
                const userData = user.data.userInfo;
                // portfolioOwner을 해당 사용자 정보로 세팅함.
                setUserInfo(userData);

                const imageUrl = user.data.userInfo.userImage;
                if (imageUrl.startsWith('http')) {
                    setUserImage(imageUrl);
                } else {
                    setUserImage(`${BUCKET_BASE_URL}${imageUrl}`);
                }

                const archiveList = await getApi(`post/mypage/${userId}`);
                setArchivePostList(archiveList.data.userPostList);
                setIsFetchArchiveCompleted(true);
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

    const fetchLikes = useCallback(
        async userId => {
            try {
                const likesList = await getApi(`post/like/${userId}`);
                setLikePostList(likesList.data.userLikePostList);
                setIsFetchLikesCompleted(true);
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

    const getImageSrc = useCallback(
        imageUrl => {
            if (imageUrl.startsWith('http')) {
                return imageUrl;
            } else {
                return `${BUCKET_BASE_URL}${imageUrl}`;
            }
        },
        [userId],
    );

    useEffect(() => {
        fetchArchive(userId);
        fetchLikes(userId);
    }, [fetchArchive, fetchLikes]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!isFetchArchiveCompleted && !isFetchLikesCompleted) {
        return <Loading />;
    }

    return (
        <div style={{ width: '60vw' }}>
            <div className="w-full flex justify-center ">
                <div>
                    <div
                        className="p-2 userDetailCard flex justify-center p-4 m-2 bg-white shadow-md rounded-xl items-center"
                        style={{ width: '65vh', height: '25vh' }}>
                        <div className="flex flex-row justify-between items-center">
                            <img
                                style={{ height: '15vh' }}
                                className="object-cover pl-2 rounded-full mb-2 mr-5"
                                src={userImage}
                                alt={userInfo.id}
                            />
                            <div className=" text-left mr-7">
                                <div style={{ fontFamily: 'SUITE-Regular', fontSize: '1.5rem' }}>{userInfo.nickname}</div>
                                <div style={{ fontSize: '1rem', whiteSpace: 'pre-line' }} className="mt-1">
                                    {userInfo.description}
                                </div>
                                <div style={{ fontSize: '0.9rem' }} className="mt-2">
                                    가입한 지 {GetDays(userInfo.createAt)}일 총 게시물 수 {userInfo.storyCount}
                                </div>
                            </div>
                        </div>
                    </div>

                    {isEditing ? (
                        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex mt-10 mb-10">
                            <button
                                className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-l-full px-4 py-2 active"
                                id="grid"
                                onClick={() => setIsSelect(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="fill-current w-4 h-4 mr-2">
                                    <rect x="3" y="3" width="6" height="7" />
                                    <rect x="14" y="3" width="6" height="7" />
                                    <rect x="14" y="14" width="6" height="7" />
                                    <rect x="3" y="14" width="6" height="7" />
                                </svg>
                                <span>Archive</span>
                            </button>

                            <button
                                className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-r-full px-4 py-2"
                                id="list"
                                onClick={() => setIsSelect(true)}>
                                <HeartIcon
                                    className="fill-current w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <span>Likes</span>
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex mt-10 mb-10">
                            <button
                                className="inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-full px-4 py-2 active"
                                id="grid"
                                onClick={() => setIsSelect(false)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="fill-current w-4 h-4 mr-2">
                                    <rect x="3" y="3" width="6" height="7" />
                                    <rect x="14" y="3" width="6" height="7" />
                                    <rect x="14" y="14" width="6" height="7" />
                                    <rect x="3" y="14" width="6" height="7" />
                                </svg>
                                <span>Archive</span>
                            </button>
                        </div>
                    )}
                    <div>
                        {!isSelect ? (
                            <div>
                                {archivePostList.length === 0 ? (
                                    <div>
                                        {currentUserId === userId ? (
                                            <div>
                                                <div
                                                    className="text-center"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '1.5rem',
                                                        marginTop: '1rem',
                                                        marginBottom: '2rem',
                                                    }}>
                                                    {' '}
                                                    <span style={{ color: '#008762' }}>{userInfo.nickname}</span> 님은 글을 아직
                                                    작성하지 않으셨네요!
                                                </div>
                                                <div className="goAdd" onClick={() => navigate('/addpost')}>
                                                    식단 기록하러 가기 →
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="text-center"
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem',
                                                    marginTop: '1rem',
                                                    marginBottom: '2rem',
                                                }}>
                                                <span style={{ color: '#008762' }}>{userInfo.nickname}</span> 님은 글을 아직
                                                작성하지 않았어요.
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full bg-white shadow-md rounded-xl pt-5 pb-5 pl-3 pr-3">
                                        {chunkArray(archivePostList, 3).map((row, rowIndex) => (
                                            <div key={rowIndex} className="flex justify-left">
                                                {row.map((item, index) => (
                                                    <div key={index} className="flex items-center mx-2">
                                                        <img
                                                            className="object-cover mb-2"
                                                            style={{ width: '18vh', height: '18vh' }}
                                                            src={getImageSrc(item.imageUrl)}
                                                            alt={item.id}
                                                            onClick={() => navigate(`/post/${item.id}`)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="w-full bg-white shadow-md rounded-xl pt-5 pb-5 pl-5">
                                    {chunkArray(likePostList, 3).map((row, rowIndex) => (
                                        <div key={rowIndex} className="flex justify-left">
                                            {row.map((item, index) => (
                                                <div key={index} className="flex items-center mx-2">
                                                    <img
                                                        className="object-cover mb-2"
                                                        style={{ width: '18vh', height: '18vh' }}
                                                        src={getImageSrc(item.imageUrl)}
                                                        alt={item.id}
                                                        onClick={() => navigate(`/post/${item.id}`)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDetail;
