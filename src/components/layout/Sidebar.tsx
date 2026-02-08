import { Link, useLocation } from 'react-router';

import { MENU_ITEMS } from '@/constants';
import { cn } from '@/utils/cn';
import { isMenuItemActive } from '@/utils/navigation';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed top-15 left-0 z-40 hidden h-[calc(100vh-60px)] flex-col overflow-hidden bg-[#070913] transition-all duration-300 md:flex',
        isOpen ? 'w-60' : 'w-0',
      )}
    >
      <nav className="flex-1 px-4 py-10">
        {MENU_ITEMS.map(item => {
          const isActive = isMenuItemActive(location, item.path);
          const Icon = item.icon;

          return (
            <Link
              className={cn(
                'mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition-all',
                isActive
                  ? 'bg-[#dc196d] text-white shadow-md'
                  : 'hover:bg-bg-section-dark text-[#c7c9d9] hover:text-white',
              )}
              key={item.label}
              to={item.path}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <footer className="shrink-0 border-t border-[#e5e7eb] p-4">
        <p className="text-xs whitespace-nowrap text-[#c7c9d9]">
          이용약관 | 문의
        </p>
        <p className="mt-1 text-xs whitespace-nowrap text-[#c7c9d9]">
          © 2026 Near0.5
        </p>
      </footer>
    </aside>
  );
}
