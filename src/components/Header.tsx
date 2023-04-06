import Link from 'next/link';
import { useEffect, useState } from 'react';

// internal imports
import { ROUTES } from '@/common/constants/routes';
import {
    LOGGED_IN,
    getValueFromLocalStorage,
    setValueToLocalStorage,
} from '@/common/utils/localStorageMethods';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { SpinnerLoader } from './SpinnerLoader';

const Header = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const loggedIn: string = getValueFromLocalStorage(LOGGED_IN);

        if (loggedIn === 'true') {
            setIsLogin(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = () => {
        setValueToLocalStorage(LOGGED_IN, 'true');
        setIsLogin(true);
        if (router.pathname === ROUTES.DETAILS) {
            router.push(ROUTES.HOME)
        }
    };
    if (isLoading) {
        return <SpinnerLoader />;
    }

    return (
        <div className="mb-3 flex justify-between">
            <div>
                <Link
                    className={clsx(
                        'hover:underline cursor-pointer',
                        router.pathname === ROUTES.HOME
                            ? 'text-primary font-bold'
                            : 'text-gray-400'
                    )}
                    href="/">
                    Home
                </Link>

                {isLogin && (
                    <Link
                        className={clsx(
                            'hover:underline cursor-pointer ml-3',
                            router.pathname === ROUTES.FAVORITES
                                ? 'text-primary font-bold'
                                : 'text-gray-400'
                        )}
                        href="/favorites">
                        Favorites
                    </Link>
                )}
            </div>
            {!isLogin && (
                <button
                    className="bg-primary text-white px-5 py-2 font-bold hover:underline cursor-pointer "
                    onClick={handleLogin}>
                    Login
                </button>
            )}
        </div>
    );
};

export default Header;
