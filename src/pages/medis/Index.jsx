import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/layout/DefaultLayout';
import axios from 'axios';
import { AppContext } from '@/Context/AppContext';

import { FaRegTrashCan } from "react-icons/fa6";
import PaginationPage from '@/components/PaginationPage';
import SearchInput from '@/components/SearchInput';
import AnimatePulse from '@/components/AnimatePulse';
import useDebounce from '@/hooks/useDebounce';

import API_URL from '@/config/api';

export default function Index() {
    const { token } = useContext(AppContext);
    const [docter, setDocter] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const debounceSearchValue = useDebounce(searchValue, 500)

    useEffect(() => {
        fetchData();
    }, [page, search]);

    useEffect(() => {
        setSearch(debounceSearchValue);
        setPage(1)
    }, [debounceSearchValue]);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `${API_URL}/medis/laporan?page=${page}&search=${search}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(function (response) {
            // console.log(response.data);
            setIsLoading(false)
            setDocter(response.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    // console.log(docter);

    const deleteDocter = async (id) => {
        const confirmEvent = confirm('Are you sure!');
        if (confirmEvent) {
            const deleteResult = await axios({
                method: 'delete',
                url: `${API_URL}/laporan/delete/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (deleteResult) {
                fetchData();
            }
        }
    }


    const paginatePage = async (link) => {
        // console.log(link);
        const page = new URL(link);
        setPage(page.searchParams.get('page'))
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Docter" />

            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="py-6 px-4 md:px-6 xl:px-7.5">


                        <SearchInput searchValue={searchValue} setSeacrhValue={setSearchValue} />
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        {isLoading ? (<AnimatePulse />) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                            Pasien
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Keluhan
                                        </th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                            Docter
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            diagnosa
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Obat
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Ruangan
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Tanggal
                                        </th>
                                        <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {docter.data?.map((packageItem, key) => (
                                        <tr key={key}>
                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {packageItem.pasien_id}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.keluhan}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.docter_id}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.diagnosa}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.obat_id}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.ruang_id}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.tanggal}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] text-center py-5 px-4 dark:border-strokedark">
                                                <div className="space-x-3.5">
                                                    <button className="hover:text-primary" onClick={() => deleteDocter(packageItem.id)}>
                                                        <FaRegTrashCan />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )}

                        <PaginationPage dataPage={docter} paginatePage={paginatePage} />

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
