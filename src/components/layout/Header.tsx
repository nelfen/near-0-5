import { Link } from 'react-router';

import { ROUTES_PATHS } from '@/constants';

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#070913] px-6 py-3">
      <div className="flex items-center justify-start gap-3">
        <Link
          className="text-xl font-bold text-[#FFFFFF]"
          to={ROUTES_PATHS.MAIN}
        >
          Near 0.5
        </Link>
      </div>
    </header>
  );
}

export default Header;
