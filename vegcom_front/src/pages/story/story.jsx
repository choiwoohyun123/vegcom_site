import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { get as getApi } from '../../../api';

import PostCard from '../../components/post/postcard';

function Story() {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [nextCursor, setNextCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isReached, setIsReached] = useState(false);

    const fetchPost = useCallback(
        async cursor => {
            try {
                if (cursor === -1) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);

                const res = await getApi(`post/list/${cursor}`);

                const postData = res.data;

                if (postData.postList?.length < 5) {
                    setNextCursor(-1);
                } else {
                    setNextCursor(postData.postList[postData.postList.length - 1].postId);
                }

                let newPostList;

                if (cursor === 0) {
                    newPostList = postData.postList;
                } else if (cursor > 0 && postData.postList.length > 0) {
                    newPostList = [...postList, ...postData.postList];
                } else if (postData.postList.length === 0) {
                    newPostList = [...postList];
                }

                setPostList(newPostList);

                setIsReached(false);
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
        [isReached],
    );

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsReached(true);
        }
    }, []);

    useEffect(() => {
        // 페이지 초기 렌더링 시에 postList를 불러오기 위해 fetchPost 호출
        fetchPost(nextCursor);
        // 스크롤 이벤트 핸들러 등록 및 해제
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchPost]);

    return (
        <div className="flex justify-center" style={{ width: '900px' }}>
            <div>
                <div className="justify-center flex items-center mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl w-full font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                        함께 실천하는 사람들을 만나 보세요.
                    </h2>
                </div>
                <div className="flex mb-10" style={{ justifyContent: 'center' }}>
                    <div className="searchButton w-auto mr-5" onClick={() => navigate('/searchPost')}>
                        검색하기
                    </div>
                    <div className="addPostButton btn-2 w-auto " onClick={() => navigate('/addpost')}>
                        식단 기록하기
                    </div>
                </div>
                {postList.map(post => (
                    <div key={post.postId}>
                        <PostCard post={post} />
                    </div>
                ))}
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default Story;
