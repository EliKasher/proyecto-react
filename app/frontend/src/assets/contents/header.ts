interface HeaderItem {
  id: string;
  path: string;
  label: string;
}

export const getHeaderItems = (userRole: string): HeaderItem[] => {
  const homeItems = userRole === 'functionary' ? [
    { 
      id: "home", 
      path: "/view-courses", 
      label: "Ver Cursos", 
    }
  ] : userRole === 'teacher' ? [ 
    { 
      id: "home", 
      path: "/view-courses", 
      label: "Mis Cursos", 
    }
  ] : [];

    const profileItems = userRole ? [ 
    { 
      id: "profile", 
      path: "/profile", 
      label: "Mi Perfil", 
    }
  ] : [];

  const registerItems = userRole === 'functionary' ? [
    { 
      id: "register", 
      path: "/functionary-form", 
      label: "Registrar Funcionario", 
    }
  ] : userRole === 'teacher' ? [ 
    { 
      id: "register", 
      path: "/course-form", 
      label: "Registrar Curso", 
    }
  ] : [];

  const authItems = userRole ? [
    { 
      id: "logout", 
      path: "/logout", 
      label: "Cerrar Sesión", 
    }
  ] : [
    {
      id: "register",
      path: "/register-teacher",
      label: "Regístrate"
    },
    {
      id: "login",
      path: "/login-teacher",
      label: "Iniciar Sesión"
    }
  ];

  return [...homeItems, ...registerItems, ...profileItems, ...authItems];
};

export default getHeaderItems;