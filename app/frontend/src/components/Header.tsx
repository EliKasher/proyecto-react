import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaUser, 
  FaUserPlus, 
  FaBook, 
  FaSignOutAlt,
  FaUserCircle,
  FaSignInAlt 
} from 'react-icons/fa';
import getHeaderItems from '../assets/contents/header';

interface HeaderProps {
  userRole: string | null;
  userName: string | null;
  onLogout: () => void;
}

const Header = ({ 
    userRole,
    userName, 
    onLogout 
    }: HeaderProps
) => {
  const navigate = useNavigate();
  const headerItems = getHeaderItems(userRole || '');

  const getIcon = (id: string) => {
    switch (id) {
      case 'home':
        return <FaHome />;
      case 'profile':
        return <FaUser />;
      case 'register':
        return userRole === 'functionary' ? <FaUserPlus /> : <FaBook />;
      case 'login':  // Nuevo caso para login
        return <FaSignInAlt />;
      case 'logout':
        return <FaSignOutAlt />;
      default:
        return null;
    }
  };

  const handleNavigation = (path: string, id: string) => {
    if (id === 'logout') {
      onLogout();
    } else {
      navigate(path);
    }
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/">
          <img src="../assets/react.svg" alt="Logo" className="header-logo-img" />
        </Link>
      </div>

      <nav className="header-nav">
        <ul className="header-nav-list">
          {headerItems.map((item) => (
            <li key={item.id} className="header-nav-item">
              <button
                className="header-nav-link"
                onClick={() => handleNavigation(item.path, item.id)}
              >
                <span className="header-icon">{getIcon(item.id)}</span>
                <span className="header-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {userName ?  (
        <div className="header-user">
          <FaUserCircle className="header-user-icon" />
          <span className="header-user-name">Hola, {userName}</span>
        </div>
      ) : (
        <div className="header-user">
          <FaUserCircle className="header-user-icon" />
          <span className="header-user-name">Bienvenido</span>
        </div>
      )}
    </header>
  );
};

export default Header;