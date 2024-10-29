import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const PerwalianDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    return <DosenLayout dosen={dosen}>
        <h1>Detail</h1>
    </DosenLayout>;
};

export default PerwalianDosen;
