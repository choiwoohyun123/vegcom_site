import React, { useState, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { DispatchContext } from '../../App';

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Footer() {
    const userId = localStorage.getItem('userId');
    const mymenu = [
        { name: '마이페이지', description: '마이페이지', href: `/mypage/${userId}`, icon: UserCircleIcon },
        { name: '정보 수정', description: '유저 정보 수정', href: `/useredit`, icon: UserIcon },
    ];

    return (
        <footer className="mt-20" style={{ backgroundColor: '#D6E8D8', height: '8rem' }}>
            <div className="flex items-center justify-center">
                <nav className="mx-auto flex max-w-7xl items-top justify-center p-2 lg:px-8" aria-label="Global">
                    <div>
                        <button
                            onClick={() => navigate('/rank')}
                            style={{ backgroundColor: '#D6E8D8' }}
                            className="headermenu flex focus: ring-blue-300 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            RANK
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/story')}
                            style={{ backgroundColor: '#D6E8D8' }}
                            className="headermenu flex focus: ring-blue-300 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            STORY
                        </button>
                    </div>
                    <div>
                        <p
                            style={{ backgroundColor: '#D6E8D8' }}
                            className="headermenu flex focus: ring-blue-300 ml-7 mt-2 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            My Page
                        </p>
                        <button
                            onClick={() => navigate(`/mypage/${userId}`)}
                            style={{ backgroundColor: '#D6E8D8', color: 'grey', paddingTop: '0.4rem', paddingBottom: '0.1rem' }}
                            className="headermenu flex focus: ring-blue-300 ml-2 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            마이페이지
                        </button>
                        <button
                            onClick={() => navigate('/useredit')}
                            style={{ backgroundColor: '#D6E8D8', color: 'grey', paddingTop: '0.1rem', paddingBottom: '0.1rem' }}
                            className="headermenu flex focus: ring-blue-300 ml-3 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            정보수정
                        </button>
                    </div>
                    <div>
                        <div className="flex items-center justify-center mb-4">
                            <img style={{ width: '11vh', height: '9vh', paddingTop: '0.4rem' }} src={'/flaticon.png'} alt="" />
                        </div>
                    </div>
                    <div>
                        <a
                            href={`https://kdt-gitlab.elice.io/ai_track/class_07/data_project/team07`}
                            className="flex items-center justify-center mt-4 mb-4">
                            <img style={{ width: '6vh', height: '2vh' }} src={'/GitLab_logo.png'} alt="" />
                        </a>
                        <p style={{ fontSize: '10px', marginLeft: '0.5rem' }}>서울특별시 성동구 성수2가제3동 광나루로6길 49</p>
                        <p style={{ fontSize: '10px', marginLeft: '0.5rem' }}>민준영, 이영현, 정재훈, 최우현, 김지원</p>

                        <p style={{ fontSize: '10px', marginLeft: '0.5rem' }}>고객센터 070-4633-2017</p>
                    </div>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
