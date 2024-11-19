import React, { useState, useRef, useEffect } from "react";
import {
    Eye,
    Search,
    ChevronDown,
    Trash2,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
} from "lucide-react";
import { Icon } from "@iconify/react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";
import { Calendar } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";

const BuatIRSMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);
    const jadwalData = props.jadwal;
    const [jadwal, setJadwal] = useState(jadwalData);
    const irsData = props.irs;
    const [irs, setIrs] = useState(irsData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const dropdownRef = useRef(null);
    const [isWithinSchedule, setIsWithinSchedule] = useState(false);

    const [academicCalendar] = useState({
        year: "2024",
        semester: "Ganjil",
        irsSchedule: {
            startDate: "30-08-2024",
            endDate: "13-09-2024",
        },
    });

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    const timeSlots = [];
    for (let i = 7; i <= 21; i++) {
        timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    }

    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day);
    };

    const parseTime = (timeStr) => {
        const [hours, minutes, seconds] = timeStr.split(":").map(Number);
        return new Date(1970, 0, 1, hours, minutes, seconds);
    };

    const formatIndonesianDate = (dateStr) => {
        const days = [
            "Minggu",
            "Senin",
            "Selasa",
            "Rabu",
            "Kamis",
            "Jumat",
            "Sabtu",
        ];
        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const [day, month, year] = dateStr.split("-").map(Number);
        const date = new Date(year, month - 1, day);

        const dayName = days[date.getDay()];
        const monthName = months[date.getMonth()];

        return `${dayName}, ${String(day).padStart(
            2,
            "0"
        )} ${monthName} ${year}`;
    };

    // Calculate total credits
    const totalCredits = registeredCourses.reduce(
        (sum, course) => sum + course.sks,
        0
    );

    // Handle course selection from dropdown
    const handleCourseSelect = (course) => {
        if (
            !selectedCourses.some(
                (selected) => selected.kode_mk === course.kode_mk
            )
        ) {
            setSelectedCourses([...selectedCourses, course]);
            setFilteredCourses(filteredCourses.filter((c) => c.kode_mk !== course.kode_mk));
        }
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    // Handle course visibility toggle
    const handleToggleCourse = (courseId) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.kode_mk !== courseId)
        );
        const courseToAdd = jadwalData.find((course) => course.kode_mk === courseId);
        if (courseToAdd) {
            setFilteredCourses([...filteredCourses, courseToAdd]);
        }
    };

    useEffect(() => {
        setFilteredCourses(jadwalData.filter(
            (course) =>
                (course.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.kode_mk.toLowerCase().includes(searchQuery.toLowerCase())) &&
                !irs.some((registeredCourse) => registeredCourse.kode_mk === course.kode_mk) &&
                course.semester != mahasiswa.semester
        ));
    }, []);

    // Set Registered Awal
    useEffect(() => {
        const initialRegisteredCourses = [], initialCourseSelect = [];
        for (const course of irs) {
            initialRegisteredCourses.push(course);
            const elm = jadwalData.find((filteredCourse) => filteredCourse.kode_mk === course.kode_mk);
            initialCourseSelect.push(elm);
        }
        const filteredJadwal = jadwal.filter((elm) => elm.semester == mahasiswa.semester);
        const updatedFilteredJadwal = filteredJadwal.map((course) => {
            const updatedCourse = { ...course };
            updatedCourse.selectedClass = updatedCourse.jadwal_kuliah;
            delete updatedCourse.jadwal_kuliah;
            return updatedCourse;
        }).sort((a, b) => a.kode_mk.localeCompare(b.kode_mk));
        for (const course of updatedFilteredJadwal) {
            if (initialRegisteredCourses.some((registeredCourse) => registeredCourse.kode_mk === course.kode_mk)) continue;
            const elm = jadwalData.find((filteredCourse) => filteredCourse.kode_mk === course.kode_mk);
            if (elm) initialCourseSelect.push(elm);
        }
        setRegisteredCourses(initialRegisteredCourses);
        setSelectedCourses(initialCourseSelect);
        setIsSubmitted(irs.length > 0 && Boolean(irs[0].sudah_diajukan));
        setIsVerified(irs.length > 0 && Boolean(irs[0].sudah_disetujui));
    }, []);

    // Handle class selection
    const handleClassSelect = (course, classInfo) => {
        const existingCourse = registeredCourses.find(
            (c) => c.kode_mk === course.kode_mk
        );
        if (!existingCourse) {
            setRegisteredCourses([
                ...registeredCourses,
                {
                    ...course,
                    selectedClass: classInfo,
                },
            ]);
            Inertia.visit('/mahasiswa/buat-irs/insert/' + classInfo.id_kelas, {
                method: 'get',
                preserveState: true,
            });
        }
    };

    // Handle course removal from registration
    const handleRemoveCourse = (courseId) => {
        Swal.fire({
            title: 'Apakah Anda yakin ingin menghapus course ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya'
        }).then((result) => {
            if (result.isConfirmed) {
                setRegisteredCourses(
                    registeredCourses.filter((course) => course.selectedClass.id_kelas !== courseId)
                );
                Inertia.visit('/mahasiswa/buat-irs/delete/' + courseId, {
                    method: 'get',
                    preserveState: true,
                });
                Swal.fire(
                    'Deleted!',
                    'Course sudah dihapus.',
                    'success'
                );
            }
        });
    };

    // Handle submission
    const handleSubmit = () => {
        Inertia.visit('/mahasiswa/buat-irs/ubah-status/', {
            method: 'get',
            preserveState: true,
        });
        setIsSubmitted(!isSubmitted);
    };

    // Helper function untuk menentukan slot waktu berdasarkan threshold 30 menit
    const getTimeSlot = (timeStr) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        if (minutes <= 30) {
            // Jika menit <= 30, gunakan jam saat ini
            return `${hours.toString().padStart(2, "0")}:00`;
        } else {
            // Jika menit > 30, gunakan jam berikutnya
            return `${(hours + 1).toString().padStart(2, "0")}:00`;
        }
    };

    // Helper function untuk mengecek apakah suatu jadwal masuk ke dalam slot waktu
    const isScheduleInTimeSlot = (scheduleTime, slotTime) => {
        const appropriateSlot = getTimeSlot(scheduleTime);
        return appropriateSlot === slotTime;
    };

    useEffect(() => {
        const checkSchedule = () => {
            const now = new Date("2024-08-31");
            const startDate = parseDate(academicCalendar.irsSchedule.startDate);
            const endDate = parseDate(academicCalendar.irsSchedule.endDate);

            // Set end date to end of day
            endDate.setHours(23, 59, 59, 999);

            const isWithin = now >= startDate && now <= endDate;
            setIsWithinSchedule(isWithin);
        };
        checkSchedule();
        setJadwal(jadwalData, academicCalendar);
    }, [jadwalData]);

    const Schedule = () => (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2 w-20"></th>
                        {days.map((day) => (
                            <th key={day} className="border p-2 w-48">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time, index) => (
                        <tr key={time}>
                            <td className="border p-2 text-center align-top">
                                {time}
                            </td>
                            {days.map((day) => (
                                <td
                                    key={`${day}-${time}`}
                                    className="border p-2 align-top"
                                >
                                    <div className="flex flex-col gap-2">
                                        {selectedCourses.map((course) =>
                                            course.jadwal_kuliah.map(
                                                (classInfo) => {
                                                    if (
                                                        classInfo.hari ===
                                                            day &&
                                                        isScheduleInTimeSlot(
                                                            classInfo.waktu_mulai,
                                                            time
                                                        )
                                                    ) {
                                                        const kelasRegistered = registeredCourses.some(
                                                            (registeredCourse) =>
                                                                registeredCourse.selectedClass.id_kelas ===
                                                                classInfo.id_kelas
                                                        );
                                                        const matkulRegistered = registeredCourses.some(
                                                            (registeredCourse) =>
                                                                registeredCourse.kode_mk ===
                                                                course.kode_mk
                                                        );
                                                        const bentrok = registeredCourses.some((registeredCourse) => {
                                                            const jadwal = registeredCourse.selectedClass;
                                                            return (
                                                                jadwal.hari === classInfo.hari &&
                                                                parseTime(jadwal.waktu_mulai) <= parseTime(classInfo.waktu_selesai) &&
                                                                parseTime(jadwal.waktu_selesai) >= parseTime(classInfo.waktu_mulai)
                                                            )
                                                        });
                                                        const maxSks = totalCredits + course.sks > mahasiswa.maxSks;
                                                        let tooltipMessage = '';
                                                        if (isVerified) {
                                                            tooltipMessage = 'IRS telah disetujui';
                                                        } else if (isSubmitted) {
                                                            tooltipMessage = 'IRS telah diajukan';
                                                        } else if (kelasRegistered) {
                                                            tooltipMessage = 'Kelas sudah terdaftar';
                                                        } else if (matkulRegistered) {
                                                            tooltipMessage = 'Mata kuliah sudah terdaftar';
                                                        } else if (bentrok) {
                                                            tooltipMessage = 'Jadwal bentrok';
                                                        } else if (maxSks) {
                                                            tooltipMessage = 'Melebihi batasan SKS';
                                                        }

                                                        return (
                                                            <div
                                                                key={`${course.id}-${classInfo.code}`}
                                                                className={`p-2 rounded w-full ${
                                                                    kelasRegistered
                                                                        ? "cursor-not-allowed bg-green-400 hover:bg-green-500"
                                                                        : matkulRegistered
                                                                        ? "cursor-not-allowed bg-yellow-100 hover:bg-yellow-200"
                                                                        : bentrok || maxSks
                                                                        ? "cursor-not-allowed bg-red-400 hover:bg-red-500"
                                                                        : isSubmitted || isVerified
                                                                        ? "cursor-not-allowed bg-blue-200 hover:bg-blue-300"
                                                                        : "cursor-pointer bg-blue-200 hover:bg-blue-300"
                                                                }`}
                                                                onClick={() =>
                                                                    !kelasRegistered &&
                                                                    !matkulRegistered &&
                                                                    !bentrok &&
                                                                    !isSubmitted &&
                                                                    !isVerified &&
                                                                    !maxSks &&
                                                                    handleClassSelect(
                                                                        course,
                                                                        classInfo
                                                                    )
                                                                }
                                                                title={tooltipMessage}
                                                            >
                                                                <div className="text-sm font-semibold">
                                                                    {
                                                                        course.nama
                                                                    }
                                                                </div>
                                                                <div className="text-xs">
                                                                    {
                                                                        course.type
                                                                    }{" "}
                                                                    (SMT
                                                                    {" "}{
                                                                        course.semester
                                                                    }
                                                                    ) (
                                                                    {course.sks}{" "}
                                                                    SKS)
                                                                    <br />
                                                                    Kelas:{" "}
                                                                    {
                                                                        classInfo.kelas
                                                                    }
                                                                    <br />
                                                                    Kuota:{" "}
                                                                    {
                                                                        classInfo.kuota
                                                                    }{" "}
                                                                    <br />
                                                                    <div className="flex justify-start items-center gap-1">
                                                                        <Icon icon="lsicon:time-two-outline" />
                                                                        {
                                                                            classInfo.waktu_mulai
                                                                        }{" "}
                                                                        -{" "}
                                                                        {
                                                                            classInfo.waktu_selesai
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    if (!isWithinSchedule) {
        return (
            <MahasiswaLayout mahasiswa={mahasiswa}>
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Buat IRS
                    </h1>
                </div>
                <div className="flex flex-col items-center justify-center h-full bg-gray-50">
                    <div className="text-center mb-8">
                        <div className="mx-auto mb-4 flex justify-center">
                            <Calendar className="w-16 h-16 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Tidak dalam periode pembatalan IRS
                        </h2>
                        <p className="text-gray-600">
                            Pembatalan IRS dapat dilakukan pada{" "}
                            <span className="font-semibold">
                                {formatIndonesianDate(
                                    academicCalendar.irsSchedule.startDate
                                )}
                            </span>{" "}
                            sampai{" "}
                            <span className="font-semibold">
                                {formatIndonesianDate(
                                    academicCalendar.irsSchedule.endDate
                                )}
                            </span>
                        </p>
                    </div>
                </div>
            </MahasiswaLayout>
        );
    }

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between mt-2 pb-3 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Buat IRS
                    </h1>
                </div>
                <div
                    className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2 lg:grid-cols-7"
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
                                        <span>: {mahasiswa.nama}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">NIM</label>
                                        <span>: {mahasiswa.nim}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">
                                            Tahun Ajaran
                                        </label>
                                        <span>: {mahasiswa.tahun_ajaran} </span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">Semester</label>
                                        <span>: {mahasiswa.semester} </span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">IPK</label>
                                        <span>: {mahasiswa.ipk}</span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">IPS</label>
                                        <span>: {mahasiswa.ips} </span>
                                    </div>
                                    <div className="student-info-item flex text-xs">
                                        <label className="w-24">
                                            Max Beban SKS
                                        </label>
                                        <span>: {mahasiswa.maxSks} </span>
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
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white text-left flex justify-between items-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <span className="text-gray-700">
                                            Select an option
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-gray-400 transition-transform ${
                                                isDropdownOpen
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </button>

                                    {/* Dropdown menu with search */}
                                    {isDropdownOpen && (
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
                                            <div className="max-h-64 overflow-y-auto">
                                                {filteredCourses.length ===
                                                0 ? (
                                                    <div className="p-4 text-gray-500 text-center">
                                                        No courses found
                                                    </div>
                                                ) : (
                                                    filteredCourses.map(
                                                        (course) => (
                                                            <button
                                                                key={
                                                                    course.kode_mk
                                                                }
                                                                onClick={() =>
                                                                    handleCourseSelect(
                                                                        course
                                                                    )
                                                                }
                                                                className="w-full text-left p-2 hover:bg-gray-100"
                                                            >
                                                                <div className="font-medium text-[12px]">
                                                                    {
                                                                        course.nama
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-500 text-[10px]">
                                                                    {
                                                                        course.kode_mk
                                                                    }{" "}
                                                                    -{" "}
                                                                    {course.sks}{" "}
                                                                    SKS
                                                                </div>
                                                            </button>
                                                        )
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
                                    {console.log(selectedCourses)}
                                    {selectedCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm"
                                        >
                                            <div>
                                                <div className="font-medium text-[12px]">
                                                    {course.nama}
                                                </div>
                                                <div className="text-[10px] text-gray-500">
                                                    Semester {course.semester} -{" "}
                                                    {course.kode_mk} (
                                                    {course.sks} SKS)
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleToggleCourse(
                                                        course.kode_mk
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
                            className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white overflow-y-auto"
                            style={{
                                height: "80vh",
                            }}
                        >
                            <div className="flex flex-col space-y-2 p-2">
                                <Schedule />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div
                    className={`fixed right-0 top-0 h-full bg-[#1EAADF] shadow-lg transition-all duration-300 ${
                        isSidebarOpen ? "w-80" : "w-12"
                    }`}
                >
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-[#1EAADF] p-2 rounded-l-lg shadow-lg"
                    >
                        {isSidebarOpen ? (
                            <ChevronRight className="text-white" />
                        ) : (
                            <ChevronLeft className="text-white" />
                        )}
                        <div className="text-sm text-white">
                            {totalCredits} SKS
                        </div>
                    </button>

                    {isSidebarOpen && (
                        <div className="p-4 pt-3 bg-[#1EAADF]">
                            <h2 className="text-lg font-medium mb-2 text-white">
                                Registered Courses
                            </h2>
                            <div
                                className="space-y-2 mb-4 border-t overflow-y-auto"
                                style={{ maxHeight: "500px" }}
                            >
                                <div className="mt-2">
                                    {registeredCourses.map((course) => (
                                        <div
                                            key={course.id}
                                            className="p-2 bg-gray-50 rounded-md mt-1"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium text-[12px]">
                                                        {course.nama}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500">
                                                        {course.kode_mk} -{" "}
                                                        {course.sks} SKS
                                                        <br />
                                                        Kelas{" "}
                                                        {
                                                            course.selectedClass
                                                                .kelas
                                                        }
                                                    </div>
                                                </div>
                                                {!isSubmitted && !isVerified && (
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveCourse(
                                                                course.selectedClass.id_kelas
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative min-h-screen">
                                {/* Konten halaman lainnya */}
                                <div className="border-t pt-2 fixed bottom-3 w-[37vh] bg-[#1EAADF]">
                                    <div className="flex justify-between mb-3 text-white">
                                        <span>Total SKS:</span>
                                        <span className="font-medium">
                                            {totalCredits}
                                        </span>
                                    </div>
                                    {!isVerified && (
                                        <button
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Apakah Anda yakin?',
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: isSubmitted ? 'Ya, batalkan!' : 'Ya, ajukan!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        handleSubmit();
                                                        Swal.fire(
                                                            isSubmitted ? 'Dibatalkan!' : 'Diajukan!',
                                                            isSubmitted ? 'Pengajuan IRS telah dibatalkan.' : 'IRS Anda telah diajukan.',
                                                            'success'
                                                        );
                                                    }
                                                });
                                            }}
                                            className={`w-full p-2 rounded-md ${
                                                isSubmitted
                                                    ? "bg-red-500 text-white hover:bg-red-600"
                                                    : "bg-green-500 text-white hover:bg-green-600"
                                            }`}
                                        >
                                            {isSubmitted ? "Batalkan" : "Ajukan"}
                                        </button>
                                    )}
                                    {isVerified && (
                                        <button
                                            className={`w-full p-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 cursor-not-allowed`}
                                            disabled
                                        >
                                            {"IRS telah disetujui"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MahasiswaLayout>
    );
};

export default BuatIRSMahasiswa;
