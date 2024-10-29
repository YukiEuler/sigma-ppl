import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import MahasiswaLayout from "../../../Layouts/MahasiswaLayout";

const DashboardMahasiswa = () => {
    const { props } = usePage();
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setMahasiswa(mahasiswaData);
    }, [mahasiswaData]);

    return (
        <MahasiswaLayout mahasiswa={mahasiswa}>
            <h2>Home</h2>
        </MahasiswaLayout>
    );
};

export default DashboardMahasiswa;
