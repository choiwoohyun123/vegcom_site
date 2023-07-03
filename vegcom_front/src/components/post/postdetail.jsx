import React, { Fragment, useMemo, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';

import Loading from '../../pages/loading';

import { get as getApi, post as postApi, del as delApi, put as putApi } from '../../../api';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetTime from '../../utils/gettime';
import GetHours from '../../utils/gethours';

function PostDetail() {
    // post/:postId 로 받아와서 구현
    const location = useLocation();
    const [post, setPost] = useState([]);
    const userId = Number(localStorage.getItem('userId'));
    const [user, setUser] = useState();
    const postId = location.pathname.match(/\/post\/(\d+)/)[1];
    const [content, setContent] = useState('');
    const [editContent, setEditContent] = useState('');
    const [reContent, setReContent] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [commentsZero, setCommentsZero] = useState([]);
    const [commentsOther, setCommentsOther] = useState([]);
    const [postImage, setPostImage] = useState('');
    const [userImage, setUserImage] = useState('');
    const [isSave, setIsSave] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const path = location.pathname;
    const [isLoading, setIsLoading] = useState(false);
    const [isReached, setIsReached] = useState(false);
    const [nextCursor, setNextCursor] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isReEditing, setIsReEditing] = useState(false);
    const [target, setTarget] = useState('');
    const [reTarget, setReTarget] = useState('');
    const [editTarget, setEditTarget] = useState('');
    const [isFetchCommentCompleted, setIsFetchCommentCompleted] = useState(false);
    const [isFetchPostCompleted, setIsFetchPostCompleted] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            const user = await getApi(`/user/${userId}`);
            const userInfo = user.data.userInfo;
            setUser(userInfo);

            if (userInfo.userImage.startsWith('http')) {
                setPostImage(userInfo.userImage);
            } else {
                setPostImage(`${BUCKET_BASE_URL}${userInfo.userImage}`);
            }
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    }, [userId]);

    const fetchPostDetail = useCallback(async () => {
        try {
            const res = await getApi(path);

            const postData = res.data.post;
            setPost(postData);

            if (postData.imageUrl.startsWith('http')) {
                setPostImage(postData.imageUrl);
            } else {
                setPostImage(`${BUCKET_BASE_URL}${postData.imageUrl}`);
            }

            if (postData.userImage.startsWith('http')) {
                setUserImage(postData.userImage);
            } else {
                setUserImage(`${BUCKET_BASE_URL}${postData.userImage}`);
            }
            setIsFetchPostCompleted(true);
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    }, [path]);

    const fetchComments = useCallback(
        async (postId, cursor) => {
            try {
                if (cursor === -1) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);
                const res = await getApi(`/comment?postId=${postId}&cursor=${cursor}`);

                const commentDataZero = res.data.commentListZero;
                const commentDataOther = res.data.commentListOther;

                if (commentDataZero?.length < 10) {
                    setNextCursor(-1);
                } else {
                    setNextCursor(commentDataZero[commentDataZero.length - 1].id);
                }

                let newCommentsZero;

                if (cursor == 0) {
                    newCommentsZero = res.data.commentListZero;
                } else if (cursor > 0 && commentDataZero.length > 0) {
                    newCommentsZero = [...commentsZero, ...commentDataZero];
                } else if (commentDataZero.length === 0) {
                    newCommentsZero = [...commentsZero];
                }

                setCommentsZero(newCommentsZero);
                setCommentsOther(commentDataOther);

                if (cursor != -1) {
                    setIsReached(false);
                    setIsSave(false);
                }
                setIsFetchCommentCompleted(true);
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            } finally {
                setIsLoading(false);
            }
        },
        [isSave, isReached],
    );

    const handleSubmit = async () => {
        await postApi('/comment', {
            parentId: 0,
            content,
            postId,
        });

        setContent('');
        fetchComments(postId, 0);
    };

    const handleEdit = async commentId => {
        await putApi(`/comment/${commentId}`, {
            commentId,
            postId,
            content: editContent,
        });

        fetchComments(postId, 0);

        setIsEditing(false);
        setEditContent('');
        setIsSave(true);
    };

    const handleReSubmit = async commentId => {
        if (commentId === undefined) {
            commentId = count;
        }
        await postApi('/comment', {
            parentId: commentId,
            content: reContent,
            postId,
        });

        setReContent('');
        setIsReplying(false);

        fetchComments(postId, 0);
    };
    const handleReEdit = async commentId => {
        await putApi(`/comment/${commentId}`, {
            commentId,
            postId,
            content: reContent,
        });

        setIsReEditing(false);
        setIsSave(true);

        fetchComments(postId, 0);
    };

    const handlePostDelete = useCallback(async postId => {
        await delApi(`/post/${postId}`);
        fetchComments(postId, 0);
    });

    const handleCommentDelete = useCallback(async commentId => {
        await delApi(`/comment/${commentId}`);
        fetchComments(postId, 0);
    });

    const isEditable = useMemo(() => userId === post.userId, [userId, post.userId]);

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsReached(true);
        }
    }, []);

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

    const fetchLike = useCallback(
        async postId => {
            try {
                const res = await getApi(`like/${postId}`);
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
        [postId],
    );

    useEffect(() => {
        // 페이지 초기 렌더링 시에 postList를 불러오기 위해 fetchPost 호출
        fetchUser();
        fetchComments(postId, nextCursor);
        fetchPostDetail(postId);
        fetchLike(postId);
        // 스크롤 이벤트 핸들러 등록 및 해제
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchUser, fetchComments, fetchLike]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!isFetchCommentCompleted && !isFetchPostCompleted) {
        return <Loading />;
    }

    return (
        <div className="w-full pt-5 pl-5 pb-5 pr-5 mb-5 flex justify-center">
            <article key={postId} className="flex-col justify-between" style={{ width: '40vw' }}>
                <div className="profileSection flex items-center gap-x-4">
                    <img src={userImage} alt="유저 프로필" className="h-10 w-10 rounded-full bg-gray-50" />

                    <div style={{ display: 'flex', verticalAlign: 'middle' }}>{post.nickname}</div>
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
                                    <Menu.Items className="text-center absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => navigate(`/postedit/${postId}`)}>
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
                <div className="postSection w-full pb-4" style={{ borderBottom: '1px solid #e6e6e6' }}>
                    <img src={postImage} alt="Post Image" className="postImage w-full h-auto mt-5" />
                    <div className="flex mt-3">
                        {liked == true ? (
                            <SolidHeartIcon
                                disabled={disabled}
                                onClick={() => handleLike(postId, userId)}
                                className="cursor-pointer h-7 w-7"
                                fill="#ff3040"
                            />
                        ) : (
                            <HeartIcon
                                disabled={disabled}
                                onClick={() => handleLike(postId, userId)}
                                className="heartIcon h-7 w-7"
                            />
                        )}
                        <ChatBubbleOvalLeftEllipsisIcon className="cursor-pointer h-7 w-7" />
                    </div>

                    <div className="text-left mt-3">
                        <span style={{ fontWeight: 'bold' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                    </div>
                    <div className="flex mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.nickname}</span>
                        <span style={{ color: '#737373' }}> {GetTime(post.createAt)} </span>
                    </div>
                    <div className="text-left" style={{ whiteSpace: 'pre-line' }}>
                        {post.content}
                    </div>
                </div>
                <div className="pt-4 commentSection w-full mt-1 mb-3">
                    {!isReplying && !isEditing && (
                        <div className="pb-3 w-full bg-white" style={{ width: '40vw' }}>
                            <div className="flex mb-4">
                                <textarea
                                    style={{ width: '35vw' }}
                                    className="postInput block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    placeholder="댓글을 입력하세요."
                                    value={content}
                                    onChange={e => setContent(e.target.value)}></textarea>
                                <div className="flex items-center ml-2">
                                    <button
                                        type="submit"
                                        className="postButton flex-grow w-auto bg-blue-500 text-white text-sm rounded-md "
                                        onClick={() => handleSubmit()}>
                                        등록
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* .. parentId === item.id  */}
                    {commentsZero?.map((item, index) => (
                        <div key={item.id}>
                            <div className="mb-6 text-base bg-white dark:bg-gray-900">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p
                                            className="profileSection inline-flex mr-3 text-sm text-gray-900 dark:text-white"
                                            style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                            {item.nickname}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{GetTime(item.createAt)}</p>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        <span
                                            className="ml-1 mr-1"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                !isReplying ? setIsReplying(true) : setIsReplying(false);
                                                setIsEditing(false);
                                                setTarget(item.id);
                                            }}>
                                            답글
                                        </span>
                                        {userId === item.userId && (
                                            <span
                                                className="ml-1 mr-1"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    !isEditing ? setIsEditing(true) : setIsEditing(false);
                                                    setIsReplying(false);
                                                    setEditContent(item.content);
                                                    setEditTarget(item.id);
                                                }}>
                                                수정
                                            </span>
                                        )}
                                        {(isEditable || userId === item.userId) && (
                                            <span
                                                className="ml-1 mr-1"
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
                                <p className="pl-2 text-gray-500 dark:text-gray-400 text-left" style={{ whiteSpace: 'pre-line' }}>
                                    {item.content}
                                </p>
                            </div>
                            {isReplying && target === item.id && (
                                <div className="ml-6 pl-2 pb-3 w-full bg-white" style={{ width: '40vw' }}>
                                    <div className="flex mt-4">
                                        <textarea
                                            style={{ width: '33.1vw' }}
                                            className="postInput block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            placeholder="답글을 입력하세요."
                                            onChange={e => setReContent(e.target.value)}></textarea>
                                        <div className="flex items-center ml-2">
                                            <button
                                                type="submit"
                                                className="postButton flex-grow w-auto bg-blue-500 text-white text-sm rounded-md"
                                                onClick={() => handleReSubmit(item.id)}>
                                                등록
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {isEditing && editTarget === item.id && (
                                <div className="ml-6 pl-2 pb-3 w-full bg-white" style={{ width: '40vw' }}>
                                    <div className="flex mt-4">
                                        <textarea
                                            style={{ width: '33.1vw' }}
                                            className="postEditInput block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            value={editContent}
                                            onChange={e => setEditContent(e.target.value)}></textarea>
                                        <div className="flex items-center ml-2">
                                            <button
                                                type="submit"
                                                className="postButton flex-grow w-auto bg-blue-500 text-white text-sm rounded-md"
                                                onClick={() => handleEdit(item.id)}>
                                                수정
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {commentsOther
                                ?.filter(comment => comment.parentId === item.id)
                                .map((comment, index) => (
                                    <div className="ml-8 mb-6 text-base dark:bg-gray-900" key={comment.id}>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p
                                                    className="profileSection inline-flex mr-3 text-sm text-gray-900 dark:text-white"
                                                    style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                                    {comment.nickname}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {GetTime(comment.createAt)}
                                                </p>
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {userId === comment.userId && (
                                                    <span
                                                        className="ml-1 mr-1"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            isReEditing ? setIsReEditing(false) : setIsReEditing(true);
                                                            setReContent(comment.content);
                                                            setTarget(item.id);
                                                            setReTarget(comment.id);
                                                        }}>
                                                        수정
                                                    </span>
                                                )}
                                                {(isEditable || userId === comment.userId) && (
                                                    <span
                                                        className="ml-1 mr-1"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => {
                                                            if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                                handleCommentDelete(comment.id);
                                                            }
                                                        }}>
                                                        삭제
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <p
                                            className="pl-2 text-gray-500 dark:text-gray-400 text-left"
                                            style={{ whiteSpace: 'pre-line' }}>
                                            {comment.content}
                                        </p>

                                        {isReEditing && target === item.id && reTarget === comment.id && (
                                            <div className="ml-6 pb-3 bg-white" style={{ width: '40vw' }}>
                                                <div className="flex mt-4">
                                                    <textarea
                                                        style={{ width: '32vw' }}
                                                        className="postEditInput block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                        value={reContent}
                                                        onChange={e => setReContent(e.target.value)}></textarea>
                                                    <div className="flex items-center ml-2">
                                                        <button
                                                            type="submit"
                                                            className="postButton flex-grow w-auto bg-blue-500 text-white text-sm rounded-md"
                                                            onClick={() => handleReEdit(comment.id, comment.parentId)}>
                                                            수정
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </div>
                    ))}

                    {isLoading && <p>Loading...</p>}
                </div>
            </article>
        </div>
    );
}

export default PostDetail;
