import { useContext, useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/layout/DefaultLayout';
import axios from 'axios';
import { AppContext } from '@/Context/AppContext';

import { FaPenToSquare, FaRegTrashCan, FaRegSquarePlus, FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import PaginationPage from '@/components/PaginationPage';
import AnimatePulse from '@/components/AnimatePulse';

import { API_URL, BS_URL } from '@/config/api';

export default function Index() {
    const { token } = useContext(AppContext);
    const [paramData, setParamData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetchData();

    }, [page]);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `${API_URL}/obat?page=${page}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(function (response) {
            // console.log(response.data);
            setIsLoading(false)
            setParamData(response.data.data);
        }).catch((err) => {
            console.log(err);
        });
    }
    // console.log(paramData);

    const deleteData = async (id) => {
        const confirmEvent = confirm('Are you sure!');
        if (confirmEvent) {
            const deleteResult = await axios({
                method: 'delete',
                url: `${API_URL}/obat/delete/${id}`,
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
            <Breadcrumb pageName="Obat" />

            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="py-6 px-4 md:px-6 xl:px-7.5">

                        <div className="flex items-center justify-between">

                            <Link
                                to={`/obat/create`}
                                className="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                <FaRegSquarePlus size={20} className='me-2' />
                                Tambah
                            </Link>
                        </div>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        {isLoading ? (<AnimatePulse />) : (
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-2 text-left dark:bg-meta-4">

                                        <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                            Nama
                                        </th>
                                        <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                            Keterangan
                                        </th>
                                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {paramData.data?.map((packageItem, key) => (
                                        <tr key={key}>

                                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                                <h5 className="font-medium text-black dark:text-white">
                                                    {packageItem.name}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <p className="text-black dark:text-white">
                                                    {packageItem.keterangan}
                                                </p>
                                            </td>

                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                <div className="flex items-center space-x-3.5">
                                                    <Link
                                                        to={`/obat/edit/${packageItem.id}`}
                                                        className=" rounded-lg hover:text-primary"
                                                    >
                                                        <FaPenToSquare />
                                                    </Link>
                                                    <button className="hover:text-primary" onClick={() => deleteData(packageItem.id)}>
                                                        <FaRegTrashCan />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <PaginationPage dataPage={paramData} paginatePage={paginatePage} />

                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};
