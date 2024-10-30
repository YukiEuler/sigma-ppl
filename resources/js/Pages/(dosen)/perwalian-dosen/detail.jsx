import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const PerwalianDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);
    const mahasiswaData = props.mahasiswa;
    const [mahasiswa, setMahasiswa] = useState(mahasiswaData);

    useEffect(() => {
        setDosen(dosenData);
        setMahasiswa(mahasiswaData);
    }, [dosenData, mahasiswaData]);

    return <DosenLayout dosen={dosen}>
        <h1>Detail</h1>
        <p>Nama: {mahasiswa.nama}</p>
        <p>NIM: {mahasiswa.nim}</p>
    </DosenLayout>;
};

export default PerwalianDosen;
