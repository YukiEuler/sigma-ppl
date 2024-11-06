import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const PersetujuanIRSDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));

    const jumlahMahasiswa = props.jumlahMahasiswa;

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setCheckedItems(new Array(10).fill(newSelectAll));
    };

    const handleCheckboxChange = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        setSelectAll(newCheckedItems.every((item) => item));
    };

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    return (
        <DosenLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Perwalian
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <form className="max-w-sm mt-6">
                                    <table className="w-full">
                                        <tr>
                                            <td className="text-sm font-medium text-gray-900">
                                                Angkatan
                                            </td>
                                            <td>
                                                <select
                                                    id="angkatan"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option selected>
                                                        Select an option
                                                    </option>
                                                    <option value="2022">
                                                        2022
                                                    </option>
                                                    <option value="2021">
                                                        2021
                                                    </option>
                                                    <option value="2020">
                                                        2020
                                                    </option>
                                                    <option value="2019">
                                                        2019
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-sm font-medium text-gray-900">
                                                Prodi
                                            </td>
                                            <td>
                                                <select
                                                    id="prodi"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option selected>
                                                        Select an option
                                                    </option>
                                                    <option value="TI">
                                                        Teknik Informatika
                                                    </option>
                                                    <option value="SI">
                                                        Sistem Informasi
                                                    </option>
                                                    <option value="MI">
                                                        Manajemen Informatika
                                                    </option>
                                                    <option value="KA">
                                                        Komputer Akuntansi
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Filter Data
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                        >
                                            Reset Filter
                                        </button>
                                    </div>
                                </form>
                                <div className="border-b w-full mt-4"></div>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Setujui IRS
                                    </button>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Batalkan Persetujan IRS
                                    </button>
                                </div>
                                <span className="block mt- text-sm text-gray-700 mb-2">
                                    <span className="block mt-1 text-sm text-gray-700">
                                        <strong>
                                            *Memberikan izin melakukan perubahan
                                            IRS
                                        </strong>{" "}
                                        berarti dianggap telah menyetujui IRS
                                        awal mahasiswa dan
                                        <br />
                                        sekaligus mengijinkan mahasiswa
                                        melakukan perubahan IRS pada periode
                                        penggantian IRS.
                                    </span>
                                </span>

                                <div class="flex rounded-md border border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                                    <input
                                        type="text"
                                        placeholder="NIM/Nama"
                                        class="w-full outline-none bg-white text-gray-600 text-base px-2 py-2"
                                    />
                                    <button
                                        type="button"
                                        class="flex items-center justify-center bg-[#007bff] hover:bg-blue-600 px-3"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 192.904 192.904"
                                            width="20px"
                                            class="fill-white"
                                        >
                                            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mt-2">
                                    <span className="text-lg font-medium text-gray-900">
                                        Total: {jumlahMahasiswa}
                                    </span>
                                </div>
                                <div className="relative overflow-x-auto mt-1 rounded-lg overflow-auto h-[500px] scrollbar-hide">
                                    <style jsx>{`
                                        .scrollbar-hide::-webkit-scrollbar {
                                            display: none;
                                        }
                                        .scrollbar-hide {
                                            -ms-overflow-style: none;
                                            scrollbar-width: none;
                                        }
                                    `}</style>
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 sticky-header">
                                        <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400 sticky top-0">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox"
                                                            checked={selectAll}
                                                            onChange={
                                                                handleSelectAllChange
                                                            }
                                                        />
                                                        <span className="ml-2 text-[10px]">
                                                            Semua
                                                        </span>
                                                    </label>
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "3%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "15%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    NIM
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "15%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Prodi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Angkatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "5%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    IP Lalu
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "3%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    SKS Diambil
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Status Mahasiswa
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-2"
                                                    style={{
                                                        width: "10%",
                                                        textAlign: "center",
                                                        fontSize: "12px",
                                                    }}
                                                >
                                                    Detail
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mahasiswaData.map(
                                                (item, index) => (
                                                    <tr
                                                        key={index}
                                                        className="bg-gray-100 border-b"
                                                    >
                                                        <td className="px-6 py-3">
                                                            <div className="flex justify-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        checkedItems[
                                                                            index
                                                                        ]
                                                                    }
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            index
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </td>
                                                        <td
                                                            className="px-4 py-2 text-[14px] text-center"
                                                        >
                                                            {index + 1}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {item.nama}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {item.nim}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px]">
                                                            {item.nama_prodi}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.angkatan}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.ipk.toFixed(
                                                                2
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.sks_kumulatif}
                                                        </td>
                                                        <td className="px-4 py-2 text-[14px] text-center">
                                                            {item.status}
                                                        </td>
                                                        <td className="flex items-center justify-center py-3">
                                                            <a
                                                                href={`/dosen/perwalian/detail/${item.nim}`}
                                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px]"
                                                            >
                                                                Detail
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default PersetujuanIRSDosen;
