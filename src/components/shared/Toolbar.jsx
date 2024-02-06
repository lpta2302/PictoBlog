import { useNavigate } from 'react-router-dom';
import { returnIcon } from '../../../public/assets/icons';
import Button from '../button/Button';
import SubNavbar from '../navbars/SubNavbar';
import ToggleSubnav from '../navbars/ToggleSubnav';
import { useRef, useState } from 'react';

export default function Toolbar({ position }) {
  const [menuOn, setMenuOn] = useState(false);
  const subnavRef = useRef();
  const navigate = useNavigate();
  return (
    <div
      className={`
      fixed px-4 h-16 flex-between w-full
      ${position ? position : ' top-0 right-0'}
    `}
    >
      <div className="w-10 h-10">
        <Button
          rounded={'rounded-full'}
          bgColor={'bg-dark-4 brightness-150 hover:brightness-200'}
          size={'w-full h-full'}
          onClick={() => navigate(-1)}
        >
          <img src={returnIcon} alt="return" className="make-white w-4 h-4" />
        </Button>
      </div>
      <div className="w-11 h-11 relative">
        <ToggleSubnav
          subnavRef={subnavRef}
          pos="top-right"
          menuState={{ menuOn, setMenuOn }}
        />
        {menuOn && <SubNavbar pos="top-right" ref={subnavRef} />}
      </div>
    </div>
  );
}
