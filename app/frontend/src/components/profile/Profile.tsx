import React from "react";
import { toast } from "react-toastify";
import teacherService from "../../services/Teacher";
import functionaryService from "../../services/Functionary";


export type User = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
};

type UserInfo = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    rut: string,
    phone: string | null,
    degree: string | null, 
    college_relationship: string | null,
};

const Profile = (props: { user: User }) => {
    const user = props.user;
    const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const capitalize = (str: string) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    React.useEffect(() => {
        const setup = async () => {
            try {
                if (user.roles.includes("teacher")) {
                    const userData = await teacherService.getTeacher(user.id);
                    setUserInfo(userData);
                } if (user.roles.includes("functionary")) {
                    const userData = await functionaryService.getFunctionary(user.id);
                    setUserInfo(userData);
                }
            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        setup();
    }, [user.id, user.roles]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-[#0f0c29] to-[#47308b] py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b83284] mx-auto"></div>
                        <p className="mt-4 text-[#f0f0f5]">Cargando información del perfil...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-[#f0f0f5] mb-4">Mi Perfil</h1>
                    <p className="text-lg text-[#e8e7f0]">
                        Información Personal y Datos de Contacto
                    </p>
                </div>

                {userInfo === null ? (
                    <div className="bg-[#16106b] rounded-lg shadow-[0_8px_25px_rgba(184,50,132,0.4)] p-8 text-center border border-[rgba(123,108,246,0.5)]">
                        <div className="text-[#b83284] mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2">
                            Información no disponible
                        </h3>
                        <p className="text-[#e8e7f0]">
                            No se pudo cargar la información del perfil. Por favor, intenta nuevamente.
                        </p>
                    </div>
                ) : (
                    <div className="bg-[#16106b] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.2)] overflow-hidden border border-[rgba(123,108,246,0.5)]">
                        <div className="bg-linear-to-r from-[#47308b] to-[#b83284] px-6 py-8 border-b border-[rgba(184,50,132,0.5)]">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {capitalize(userInfo.first_name)} {capitalize(userInfo.last_name)}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#f0f0f5] border-b border-[rgba(123,108,246,0.5)] pb-2">
                                        Información Personal
                                    </h3>
                                    
                                    {userInfo.email && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#a685ff]">Correo Electrónico</label>
                                            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-[#f0f0f5]">{userInfo.email}</p>
                                            </div>
                                        </div>
                                    )}

                                    {userInfo.rut && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#a685ff]">RUT</label>
                                            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                </svg>
                                                <p className="text-[#f0f0f5] font-mono">{userInfo.rut}</p>
                                            </div>
                                        </div>
                                    )}

                                    {userInfo.phone && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#a685ff]">Teléfono</label>
                                            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <p className="text-[#f0f0f5]">{userInfo.phone}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-[#f0f0f5] border-b border-[rgba(123,108,246,0.5)] pb-2">
                                        Información Profesional
                                    </h3>

                                    {userInfo.degree && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#a685ff]">Profesión</label>
                                            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v6" />
                                                </svg>
                                                <p className="text-[#f0f0f5]">{capitalize(userInfo.degree)}</p>
                                            </div>
                                        </div>
                                    )}

                                    {userInfo.college_relationship && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-[#a685ff]">Relación Contractual</label>
                                            <div className="flex items-center space-x-3 p-3 bg-[rgba(255,255,255,0.08)] rounded-lg border border-[rgba(255,255,255,0.15)]">
                                                <svg className="w-5 h-5 text-[#7b6cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                <p className="text-[#f0f0f5]">{userInfo.college_relationship === "other" ?  "Otra" : userInfo.college_relationship}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;