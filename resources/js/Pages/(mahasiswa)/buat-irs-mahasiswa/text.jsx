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

const IRSMahasiswa = () => {
    // Student Data
    const studentData = {
        name: "Dzu Sunan Muhammad",
        nim: "24060122120034",
        yearOfStudy: "2024/2025 Ganjil",
        semester: 2,
        ipk: 4.0,
        ips: 4.0,
        maxCredits: 24,
    };

    // Course Data
    const coursesData = [
        {
            id: 1,
            name: "Sistem Operasi",
            code: "PAIK0305",
            credits: 3,
            semester: 3,
            type: "Wajib",
            classes: [
                {
                    code: "A",
                    room: "K301",
                    quota: 50,
                    filled: 25,
                    schedule: {
                        day: "Senin",
                        startTime: "08:00",
                        endTime: "10:30",
                    },
                },
                {
                    code: "B",
                    room: "K302",
                    quota: 50,
                    filled: 30,
                    schedule: {
                        day: "Selasa",
                        startTime: "08:00",
                        endTime: "10:30",
                    },
                },
            ],
        },
        {
            id: 2,
            name: "Algoritma dan Pemrograman",
            code: "PAIK0201",
            credits: 4,
            semester: 2,
            type: "Wajib",
            classes: [
                {
                    code: "A",
                    room: "K201",
                    quota: 40,
                    filled: 35,
                    schedule: {
                        day: "Rabu",
                        startTime: "07:00",
                        endTime: "09:30",
                    },
                },
            ],
        },
    ];

    // State Management
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const dropdownRef = useRef(null);

    // Time slots for the schedule
    const timeSlots = [];
    for (let i = 7; i <= 21; i++) {
        timeSlots.push(`${i.toString().padStart(2, "0")}:00`);
    }

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    // Filter courses based on search
    const filteredCourses = coursesData.filter(
        (course) =>
            course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate total credits
    const totalCredits = registeredCourses.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    // Handle course selection from dropdown
    const handleCourseSelect = (course) => {
        if (!selectedCourses.some((selected) => selected.id === course.id)) {
            setSelectedCourses([...selectedCourses, course]);
        }
        setIsDropdownOpen(false);
        setSearchQuery("");
    };

    // Handle course visibility toggle
    const handleToggleCourse = (courseId) => {
        setSelectedCourses(
            selectedCourses.filter((course) => course.id !== courseId)
        );
    };

    // Handle class selection
    const handleClassSelect = (course, classInfo) => {
        const existingCourse = registeredCourses.find(
            (c) => c.id === course.id
        );
        if (!existingCourse) {
            setRegisteredCourses([
                ...registeredCourses,
                {
                    ...course,
                    selectedClass: classInfo,
                },
            ]);
        }
    };

    // Handle course removal from registration
    const handleRemoveCourse = (courseId) => {
        setRegisteredCourses(
            registeredCourses.filter((course) => course.id !== courseId)
        );
    };

    // Handle submission
    const handleSubmit = () => {
        setIsSubmitted(!isSubmitted);
    };

    // Student Info Component
    const StudentInfo = () => (
        <div className="border border-black p-4 rounded-lg mb-4">
            <h2 className="font-bold mb-2">Data Mahasiswa</h2>
            <div className="grid grid-cols-2 gap-2">
                <div>Nama</div>
                <div>: {studentData.name}</div>
                <div>NIM</div>
                <div>: {studentData.nim}</div>
                <div>Tahun Ajaran</div>
                <div>: {studentData.yearOfStudy}</div>
                <div>Semester</div>
                <div>: {studentData.semester}</div>
                <div>IPK</div>
                <div>: {studentData.ipk}</div>
                <div>IPS</div>
                <div>: {studentData.ips}</div>
                <div>Max Beban SKS</div>
                <div>: {studentData.maxCredits}</div>
            </div>
        </div>
    );

    // Course Schedule Component
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
                        <tr key={time} className="h-16">
                            <td className="border p-2 text-center">{time}</td>
                            {days.map((day) => (
                                <td
                                    key={`${day}-${time}`}
                                    className="border p-2 relative"
                                >
                                    {selectedCourses.map((course) =>
                                        course.classes.map((classInfo) => {
                                            if (
                                                classInfo.schedule.day ===
                                                    day &&
                                                classInfo.schedule.startTime ===
                                                    time
                                            ) {
                                                return (
                                                    <div
                                                        key={`${course.id}-${classInfo.code}`}
                                                        className="absolute bg-blue-100 p-2 rounded cursor-pointer hover:bg-blue-200"
                                                        style={{
                                                            top: "0",
                                                            left: "0",
                                                            right: "0",
                                                            height: "100%",
                                                        }}
                                                        onClick={() =>
                                                            handleClassSelect(
                                                                course,
                                                                classInfo
                                                            )
                                                        }
                                                    >
                                                        <div className="text-sm font-semibold">
                                                            {course.name}
                                                        </div>
                                                        <div className="text-xs">
                                                            {course.type} -{" "}
                                                            {course.credits} SKS
                                                            <br />
                                                            Kelas{" "}
                                                            {classInfo.code}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">
                    <StudentInfo />

                    {/* Course Selection Dropdown */}
                    <div className="mb-6 relative" ref={dropdownRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tambah Mata Kuliah
                        </label>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full p-2 border rounded-md flex justify-between items-center"
                        >
                            <span>Select an option</span>
                            <ChevronDown
                                className={`transform ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
                                <div className="p-2 border-b">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                            className="w-full pl-10 p-2 border rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="max-h-60 overflow-y-auto">
                                    {filteredCourses.map((course) => (
                                        <button
                                            key={course.id}
                                            onClick={() =>
                                                handleCourseSelect(course)
                                            }
                                            className="w-full text-left p-2 hover:bg-gray-100"
                                        >
                                            <div className="font-medium">
                                                {course.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {course.code} - {course.credits}{" "}
                                                SKS
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Selected Courses List */}
                    <div className="mb-6">
                        <h2 className="text-lg font-medium mb-2">
                            Selected Courses
                        </h2>
                        <div className="space-y-2">
                            {selectedCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between p-2 bg-white rounded-md shadow"
                                >
                                    <div>
                                        <div className="font-medium">
                                            {course.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {course.code} - {course.credits} SKS
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleToggleCourse(course.id)
                                        }
                                        className="p-1"
                                    >
                                        <Eye />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule */}
                    <Schedule />
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
                    isSidebarOpen ? "w-80" : "w-12"
                }`}
            >
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-l-lg shadow-lg"
                >
                    {isSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
                    <div className="text-sm">{totalCredits} SKS</div>
                </button>

                {isSidebarOpen && (
                    <div className="p-4">
                        <h2 className="text-lg font-medium mb-4">
                            Registered Courses
                        </h2>
                        <div className="space-y-2 mb-4">
                            {registeredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="p-2 bg-gray-50 rounded-md"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="font-medium">
                                                {course.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {course.code} - {course.credits}{" "}
                                                SKS
                                                <br />
                                                Kelas{" "}
                                                {course.selectedClass.code}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleRemoveCourse(course.id)
                                            }
                                            className="text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-4">
                                <span>Total SKS:</span>
                                <span className="font-medium">
                                    {totalCredits}
                                </span>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className={`w-full p-2 rounded-md ${
                                    isSubmitted
                                        ? "bg-red-500 text-white"
                                        : "bg-blue-500 text-white"
                                }`}
                            >
                                {isSubmitted ? "Batalkan" : "Ajukan"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IRSMahasiswa;
