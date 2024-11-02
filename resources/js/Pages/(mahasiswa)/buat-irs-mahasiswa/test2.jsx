import React, { useState, useRef, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Icon } from "@iconify/react";
import { Eye, Search, ChevronDown } from "lucide-react";

const BuatIRSMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const studentData = {
        name: "Dzu Sunan Muhammad",
        nim: "24060122120034",
        yearOfStudy: "2024/2025 Ganjil",
        semester: 2,
        ipk: 4.0,
        ips: 4.0,
        maxCredits: 24,
    };

    const availableCourses = [
        {
            id: 1,
            name: "Sistem Operasi",
            code: "PAIK0305",
            credits: 3,
            semester: 3,
        },
        {
            id: 2,
            name: "Algoritma dan Pemrograman",
            code: "PAIK0201",
            credits: 4,
            semester: 2,
        },
        {
            id: 3,
            name: "Basis Data",
            code: "PAIK0304",
            credits: 3,
            semester: 3,
        },
        {
            id: 4,
            name: "Jaringan Komputer",
            code: "PAIK0402",
            credits: 4,
            semester: 4,
        },
        {
            id: 5,
            name: "Pemrograman Web",
            code: "PAIK0303",
            credits: 3,
            semester: 3,
        },
    ];

    const [selectedCourses, setSelectedCourses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);

    const filteredCourses = availableCourses.filter((course) => {
        const searchString = searchQuery.toLowerCase();
        return (
            course.name.toLowerCase().includes(searchString) ||
            course.code.toLowerCase().includes(searchString)
        );
    });

    const handleCourseSelect = (course) => {
        if (!selectedCourses.some((selected) => selected.id === course.id)) {
            setSelectedCourses([...selectedCourses, course]);
        }
        setIsOpen(false);
        setSearchQuery("");
    };

    const handleRemoveCourse = (courseId) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.id !== courseId)
        );
    };

    useEffect(() => {
        setMahasiswa(mahasiswaData);

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
                setSearchQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                {/* <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Buat IRS
                    </h1>
                </div> */}
                <div
                    className="grid grid-cols-1 gap-3 mt-1 sm:grid-cols-2 lg:grid-cols-7"
                    style={{
                        height: "85vh",
                    }}
                >
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-2">
                        <div
                            className="p-2 border rounded-lg shadow-lg bg-white"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <div
                                className="flex flex-col space-y-2 border-2 border-black p-2 m-2 rounded-md
                            "
                            >
                                <div className="student-info-container font-bold">
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">Nama</label>
                                        <span>: {studentData.name}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">NIM</label>
                                        <span>: {studentData.nim}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">
                                            Tahun Ajaran
                                        </label>
                                        <span>: {studentData.yearOfStudy}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">Semester</label>
                                        <span>: {studentData.semester}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">IPK</label>
                                        <span>: {studentData.ipk}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">IPS</label>
                                        <span>: {studentData.ips}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">
                                            Max Beban SKS
                                        </label>
                                        <span>: {studentData.maxCredits}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="max-w-lg mx-auto p-2 mt-2">
                                <div className="mb-6" ref={dropdownRef}>
                                    <label className="block text-sm font-medium text-black mb-2">
                                        Tambah Mata Kuliah
                                    </label>

                                    {/* Custom dropdown button */}
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <span className="text-gray-700">
                                            Select an option
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-gray-400 transition-transform ${
                                                isOpen
                                                    ? "transform rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown menu with search */}
                                    {isOpen && (
                                        <div className="absolute mt-1 w-full max-w-[18vw] bg-white border border-gray-300 rounded-md shadow-lg">
                                            {/* Search input */}
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Cari mata kuliah..."
                                                        value={searchQuery}
                                                        onChange={(e) =>
                                                            setSearchQuery(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full pl-8 pr-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        autoFocus
                                                    />
                                                </div>
                                            </div>

                                            {/* Course options */}
                                            <div className="max-h-60 overflow-y-auto">
                                                {filteredCourses.length ===
                                                0 ? (
                                                    <div className="p-4 text-gray-500 text-center">
                                                        No courses found
                                                    </div>
                                                ) : (
                                                    filteredCourses.map(
                                                        (course) => {
                                                            const isSelected =
                                                                selectedCourses.some(
                                                                    (
                                                                        selected
                                                                    ) =>
                                                                        selected.id ===
                                                                        course.id
                                                                );
                                                            return (
                                                                <button
                                                                    key={
                                                                        course.id
                                                                    }
                                                                    onClick={() =>
                                                                        handleCourseSelect(
                                                                            course
                                                                        )
                                                                    }
                                                                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                                                        isSelected
                                                                            ? "bg-gray-50 text-gray-500"
                                                                            : "text-gray-900"
                                                                    }`}
                                                                >
                                                                    <div className="font-medium">
                                                                        {
                                                                            course.name
                                                                        }
                                                                        {isSelected && (
                                                                            <span className="ml-2 text-sm text-gray-500">
                                                                                (Sudah
                                                                                dipilih)
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        SMT{" "}
                                                                        {
                                                                            course.semester
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            course.code
                                                                        }{" "}
                                                                        (
                                                                        {
                                                                            course.credits
                                                                        }{" "}
                                                                        SKS)
                                                                    </div>
                                                                </button>
                                                            );
                                                        }
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Selected courses list */}
                                <h2 className="text-lg font-medium text-gray-900 mb-3">
                                    Mata Kuliah
                                </h2>
                                <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-2">
                                    {selectedCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md shadow-sm"
                                        >
                                            <div>
                                                <div className="font-medium">
                                                    {course.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    SMT {course.semester} -{" "}
                                                    {course.code} (
                                                    {course.credits} SKS)
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleRemoveCourse(
                                                        course.id
                                                    )
                                                }
                                                className="p-1 text-gray-400 hover:text-gray-600"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100 lg:col-span-5">
                        <div
                            className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <div className="flex flex-col space-y-2"></div>
                        </div>
                    </div>
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default BuatIRSMahasiswa;