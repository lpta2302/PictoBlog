import { useNavigate } from 'react-router-dom';
import { logOut } from '../../../public/assets/icons';
import { useToastContext } from '../../context';
import { useSignOutAccount } from '../../lib/react-query/queries';
import ToggleTheme from '../shared/ToggleTheme';
import { forwardRef } from 'react';

const position = {
  'left': 'top-0 left-[calc(100%+1px)] animate-slideIn',
  'top-left': 'top-[calc(100%+1px)] left-0 animate-slideDown',
  'top-right': 'top-[calc(100%+1px)] right-0 animate-slideDown',
  'right': 'top-0 right-[calc(100%+1px)]',
};

const SubNavbar = ({ pos }, ref) => {
  const navigate = useNavigate();
  const { toast } = useToastContext();

  const { mutateAsync: signOut } = useSignOutAccount();

  const handleSignout = async () => {
    const status = await signOut();

    if (!status) {
      toast({
        type: 'error',
        title: 'Signing out failed, please try again',
      });
      throw Error;
    }

    navigate(0);
  };

  return (
    <nav
      className={`
      absolute flex flex-col gap-1 pb-1
      w-32 sm:w-36
      lg: z-50
      dark:bg-dark-bg bg-white shadow-primary rounded-sm
      ${position[pos]}
      `}
      ref={ref}
    >
      <button
        className="flex-evenly gap-1 p-3 hover:dark:bg-dark-4 hover:bg-off-white border-b border-primary"
        onClick={handleSignout}
      >
        <img
          src={logOut}
          alt={'logOut'}
          className="dark:grayscale sm:w-6 sm:h-6 w-5 h-5"
        />
        <p className="text-medium font-system font-semibold">Log Out</p>
      </button>
      <ToggleTheme size="w-full py-2" />
    </nav>
  );
};

export default forwardRef(SubNavbar);
