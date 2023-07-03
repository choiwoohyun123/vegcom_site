import React, { useState, useCallback, useEffect } from 'react';

import { get as getApi } from '../../../api';

import PostCard from '../../components/post/postcard';

function SearchPost() {
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [nextCursor, setNextCursor] = useState(0);
    const [isReached, setIsReached] = useState(false);

    const handleChange = e => {
        setKeyword(e.target.value);
        setNextCursor(0);
    };

    const fetchSearch = useCallback(
        async (keyword, cursor) => {
            try {
                if (cursor === -1) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);
                setIsSave(true);
                const res = await getApi(`/search?keyword=${keyword}&cursor=${cursor}`);
                const searchData = res.data.searchPost;
                if (searchData.length === 0) {
                    alert('게시물이 더이상 없습니다.');
                }

                if (searchData.length < 5) {
                    setNextCursor(-1);
                } else {
                    setNextCursor(searchData[searchData.length - 1].postId);
                }

                let newSearchList;

                if (cursor == 0) {
                    newSearchList = res.data.searchPost;
                } else if (cursor > 0 && searchList.length > 0) {
                    newSearchList = [...searchList, ...searchData];
                } else if (searchData.length === 0) {
                    newSearchList = [...searchList];
                }

                setSearchList(newSearchList);
                setIsReached(false);

                if (cursor != -1) {
                    setIsReached(false);
                    setIsSave(false);
                }
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

    const handleSearchButtonClick = () => {
        fetchSearch(keyword, nextCursor);
    };

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsReached(true);
        }
    }, []);

    useEffect(() => {
        if (searchList.length > 0) {
            fetchSearch(keyword, nextCursor);
        }
        // 스크롤 이벤트 핸들러 등록 및 해제
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchSearch]);

    return (
        <>
            <div className="flex justify-center items-center" style={{ maxWidth: '960px', height: 'auto', marginTop: '-rem' }}>
                <div className="search" style={{ width: '80vw' }}>
                    <div className="mb-8" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                        검색으로 궁금한 식단을 찾아보세요!
                    </div>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            onChange={e => handleChange(e)}
                            value={keyword}
                            type="text"
                            className="block w-full p-4 pl-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="궁금한 식단의 키워드를 검색해 보세요 ex) 샐러드, 당근 ..."
                        />
                        <button
                            onClick={() => handleSearchButtonClick(keyword, 0)}
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-[#008762] hover:bg-[#155745] font-medium rounded-lg text-sm px-4 py-2">
                            검색
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full mt-5">
                {searchList.map(post => (
                    <div key={post.postId}>
                        <PostCard post={post} />
                    </div>
                ))}
                {isLoading && <p>Loading...</p>}
            </div>
        </>
    );
}

export default SearchPost;
