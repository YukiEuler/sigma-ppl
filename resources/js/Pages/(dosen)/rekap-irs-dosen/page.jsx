import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const RekapIRS = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Array(10).fill(false));
    const [activeTab, setActiveTab] = useState("Belum IRS");

    const jumlahMahasiswa = props.jumlahMahasiswa;

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <DosenLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Rekap IRS
                    </h1>
                </div>
                <div className="flex w-full border-b mb-3 mt-2">
                    <button
                        onClick={() => handleTabClick("Belum IRS")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Belum IRS"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Belum IRS
                    </button>
                    <button
                        onClick={() => handleTabClick("Belum Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Belum Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Belum Disetujui
                    </button>
                    <button
                        onClick={() => handleTabClick("Sudah Disetujui")}
                        className={`flex-1 pb-2 text-center ${
                            activeTab === "Sudah Disetujui"
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500"
                        }`}
                    >
                        Sudah Disetujui
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <div className="border-b w-full mt-4"></div>
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
                                {activeTab === "Belum IRS" && (
                                    <div>
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
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nama}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nim}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
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
                                )}
                                {activeTab === "Belum Disetujui" && (
                                    <div>
                                        <span>Belum</span>
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
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nama}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nim}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
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
                                )}
                                {activeTab === "Sudah Disetujui" && (
                                    <div>
                                        <span>Sudah</span>
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
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            No
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Nama
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            NIM
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "15%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Prodi
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Angkatan
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "5%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            IP Lalu
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "3%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            SKS Diambil
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
                                                            }}
                                                        >
                                                            Status Mahasiswa
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-4 py-2"
                                                            style={{
                                                                width: "10%",
                                                                textAlign:
                                                                    "center",
                                                                fontSize:
                                                                    "12px",
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
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nama}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {item.nim}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px]">
                                                                    {
                                                                        item.nama_prodi
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.angkatan
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {item.ipk.toFixed(
                                                                        2
                                                                    )}
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.sks_kumulatif
                                                                    }
                                                                </td>
                                                                <td className="px-4 py-2 text-[14px] text-center">
                                                                    {
                                                                        item.status
                                                                    }
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default RekapIRS;
