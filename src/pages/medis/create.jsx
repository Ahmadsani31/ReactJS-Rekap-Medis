import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/layout/DefaultLayout';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/Context/AppContext';
import axios from 'axios';
import Select from 'react-select'
import { toast } from "react-toastify";

import API_URL from '@/config/api';

export default function Edit() {
    const { token } = useContext(AppContext);

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [dataDocter, setDataDocter] = useState([]);
    const [dataPasien, setDataPasien] = useState([]);
    const [dataRuangan, setDataRuangan] = useState([]);
    const [dataObat, setDataObat] = useState([]);

    const [form, setForm] = useState({
        pasien_id: "",
        docter_id: "",
        ruang_id: "",
        obat_id: [],
        keluhan: "",
        diagnosa: "",
    })


    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        // console.log(name, value)
        setForm({ ...form, [name]: value });
    }

    const [errors, setErrors] = useState({});


    async function handlePost(e) {
        e.preventDefault();
        setIsLoading(true);

        await axios({
            method: 'post',
            url: `${API_URL}/medis/store`,
            data: form,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(function (response) {
            // console.log(response);
            setIsLoading(false);
            toast.success('Data Insert Successfully', {
                position: "top-center"
            });
            if (response.status != 201) {
                setErrors(response.data.data.errors);
            } else {
                setTimeout(() => {
                    navigate("/home");
                }, 1000);

            }

            // setDocter(response.data.data);
        }).catch((err) => {

            setIsLoading(false);
            // console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });

    }


    async function getParam() {
        await axios({
            method: 'get',
            url: `${API_URL}/medis/data-medis`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then(function (response) {
            // console.log(response.data.data);

            setDataDocter(response.data.data.docter)
            setDataPasien(response.data.data.pasien)
            setDataRuangan(response.data.data.ruangan)
            setDataObat(response.data.data.obat)

        }).catch((err) => {
            console.log(err);
        });

    }

    useEffect(() => {
        getParam();
    }, []);

    const onChangemulti = (e) => {
        setForm({ ...form, ["obat_id"]: Array.isArray(e) ? e.map((x) => x.value) : [] })
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Rekap Medis" />

            <div className="w-full">
                <div className="flex flex-col gap-12">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Form Rekap Medis
                            </h3>
                        </div>
                        <form onSubmit={handlePost} encType='multipart/form-data'>

                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Pasien <span className="text-meta-1">*</span>
                                    </label>
                                    <Select options={dataPasien} placeholder='Select your gender'
                                        required
                                        onChange={(e) => setForm({ ...form, ["pasien_id"]: e.value })}
                                    />
                                    {errors.pasien_id && <p className="text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">Oops!</span> {errors.pasien_id}
                                    </p>}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Keluhan  <span className="text-meta-1">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        name='keluhan'
                                        placeholder="Enter your Address"
                                        className={`w-full rounded border-[1.5px]  ${errors.keluhan ? 'border-red-500 text-red-900' : 'border-stroke'} bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                        value={form.keluhan} onChange={handelInput}></textarea>
                                    {errors.keluhan && <p className="text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">Oops!</span> {errors.keluhan}
                                    </p>}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Dokter <span className="text-meta-1">*</span>
                                    </label>
                                    <Select options={dataDocter} placeholder='Select your gender'
                                        required
                                        onChange={(e) => setForm({ ...form, ["docter_id"]: e.value })}
                                    />
                                    {errors.docter_id && <p className="text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">Oops!</span> {errors.docter_id}
                                    </p>}
                                </div>
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Diagnosa  <span className="text-meta-1">*</span>
                                    </label>
                                    <textarea
                                        rows={3}
                                        name='diagnosa'
                                        placeholder="Enter your Address"
                                        className={`w-full rounded border-[1.5px]  ${errors.diagnosa ? 'border-red-500 text-red-900' : 'border-stroke'} bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                        value={form.diagnosa} onChange={handelInput}></textarea>
                                    {errors.diagnosa && <p className="text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">Oops!</span> {errors.diagnosa}
                                    </p>}
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Obat <span className="text-meta-1">*</span>
                                            </label>
                                            <Select options={dataObat} isMulti placeholder='Select your gender'
                                                required
                                                onChange={onChangemulti}
                                            />
                                            {errors.obat_id && <p className="text-sm text-red-600 dark:text-red-500">
                                                <span className="font-medium">Oops!</span> {errors.obat_id}
                                            </p>}
                                        </div>
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <div className="mb-4.5">
                                            <label className="mb-2.5 block text-black dark:text-white">
                                                Ruangan <span className="text-meta-1">*</span>
                                            </label>
                                            <Select options={dataRuangan} placeholder='Select your gender'
                                                required
                                                onChange={(e) => setForm({ ...form, ["ruang_id"]: e.value })}
                                            />
                                            {errors.ruang_id && <p className="text-sm text-red-600 dark:text-red-500">
                                                <span className="font-medium">Oops!</span> {errors.ruang_id}
                                            </p>}
                                        </div>
                                    </div>
                                </div>

                                {isLoading ? (
                                    <button className="flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90">
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 mt-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Loading...
                                    </button>
                                ) : (
                                    <button type='submit' className="flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90">
                                        Save
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    );
};
