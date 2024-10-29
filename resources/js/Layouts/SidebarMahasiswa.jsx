import React from "react";
import { Icon } from "@iconify/react";

const SidebarMahasiswa = ({ mahasiswa }) => {
    return (
        <aside
            id="default-sidebar"
            class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div class="h-full px-3 py-4 overflow-y-auto" style={{ backgroundColor: "#1EAADF" }}>
                <ul class="space-y-2 font-medium">
                    <li>
                        <Icon
                            icon="gg:profile"
                            color="white"
                            width="150"
                            height="150"
                            className="mx-auto mt-4"
                        />
                        <div className="flex flex-col p-2 mb-3">
                            <span className="dark:text-white text-xl">
                                {mahasiswa.nama}
                            </span>
                            <span className="dark:text-slate-300 text-l">
                                {mahasiswa.nim}
                            </span>
                            <span className="dark:text-slate-300 text-m">
                                {mahasiswa.nama_prodi}
                            </span>
                        </div>
                    </li>
                    <li>
                        <a
                            href="dashboard"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                        >
                            <Icon
                                icon="mingcute:home-3-fill"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Home</span>
                        </a>
                    </li>
                    {/* <li>
                        <a
                            href="/mahasiswa/profile"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                        >
                            <Icon
                                icon="iconamoon:profile-fill"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">Profile</span>
                        </a>
                    </li> */}
                    <li>
                        <a
                            href="/mahasiswa/irs"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                        >
                            <Icon
                                icon="basil:document-solid"
                                width="24"
                                height="24"
                            />
                            <span class="ms-3">IRS</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/actionlogout"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100"
                        >
                            <Icon
                                icon="ri:logout-box-r-fill"
                                width="24"
                                height="24"
                            />
                            <span class="flex-1 ms-3 whitespace-nowrap">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SidebarMahasiswa;
