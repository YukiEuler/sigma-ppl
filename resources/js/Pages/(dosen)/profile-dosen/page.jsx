import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import DosenLayout from "../../../Layouts/DosenLayout";

const ProfileDosen = () => {
    const { props } = usePage();
    const dosenData = props.dosen;
    const [dosen, setDosen] = useState(dosenData);

    useEffect(() => {
        setDosen(dosenData);
    }, [dosenData]);

    return (
        <DosenLayout dosen={dosen}>
            <main className="flex-1 max-h-full">
                <div className="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
                    <h1 className="text-2xl font-semibold whitespace-nowrap text-black">
                        Profile
                    </h1>
                </div>
                {/* <div className="grid grid-cols-1 gap-5 mt-6">
                    <div className="p-3 transition-shadow border rounded-lg shadow-sm hover:shadow-lg bg-gray-100">
                        <div className="flex items-start justify-between p-2 border rounded-lg shadow-lg bg-white">
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-400">
                                    Mahasiswa Aktif
                                </span>
                                <span className="text-lg font-semibold">
                                    50
                                </span>
                            </div>
                            <div className="p-8"></div>
                        </div>
                    </div>
                </div> */}
                
            </main>
        </DosenLayout>
    );
};

export default ProfileDosen;
