import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/layout/DefaultLayout';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/Context/AppContext';
import axios from 'axios';
import Select from 'react-select'
import AnimatePulse from '@/components/AnimatePulse';

import API_URL from '@/config/api';

export default function Edit() {
    const { token } = useContext(AppContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        no_handphone: "",
        spesialis: "",
        jenis_kelamin: "",
        alamat: "",
        profil: null
    })

    const options = [
        { value: 'LK', label: 'Laki-Laki' },
        { value: 'PR', label: 'Perempuan' },
    ]

    const handelInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        // console.log(name, value)
        setForm({ ...form, [name]: value });
    }

    const [errors, setErrors] = useState({});

    async function getPost() {
        setIsLoading(true)
        if (id != undefined) {
            await axios({
                method: 'get',
                url: `${API_URL}/pasien/edit/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }).then(function (response) {
                // console.log(response.data.data);
                setIsLoading(false)
                const dApi = response.data.data;
                setForm({
                    nik: dApi.nik,
                    name: dApi.name,
                    no_handphone: dApi.no_handphone,
                    alamat: dApi.alamat,
                    jenis_kelamin: dApi.jenis_kelamin,
                })

            }).catch((err) => {
                console.log(err);
            });
        }


    }

    async function handleUpdate(e) {
        e.preventDefault();
        setIsLoading(true)

        await axios({
            method: 'put',
            url: `${API_URL}/pasien/update/${id}`,
            data: form,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(function (response) {
            setIsLoading(false)
            if (response.status != 200) {
                setErrors(data.errors);
            } else {
                navigate("/pasien");
            }

            // setDocter(response.data.data);
        }).catch((err) => {
            setIsLoading(false)
            // console.log(err.response.data.errors);
            setErrors(err.response.data.errors);
        });

    }

    useEffect(() => {
        getPost();
    }, []);

    const onChangeStatus = (e) => {
        setForm({ ...form, ["jenis_kelamin"]: e.value });
    };



    // console.log(form);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Update Docter" />

            <div className="w-full">
                <div className="flex flex-col gap-12">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Form Pasien
                            </h3>
                        </div>
                        <form onSubmit={handleUpdate} encType='multipart/form-data'>
                            {isLoading ? (<AnimatePulse />) : (
                                <div className="p-6.5">

                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    NIK <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name='nik'
                                                    placeholder="Enter your NIK"
                                                    className={`w-full ${errors.nik ? 'border-red-500 text-red-900' : 'border-stroke'}  rounded border-[1.5px]  bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                                    value={form.nik} onChange={handelInput}
                                                />
                                                {errors.nik && <p className="text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">Oops!</span> {errors.nik}
                                                </p>}
                                            </div>
                                        </div>
                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Nama <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name='name'
                                                    placeholder="Enter your name"
                                                    className={`w-full ${errors.name ? 'border-red-500 text-red-900' : 'border-stroke'}  rounded border-[1.5px]  bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                                    value={form.name} onChange={handelInput}
                                                />
                                                {errors.name && <p className="text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">Oops!</span> {errors.name}
                                                </p>}
                                            </div>
                                        </div>


                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full xl:w-1/2">
                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    No Handphone  <span className="text-meta-1">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name='no_handphone'
                                                    placeholder="Enter your number handphone"
                                                    className={`w-full ${errors.no_handphone ? 'border-red-500 text-red-900' : 'border-stroke'}  rounded border-[1.5px]  bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                                    value={form.no_handphone} onChange={handelInput}
                                                />
                                                {errors.no_handphone && <p className="text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">Oops!</span> {errors.no_handphone}
                                                </p>}
                                            </div>
                                        </div>


                                        <div className="w-full xl:w-1/2">

                                            <div className="mb-4.5">
                                                <label className="mb-2.5 block text-black dark:text-white">
                                                    Jenis Kelamin  <span className="text-meta-1">*</span>
                                                </label>
                                                <Select options={options} placeholder='Select your gender'
                                                    value={options.filter((obj) => form.jenis_kelamin.includes(obj.value)
                                                    )}
                                                    required
                                                    onChange={onChangeStatus}
                                                />
                                                {errors.jenis_kelamin && <p className="text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">Oops!</span> {errors.jenis_kelamin}
                                                </p>}
                                            </div>
                                        </div>
                                    </div>





                                    <div className="mb-4.5">
                                        <label className="mb-2.5 block text-black dark:text-white">
                                            Alamat  <span className="text-meta-1">*</span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            name='alamat'
                                            placeholder="Enter your Address"
                                            className={`w-full rounded border-[1.5px]  ${errors.alamat ? 'border-red-500 text-red-900' : 'border-stroke'} bg-transparent py-1.5 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                            value={form.alamat} onChange={handelInput}></textarea>
                                        {errors.alamat && <p className="text-sm text-red-600 dark:text-red-500">
                                            <span className="font-medium">Oops!</span> {errors.alamat}
                                        </p>}
                                    </div>
                                    {isLoading ? (
                                        <button className="flex w-full justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90">
                                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mt-1 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                            )}
                        </form>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    );
};

