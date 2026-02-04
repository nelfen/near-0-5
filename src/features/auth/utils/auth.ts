import {
  LOWERCASE_SOCIAL_LOGIN_PROVIDERS,
  type LowercaseSocialLoginProvider,
} from '@/features/auth/constants/login';

export const isValidSocialLoginProvider = (
  provider: string | undefined,
): provider is LowercaseSocialLoginProvider => {
  if (!provider) {
    return false;
  }

  return (LOWERCASE_SOCIAL_LOGIN_PROVIDERS as readonly string[]).includes(
    provider.toLowerCase(),
  );
};
