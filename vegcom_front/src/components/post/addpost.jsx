import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { post as postApi } from '../../../api';

function AddPost() {
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        try {
            const formData = new FormData();
            formData.append('image', imageUrl);
            formData.append('content', content);

            await postApi('/post', formData);
            navigate('/story');
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    };

    const handleImageUpload = e => {
        const input = e.target;
        setImageUrl(input.files[0]);

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

    return (
        <div className="addPostContainer">
            <div>
                <h1
                    style={{ fontSize: '2.5rem', color: '#008762', fontWeight: 'bold', marginTop: '-9rem' }}
                    className="h-auto mb-7">
                    식단 기록하기
                </h1>
            </div>
            {imageUrl && (
                <div style={{ width: '200px' }}>
                    <span> 이미지 미리보기 </span>
                    <img className="w-full h-full object-cover" id="preview" alt="Preview" />
                </div>
            )}
            <h2 className="text-left">파일 선택</h2>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">사진 파일을 선택해 주세요.</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG of JPG</p>
                    </div>
                    <div style={{ width: '600px', hegiht: '500px' }}>
                        <input
                            id="dropzone-file"
                            type="file"
                            onChange={e => {
                                handleImageUpload(e);
                            }}
                            className="hidden w-full h-full"
                        />
                    </div>
                </label>
            </div>
            <textarea
                name="postContent"
                id="postContent"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="block w-full rounded-md border-0 mt-3 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="설명을 입력해 주세요."></textarea>
            <div className="buttonSection flex mt-12" style={{ justifyContent: 'center' }}>
                <button
                    onClick={() => navigate('/story')}
                    type="button"
                    className="rounded-2xl mr-2 px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-300">
                    취소
                </button>
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="rounded-2xl ml-2 text-white bg-[#008762] px-10 py-2 shadow-xl backdrop-blur-md transition-colors duration-30 mr-3">
                    올리기
                </button>
            </div>
        </div>
    );
}

export default AddPost;
