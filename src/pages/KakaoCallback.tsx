import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { ROUTES_PATHS } from '@/constants';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');

      if (!code) {
        console.error('Authorization code not found');
        navigate(ROUTES_PATHS.LOGIN);
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/kakao/callback`,
          {
            body: JSON.stringify({
              authorization_code: code,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          },
        );
        if (!response.ok) {
          throw new Error('Login failed');
        }
        const data = await response.json();

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        navigate(ROUTES_PATHS.MAIN);
      } catch (error) {
        console.error('Kakao login error:', error);
        navigate(ROUTES_PATHS.LOGIN);
      }
    };
    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070913]">
      <div className="text-white">로그인 처리 중...</div>
    </div>
  );
}
