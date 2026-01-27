import type { MyPageMenuKey } from '@/features/my-page/types';

import { MY_PAGE_MENU } from '@/features/my-page/constants/myPageMenu';

type Props = {
  activeKey: MyPageMenuKey;
  onChange: (key: MyPageMenuKey) => void;
};

export default function MyPageMenu({ activeKey, onChange }: Props) {
  return (
    <nav className="mt-4 border-b border-white/10">
      <ul className="flex gap-8">
        {MY_PAGE_MENU.map(menu => {
          const isActive = menu.key === activeKey;

          return (
            <li key={menu.key}>
              <button
                className={[
                  'pb-4 text-sm font-medium transition',
                  isActive
                    ? 'border-b-2 border-white text-white'
                    : 'text-white/50 hover:text-white',
                ].join(' ')}
                onClick={() => onChange(menu.key)}
                type="button"
              >
                {menu.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
