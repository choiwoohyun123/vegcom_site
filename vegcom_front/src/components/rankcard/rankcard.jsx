import React from 'react';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import TierDecision from '../../utils/tierdecision';

const RankCard = ({ user, index }) => {
    const getImageSrc = () => {
        if (user.userImage.startsWith('http')) {
            user.userImage = user.userImage;
            return user.userImage;
        } else {
            user.userImage = `${BUCKET_BASE_URL}${user.userImage}`;
            return user.userImage;
        }
    };
    return (
        <div className="flex flex-col items-center">
            {index == 1 && <img style={{ height: '7vh' }} src="/1등왕관.png" alt="1등왕관"></img>}
            <div className="flex p-10 m-2 bg-white shadow-lg rounded-xl">
                <div className="usercard flex flex-row justify-between items-center text-center">
                    <p style={{ color: '#008762', fontSize: '3rem' }} className="ml-5 mr-5 text-xl font-bold">
                        {index}
                    </p>
                    <img
                        style={{ height: '15vh' }}
                        className="mr-5 object-cover rounded-full"
                        src={getImageSrc()}
                        alt={user.id}
                    />
                    <div className="ml-3 w-full">
                        <div className="text-left ">
                            <p style={{ fontFamily: 'SUITE-Regular', fontSize: '1.5rem' }} className="text-lg mb-2">
                                {user.nickname}
                            </p>
                            <p className="text-md">누적 포인트: {user.accuPoint}</p>
                            <p className="text-md">총 게시물 수: {user.storyCount}</p>
                            <div className="flex justify-start">
                                <div>등급:</div>
                                <img
                                    className="w-5 h-5 ml-2"
                                    src={TierDecision(user.accuPoint)[2]}
                                    alt={TierDecision(user.accuPoint)[0]}
                                />
                                {TierDecision(user.accuPoint)[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankCard;
