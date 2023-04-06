import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// internal imports
import { ROUTES } from '@/common/constants/routes';
import { CryptoDetails } from '@/common/contract';
import {
    FAVORITES,
    getValueFromLocalStorage,
} from '@/common/utils/localStorageMethods';
import Header from '@/components/Header';

const Favorites: NextPage = () => {
    const router = useRouter();

    const [favorites, setFavorites] = useState<CryptoDetails[] | null>(null);

    const goToDetails = (symbol: string) => {
        router.push({
            pathname: ROUTES.DETAILS,
            query: 'symbol=' + symbol,
        });
    };

    useEffect(() => {
        const favoritesArray: CryptoDetails[] =
            getValueFromLocalStorage(FAVORITES);

        setFavorites(favoritesArray);
    }, []);

    return (
        <div className="min-h-screen px-5 py-10">
            <Head>
                <title>Favorites - Crypto Currency</title>
            </Head>
            <Header />
            <table className="crypto-table">
                <thead>
                    <tr>
                        <th className="w-[200px] text-left">Name</th>
                        <th className="w-[150px] text-right">Last Price</th>
                        <th className="w-[150px] text-right">Mid</th>
                        <th className="w-[150px] text-right">Bid</th>
                        <th className="w-[150px] text-right">High</th>
                        <th className="w-[150px] text-right">Low</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites?.length ? (
                        favorites?.map((item) => (
                            <tr key={item.name}>
                                <td
                                    className="text-primary font-bold hover:underline cursor-pointer"
                                    onClick={() => goToDetails(item.name)}>
                                    {item?.name}
                                </td>
                                <td className="text-right">
                                    {item?.last_price}
                                </td>
                                <td className="text-right">{item?.bid}</td>
                                <td className="text-right">{item?.mid}</td>
                                <td className="text-right">{item?.high}</td>
                                <td className="text-right">{item?.low}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">
                                No favorited data
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Favorites;
