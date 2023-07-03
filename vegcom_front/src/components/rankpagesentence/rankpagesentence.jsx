import React, { useState, useCallback, useEffect } from 'react';

import { get as getApi } from '../../../api';

const RankPageSentence = () => {
    const [userCount, setUserCount] = useState();
    const [postCount, setPostCount] = useState();

    const usersPostData = { users: 100, post: 124 };

    const fetchCount = useCallback(async () => {
        try {
            const res = await getApi('post/count');
            const CountData = res.data;

            setPostCount(CountData.postCount);
            setUserCount(CountData.userCount);
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    }, []);

    useEffect(() => {
        fetchCount();
    }, [fetchCount]);

    return (
        <div className="p-4 m-2">
            <p className="text-lg font-sans font-bold">
                오늘
                <span className="text-2xl text-green-700"> {userCount}</span>
                명의 사람들이
                <span className="text-2xl text-green-700"> {postCount}</span>끼 채식을 했어요!
            </p>
        </div>
    );
};

export default RankPageSentence;
