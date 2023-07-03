import React from 'react';

function HeaderLogout() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'white' }}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1"></div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 mr-5">
                        Login <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a href="/register" className="text-sm font-semibold leading-6 text-gray-900">
                        Register <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default HeaderLogout;
