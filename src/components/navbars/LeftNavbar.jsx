import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useUserContext } from '../../context';

import {
    close,
    faviconRegular,
    menu,
    profilePlaceholder,
} from '../../../public/assets/icons';
import { logo, webName } from '../../../public/assets/images';
import { navbar } from '../../constants';
import Loader from '../shared/Loader';
import SubNavbar from './SubNavbar';
import ToggleSubnav from './ToggleSubnav';

export default function LeftNavbar() {
    const [menuOn, setMenuOn] = useState(false);
    const subnavRef = useRef();
    const { pathname } = useLocation();
    const { user, isLoading: isGettingUser } = useUserContext();

    return (
        <nav className="left-navbar">
            <div>
                <Link to="/" className="flex-center flex-col h-24">
                    <img
                        src={faviconRegular}
                        alt="logo"
                        className="w-10 h-10"
                    />
                    <img src={webName} alt="web-name" className="w-[60%]" />
                </Link>
            </div>
            <div className="flex-center w-[90%]">
                {isGettingUser ? (
                    <div className="flex-center w-10 h-10">
                        <Loader />
                    </div>
                ) : (
                    <Link
                        to={`/profile/${user.$id}`}
                        className="w-full hover:opacity-80 transition"
                    >
                        <div
                            className="
                flex-center px-1 py-2 rounded-md w-full
                pointer-events-none bg-sky-400 gap-1
              "
                        >
                            <img
                                src={user.imageUrl || profilePlaceholder}
                                alt="avatar"
                                className="object-cover object-center w-10 h-10 rounded-full bg-white"
                            />
                            <p className="font-semibold font-system text-white text-truncate">
                                {user.name}
                            </p>
                        </div>
                    </Link>
                )}
            </div>
            {navbar.map((item) => {
                const isActive = pathname === item.linkRoute;
                return (
                    <NavLink
                        to={item.linkRoute}
                        key={item.label}
                        className="w-full flex-evenly"
                    >
                        <button
                            className={`flex-center h-12 w-[90%] rounded-full
                hover:opacity-80 transition gap-2
                ${isActive && `pointer-events-none w-[90%] bg-sky-400`}`}
                        >
                            <img
                                src={item.iconUrl}
                                alt={item.alt}
                                className={` w-6 h-6
                ${isActive ? 'brightness-0 invert' : 'dark:make-white'}`}
                            />
                            {isActive && (
                                <p className="text-white font-semibold capitalize">
                                    {item.label}
                                </p>
                            )}
                        </button>
                    </NavLink>
                );
            })}
            <div className="flex-center relative h-12 w-full">
                <ToggleSubnav
                    subnavRef={subnavRef}
                    pos="left"
                    menuState={{menuOn,setMenuOn}}
                />
                {menuOn && <SubNavbar ref={subnavRef} pos="left" />}
            </div>
        </nav>
    );
}
