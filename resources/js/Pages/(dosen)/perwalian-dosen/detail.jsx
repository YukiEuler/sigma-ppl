import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";
import { Icon } from "@iconify/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DetailIRS = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const courseData = [
        {
            no: 1,
            kode: "UUW00003",
            mataKuliah: "Pancasila dan Kewarganegaraan",
            waktu: "Selasa pukul 18:20 - 20:50",
            kelas: "C",
            sks: 3,
            ruang: "A303",
            status: "BARU",
            namaDosen: "Dr. Drs. Slamet Subekti, M.Hum.",
        },
        {
            no: 2,
            kode: "UUW00005",
            mataKuliah: "Olahraga",
            waktu: "Rabu pukul 06:00 - 06:50",
            kelas: "A",
            sks: 1,
            ruang: "Lapangan Stadion UNDIP Tembalang",
            status: "BARU",
            namaDosen: "Dra. Endang Kumaidah, M.Kes.",
        },
        {
            no: 3,
            kode: "PAIK6102",
            mataKuliah: "Dasar Pemrograman",
            waktu: "Rabu pukul 08:50 - 11:20",
            kelas: "C",
            sks: 3,
            ruang: "K202",
            status: "BARU",
            namaDosen:
                "Dr.Eng. Adi Wibowo, S.Si., M.Kom.\nKhadijah, S.Kom., M.Cs.",
        },
        {
            no: 4,
            kode: "PAIK6103",
            mataKuliah: "Dasar Sistem",
            waktu: "Kamis pukul 07:00 - 09:30",
            kelas: "C",
            sks: 3,
            ruang: "E102",
            status: "BARU",
            namaDosen:
                "Rismiyati, B.Eng, M.Cs\nMuhammad Malik Hakim, S.T., M.T.I.",
        },
        {
            no: 5,
            kode: "PAIK6104",
            mataKuliah: "Logika Informatika",
            waktu: "Kamis pukul 15:40 - 18:10",
            kelas: "C",
            sks: 3,
            ruang: "A205",
            status: "BARU",
            namaDosen:
                "Dr. Sutikno, S.T., M.Cs.\nDr. Aris Sugiharto, S.Si., M.Kom.",
        },
        {
            no: 6,
            kode: "PAIK6105",
            mataKuliah: "Struktur Diskrit",
            waktu: "Kamis pukul 18:20 - 20:00\nJumat pukul 16:40 - 18:20",
            kelas: "C",
            sks: 4,
            ruang: "E101",
            status: "BARU",
            namaDosen:
                "Nurdin Bahtiar, S.Si., M.T.\nSandy Kurniawan, S.Kom., M.Kom.\nDr. Aris Sugiharto, S.Si., M.Kom.",
        },
        {
            no: 7,
            kode: "UUW00007",
            mataKuliah: "Bahasa Inggris",
            waktu: "Jumat pukul 07:00 - 08:40",
            kelas: "C",
            sks: 2,
            ruang: "E101",
            status: "BARU",
            namaDosen: "Dra. R.A.J. Atrinawati, M.Hum.",
        },
        {
            no: 8,
            kode: "PAIK6101",
            mataKuliah: "Matematika I",
            waktu: "Jumat pukul 14:50 - 16:30",
            kelas: "C",
            sks: 2,
            ruang: "E101",
            status: "BARU",
            namaDosen: "Prof. Dr. Dra. Sunarsih, M.Si.\nSolikhin, S.Si., M.Sc.",
        },
    ];

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({ html: "#irs-mahasiswa" });
        doc.save("Print IRS.pdf");
    };

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    return (
        <DosenLayout dosen={dosen}>
            {/* <h1>Detail</h1>
            <p>Nama: {mahasiswa.nama}</p>
            <p>NIM: {mahasiswa.nim}</p> */}
            <main className="flex-1 max-h-full">
                <div className="grid grid-cols-1 gap-5">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="justify-between px-4 pb-4 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2 mt-6">
                                <h1 className="text-2xl text-center font-semibold whitespace-nowrap text-black">
                                    IRS Mahasiswa (Sudah DIsetujui Pembimbing
                                    Akdemik)
                                </h1>
                                <table
                                    id="irs-mahasiswa"
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse mt-3"
                                >
                                    <thead className="text-xs text-white uppercase bg-blue-500 dark:text-gray-400">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "50px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                NO
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "100px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                KODE
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "300px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                MATA KULIAH
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "50px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                KELAS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "50px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                SKS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "100px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                RUANG
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{
                                                    width: "50px",
                                                    textAlign: "center",
                                                }}
                                            >
                                                STATUS
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 border border-gray-300"
                                                style={{ textAlign: "center" }}
                                            >
                                                NAMA DOSEN
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {courseData.map((course) => (
                                            <React.Fragment key={course.no}>
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <td className="px-6 py-4 border border-gray-300 text-center">
                                                        {course.no}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300">
                                                        {course.kode}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300">
                                                        {course.mataKuliah}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300 text-center">
                                                        {course.kelas}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300 text-center">
                                                        {course.sks}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300">
                                                        {Array.isArray(
                                                            course.ruang
                                                        )
                                                            ? course.ruang.join(
                                                                  "\n"
                                                              )
                                                            : course.ruang}
                                                    </td>
                                                    <td className="px-6 py-4 border border-gray-300 text-center">
                                                        {course.status}
                                                    </td>
                                                    <td
                                                        className="px-6 py-4 border border-gray-300"
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                        }}
                                                    >
                                                        {course.namaDosen}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white dark:bg-gray-800">
                                                    <td
                                                        colSpan="8"
                                                        className="px-6 py-2 border border-gray-300 text-center italic"
                                                        style={{
                                                            whiteSpace:
                                                                "pre-line",
                                                        }}
                                                    >
                                                        {Array.isArray(
                                                            course.waktu
                                                        )
                                                            ? course.waktu.join(
                                                                  "\n"
                                                              )
                                                            : course.waktu}
                                                    </td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                                <div>
                                <button
                                        onClick={() => window.location.href = "/dosen/perwalian"}
                                        className="w-20 mt-4 px-4 py-2 mr-5 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="w-40 mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </DosenLayout>
    );
};

export default DetailIRS;
