import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// internal imports
import { API_ENDPOINTS, API_URL, options } from '@/common/constants/endpoints';
import { ROUTES } from '@/common/constants/routes';
import { CryptoDetails } from '@/common/contract';
import {
    FAVORITES,
    LOGGED_IN,
    getValueFromLocalStorage,
    setValueToLocalStorage,
} from '@/common/utils/localStorageMethods';
import Header from '@/components/Header';
import { SpinnerLoader } from '@/components/SpinnerLoader';

const Details: NextPage = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [currencyDetails, setCurrencyDetails] =
        useState<CryptoDetails | null>(null);

    const handleFavorites = () => {
        if (!currencyDetails) {
            return;
        }
        const favoritesArray: CryptoDetails[] =
            getValueFromLocalStorage(FAVORITES);
        if (isFavorited) {
            removeFromFavorites(favoritesArray);
            return;
        }
        addToFavorites(favoritesArray);
    };

    const addToFavorites = (favoritesArray: CryptoDetails[]) => {
        if (!currencyDetails) {
            return;
        }
        const currentCurrency: CryptoDetails[] = favoritesArray
            ? [...favoritesArray, currencyDetails]
            : [currencyDetails];

        setIsFavorited(true);
        setValueToLocalStorage(FAVORITES, currentCurrency);

        const symbol = router.query?.symbol;
        alert(`${symbol} is added to favorites`);
    };

    const removeFromFavorites = (favoritesArray: CryptoDetails[]) => {
        const symbol = router.query?.symbol;
        const filteredFavorites = favoritesArray.filter(
            (item) => item.name !== symbol
        );
        setIsFavorited(false);
        setValueToLocalStorage(FAVORITES, filteredFavorites);
    };

    useEffect(() => {
        const favoritesArray: CryptoDetails[] =
            getValueFromLocalStorage(FAVORITES);
        console.log(favoritesArray, 'favoritesArray');

        const loggedIn: string = getValueFromLocalStorage(LOGGED_IN);

        if (loggedIn === 'true') {
            setIsLogin(true);
        }

        if (!router.query?.symbol) {
            router.push(ROUTES.HOME);
            return;
        }

        const symbol = router.query?.symbol;

        if (favoritesArray) {
            const isFavorited = favoritesArray.some(
                (item) => item.name === symbol
            );

            if (isFavorited) {
                setIsFavorited(true);
            }
        }

        fetch(`${API_URL + API_ENDPOINTS.PUBTICKER}/${symbol}`, options)
            .then((response) => response.json())
            .then((response) =>
                setCurrencyDetails({ ...response, name: symbol })
            )
            .catch((err) => console.error(err));

        setIsLoading(false);
    }, [router]);

    if (isLoading) {
        return <SpinnerLoader />;
    }

    return (
        <div className="min-h-screen px-5 py-10">
            <Head>
                <title>Details - Crypto Currency</title>
            </Head>
            <Header />
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th className="w-[200px] text-left">Name</th>
                        <th className="w-[150px] text-right">Last Price</th>
                        <th className="w-[150px] text-right">High</th>
                        <th className="w-[150px] text-right">Low</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-primary font-bold hover:underline cursor-pointer">
                            {currencyDetails?.name}
                        </td>
                        <td className="text-right">
                            {currencyDetails?.last_price}
                        </td>
                        <td className="text-right">{currencyDetails?.high}</td>
                        <td className="text-right">{currencyDetails?.low}</td>
                    </tr>
                </tbody>
            </table>
            {!!isLogin && (
                <button
                    className={clsx(
                        ' text-white px-5 py-2 font-bold hover:underline cursor-pointer mt-3',
                        isFavorited
                            ? 'bg-red-500 hover:bg-red-400'
                            : 'bg-primary hover:bg-primary-light'
                    )}
                    onClick={handleFavorites}>
                    {!isFavorited
                        ? 'Add to favorites'
                        : 'Remove from favorites'}
                </button>
            )}
        </div>
    );
};

export default Details;
