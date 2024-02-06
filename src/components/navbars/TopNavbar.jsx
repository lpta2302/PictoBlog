import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useUserContext } from '../../context/AuthContext';
import { webName } from '../../../public/assets/images';
import { close, menu, profilePlaceholder } from '../../../public/assets/icons';
import { navbar } from '../../constants';
import Loader from '../shared/Loader';
import GhostButton from '../button/GhostButton';
import SubNavbar from './SubNavbar';
import ToggleSubnav from './ToggleSubnav';

export default function TopNavbar() {
  const [menuOn, setMenuOn] = useState(false);
  const subnavRef = useRef();
  const { pathname } = useLocation();

  const { user, isLoading: isGettingUser } = useUserContext();

  return (
    <nav className="top-navbar">
      <div className="flex-between relative py-2">
        <div className="w-9 h-9">
          <ToggleSubnav
            pos="top-left"
            subnavRef={subnavRef}
            menuState={{ menuOn, setMenuOn }}
          />
        </div>
        <Link to="/" className="flex-center">
          <img src={webName} alt="logo" height={48} width={120} />
        </Link>
        <div className="flex-center gap-2">
          {isGettingUser ? (
            <div className="flex-center w-8 h-8">
              <Loader />
            </div>
          ) : (
            <Link
              to={`profile/${user.$id}`}
              className="flex-center transition
              hover:opacity-80"
            >
              <img
                src={user.imageUrl || profilePlaceholder}
                alt="avatar"
                className="w-8 h-8 xs:w-9 xs:h-9 rounded-full object-cover object-center"
              />
            </Link>
          )}
        </div>
        {menuOn && <SubNavbar pos="top-left" ref={subnavRef} />}
      </div>
      <div className="flex-evenly max-xs:hidden">
        {navbar.map((item) => {
          const isActive = pathname === item.linkRoute;
          return (
            <NavLink to={item.linkRoute} key={item.label}>
              <button
                className={`flex-center p-2 transition
                border-b-4 border-transparent
                hover:opacity-80
                ${isActive ? 'border-b-primary-1 pointer-events-none' : ''}`}
              >
                <img
                  src={item.iconUrl}
                  alt={item.alt}
                  className={`w-5 h-5 xs:w-6 xs:h-6 ${
                    isActive ? 'dark:make-whitet' : 'grayscale'
                  }`}
                />
              </button>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
