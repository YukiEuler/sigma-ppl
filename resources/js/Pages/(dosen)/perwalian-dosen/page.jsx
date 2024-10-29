import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const PerwalianDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));

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

    const data = [
        {
            no: 1,
            nama: "Dzu Sunan Muhammad",
            nim: "24060122120034",
            prodi: "Teknik Informatika",
            angkatan: 2020,
            status: "Aktif",
        },
        {
            no: 2,
            nama: "Jane Smith",
            nim: "987654321",
            prodi: "Sistem Informasi",
            angkatan: 2019,
            status: "Aktif",
        },
        {
            no: 3,
            nama: "Alice Johnson",
            nim: "112233445",
            prodi: "Manajemen Informatika",
            angkatan: 2021,
            status: "Aktif",
        },
        {
            no: 4,
            nama: "Bob Brown",
            nim: "556677889",
            prodi: "Komputer Akuntansi",
            angkatan: 2022,
            status: "Aktif",
        },
        {
            no: 5,
            nama: "Charlie Davis",
            nim: "998877665",
            prodi: "Teknik Informatika",
            angkatan: 2018,
            status: "Aktif",
        },
        {
            no: 6,
            nama: "Diana Evans",
            nim: "443322110",
            prodi: "Sistem Informasi",
            angkatan: 2020,
            status: "Aktif",
        },
        {
            no: 7,
            nama: "Evan Foster",
            nim: "667788990",
            prodi: "Manajemen Informatika",
            angkatan: 2019,
            status: "Aktif",
        },
        {
            no: 8,
            nama: "Fiona Green",
            nim: "334455667",
            prodi: "Komputer Akuntansi",
            angkatan: 2021,
            ip: 3.6,
            sks: 20,
            status: "Aktif",
        },
        {
            no: 9,
            nama: "George Harris",
            nim: "776655443",
            prodi: "Teknik Informatika",
            angkatan: 2022,
            ip: 3.3,
            sks: 22,
            status: "Aktif",
        },
        {
            no: 10,
            nama: "Hannah White",
            nim: "554433221",
            prodi: "Sistem Informasi",
            angkatan: 2018,
            ip: 3.9,
            sks: 24,
            status: "Aktif",
        },
    ];

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

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
                        <div className="justify-between px-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2 mt-6">
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
                                        Total: 10
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
                                                >
                                                    No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Nama
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    NIM
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Prodi
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Angkatan
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3"
                                                >
                                                    Detail
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="bg-gray-100 border-b"
                                                >
                                                    <td className="px-6 py-3">
                                                        {item.no}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {item.nama}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {item.nim}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {item.prodi}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {item.angkatan}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        {item.status}
                                                    </td>
                                                    <td className="px-6 py-3">
                                                        <button className="bg-blue-500 text-white px-3 py-1 rounded">
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="p-3"></div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default PerwalianDosen;
