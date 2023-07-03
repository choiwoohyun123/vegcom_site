import React, { useState, useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { DispatchContext } from '../../App';

import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { UserCircleIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
    const userId = localStorage.getItem('userId');
    const mymenu = [
        { name: '마이페이지', description: '마이페이지', href: `/mypage/${userId}`, icon: UserCircleIcon },
        { name: '정보 수정', description: '유저 정보 수정', href: `/useredit`, icon: UserIcon },
    ];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dispatch = useContext(DispatchContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const [isLogoHovered, setIsLogoHovered] = useState(false);

    const handleLogoMouseEnter = () => {
        setIsLogoHovered(true);
    };

    const handleLogoMouseLeave = () => {
        setIsLogoHovered(false);
    };

    const getLogoSrc = () => {
        return isLogoHovered ? '/logolong.png' : '/logoshort.png';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'white' }}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="justify-center flex lg:flex-1">
                    <a href="/rank" className="-m-1.5 p-1.5">
                        <img
                            onMouseEnter={handleLogoMouseEnter}
                            onMouseLeave={handleLogoMouseLeave}
                            className="logo h-8 w-auto"
                            src={getLogoSrc('/logoshort.png')}
                            alt=""
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Popover className="ml-5 relative flex ">
                        <button
                            onClick={() => navigate('/rank')}
                            className="headermenu flex focus: ring-blue-300 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            RANK
                        </button>
                        <button
                            onClick={() => navigate('/story')}
                            className="headermenu flex focus: ring-blue-300 mr-7 items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            STORY
                        </button>
                        <Popover.Button className="headermenu focus: none flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            MY PAGE
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1">
                            <Popover.Panel className="absolute top-full z-1 mt-3 max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {mymenu.map(item => (
                                        <div
                                            key={item.name}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon
                                                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div className="text-left flex-auto">
                                                <a href={item.href} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </a>
                                                <p className="text-left mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>
                </Popover.Group>
                <div onClick={() => logout()} className="hidden lg:flex lg:flex-1 lg:justify-center">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Logout <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-0 w-100% overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="/logoshort.png" alt="" />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <a
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    HOME
                                </a>
                                <a
                                    href="/rank"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    RANK
                                </a>
                                <a
                                    href="/story"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    STORY
                                </a>
                                <Disclosure as="div" className="-mx-3">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                MY PAGE
                                                <ChevronDownIcon
                                                    className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...mymenu].map(item => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            <div className="py-6">
                                <a
                                    onClick={() => logout()}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}

export default Header;
