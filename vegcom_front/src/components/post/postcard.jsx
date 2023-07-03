import React, { Fragment, useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, EllipsisVerticalIcon, TrashIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

import { get as getApi, post as postApi, del as delApi } from '../../../api';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetHours from '../../utils/gethours';

function PostCard({ post }) {
    const [commentsZero, setCommentsZero] = useState([]);
    const [commentsOther, setCommentsOther] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem('userId'));
    const [disabled, setDisabled] = useState(false);

    const isEditable = useMemo(() => userId === post.userId, [userId, post.userId]);

    const handleClick = useCallback(
        post => {
            navigate(`/post/${post.postId}`);
        },
        [post],
    );

    const handlePostDelete = async postId => {
        await delApi(`/post/${postId}`);
        window.location.replace('/story');
    };

    const handleCommentDelete = async commentId => {
        await delApi(`/comment/${commentId}`);
        window.location.replace('/story');
    };

    const getImageSrc = imageUrl => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        } else {
            imageUrl = `${BUCKET_BASE_URL}${imageUrl}`;
            return imageUrl;
        }
    };
    //likecount, likeuser
    const fetchLikes = useCallback(
        async post => {
            try {
                const res = await getApi(`like/${post.postId}`);
                const likesData = res.data;
                setLikeCount(likesData.likecount);
                setLiked(likesData.likeuser);
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            }
        },
        [post],
    );

    const fetchComments = useCallback(
        async post => {
            try {
                const res = await getApi(`/comment?postId=${post.postId}&cursor=0`);
                const commentDataZero = res.data.commentListZero;
                const commentDataOther = res.data.commentListOther;

                setCommentsZero(commentDataZero);
                setCommentsOther(commentDataOther);
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            }
        },
        [post],
    );

    const handleLike = async (postId, userId) => {
        try {
            if (disabled === true) {
                return;
            }
            setDisabled(true);

            if (liked === false) {
                await postApi(`/like/${postId}`, {
                    postId,
                    userId,
                });

                const res = await getApi(`like/${postId}`);
                const likesData = res.data;
                setLikeCount(likesData.likecount);
                setLiked(likesData.likeuser);
            } else {
                await delApi(`/like/${postId}`);

                const res = await getApi(`like/${postId}`);
                const likesData = res.data;
                setLikeCount(likesData.likecount);
                setLiked(likesData.likeuser);
            }
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        } finally {
            setDisabled(false);
        }
    };

    useEffect(() => {
        fetchLikes(post);
        fetchComments(post);
    }, [fetchLikes, fetchComments]);

    return (
        <div className="postCard shadow-lg rounded-lg mx-auto grid max-w-2xl grid-cols-1 border border-gray-300 pt-5 pl-5 pb-5 pr-5 mb-5">
            <article key={post.postId} className="flex max-w-xl flex-col justify-between text-bold">
                <div className="profileSection relative flex w-full items-center gap-x-4">
                    <div
                        className="flex"
                        onClick={() => {
                            navigate(`/mypage/${post.userId}`);
                            window.scrollTo(0, 0);
                        }}>
                        {post.userImage ? (
                            <img src={getImageSrc(post.userImage)} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        ) : (
                            <img src={'http://placekitten.com/200/200'} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                        )}
                        <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginLeft: '1rem' }}>
                            {post.nickname}
                        </div>
                    </div>
                    {isEditable && (
                        <div className="flex flex-grow justify-end">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900">
                                        <EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="text-center text-sm absolute z-10 w-20 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="py-1">
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => {
                                                    if (post.userId !== userId) {
                                                        alert('접근할 수 없는 페이지입니다.');
                                                    } else {
                                                        navigate(`/postedit/${post.postId}`);
                                                    }
                                                }}>
                                                수정
                                            </div>
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => {
                                                    if (GetHours) {
                                                        if (
                                                            window.confirm(
                                                                '게시물을 작성한 지 48시간이 경과하지 않았습니다. 삭제하면 포인트가 차감됩니다. 정말로 삭제하시겠습니까?',
                                                            )
                                                        ) {
                                                            handlePostDelete(post.postId);
                                                        }
                                                    } else {
                                                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                            handlePostDelete(post.postId);
                                                        }
                                                    }
                                                }}>
                                                삭제
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    )}
                </div>
                <div className="postSection w-full">
                    {post.imageUrl ? (
                        <img src={getImageSrc(post.imageUrl)} alt="Post Image" className="postImage w-full h-auto mt-5" />
                    ) : (
                        <img src={'http://placekitten.com/200/200'} alt="Post Image" className="postImage w-full h-auto mt-5" />
                    )}
                    <div className="flex mt-3">
                        {/* 눌렀을 때 좋아요 상태 변경하는 코드 추가하기 */}
                        {/* <StarIcon className="h-7 w-7" onClick={() => handleLike(post)} /> */}
                        {liked == true ? (
                            <SolidHeartIcon
                                disabled={disabled}
                                onClick={() => handleLike(post.postId, userId)}
                                className="h-7 w-7 cursor-pointer"
                                fill="#ff3040"
                            />
                        ) : (
                            <HeartIcon
                                disabled={disabled}
                                onClick={() => handleLike(post.postId, userId)}
                                className="heartIcon h-7 w-7"
                            />
                        )}
                        <ChatBubbleOvalLeftEllipsisIcon className="cursor-pointer h-7 w-7" onClick={() => handleClick(post)} />
                    </div>
                    <div className="text-left mt-3">
                        <span style={{ fontWeight: 'bold' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                    </div>

                    <div className="mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.nickname}</span>
                        <span style={{ whiteSpace: 'pre-line' }}>{post.content}</span>
                    </div>
                </div>
                <div className="commentSection mt-1">
                    {commentsZero?.slice(0, 3).map(item => (
                        <div className="flex w-full" key={item.id}>
                            <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{item.nickname}</span> {item.content}
                            <div className="flex flex-grow justify-end items-center">
                                {(isEditable || userId === item.userId) && (
                                    <span
                                        className="ml-1 mr-1 text-sm text-gray-600 dark:text-gray-400"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                handleCommentDelete(item.id);
                                            }
                                        }}>
                                        삭제
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default PostCard;
