import React, { useContext, useEffect, useState } from 'react';
import CardDataStats from '@/components/CardDataStats.jsx';
import { FaHospitalUser, FaUser, FaUserDoctor, FaUserGroup, FaUserInjured, FaHouseChimneyMedical } from "react-icons/fa6";
import DefaultLayout from '@/layout/DefaultLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '@/Context/AppContext';

import { API_URL, BS_URL } from '@/config/api';

export default function Dashboard() {
    const { token } = useContext(AppContext);
    const [paramData, setParamData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true)
        await axios({
            method: 'get',
            url: `${API_URL}/dashboard`,
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
    return (
        <DefaultLayout>
            <div className="flex mb-6 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5 justify-center">

                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={'/medis/create'}>
                        <div className="flex flex-col items-center pb-10 mt-5">
                            <FaHospitalUser size={'10em'} />
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-3">Rekap Medis</h5>
                        </div>
                    </Link>
                </div>


                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={'/pasien'}>
                        <div className="flex flex-col items-center pb-10 mt-5">
                            <FaUser size={'10em'} />
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-3">Pendaftaran</h5>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">

                <CardDataStats title="Total Pasien" total={paramData.pasien} loading={isLoading}>
                    <FaUserInjured style={{ color: 'blue' }} />
                </CardDataStats>
                <CardDataStats title="Total Karyawan" total={paramData.user} loading={isLoading}>
                    <FaUserGroup style={{ color: 'blue' }} />
                </CardDataStats>
                <CardDataStats title="Total Docter" total={paramData.docter} loading={isLoading}>
                    <FaUserDoctor style={{ color: 'blue' }} />
                </CardDataStats>
                <CardDataStats title="Total Ruangan" total={paramData.ruangan} loading={isLoading}>
                    <FaHouseChimneyMedical style={{ color: 'blue' }} />
                </CardDataStats>
            </div>
        </DefaultLayout>
    );
};

