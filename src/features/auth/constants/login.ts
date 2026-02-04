const REDIRECT_PARAM = 'redirect';
const REDIRECT_KEY = 'login_redirect';

const SOCIAL_LOGIN_PROVIDERS = ['Kakao', 'Naver'] as const;
const LOWERCASE_SOCIAL_LOGIN_PROVIDERS = SOCIAL_LOGIN_PROVIDERS.map(provider =>
  provider.toLowerCase(),
) as LowercaseSocialLoginProvider[];

type LowercaseSocialLoginProvider = Lowercase<SocialLoginProvider>;
type SocialLoginProvider = (typeof SOCIAL_LOGIN_PROVIDERS)[number];

export {
  LOWERCASE_SOCIAL_LOGIN_PROVIDERS,
  type LowercaseSocialLoginProvider,
  REDIRECT_KEY,
  REDIRECT_PARAM,
  SOCIAL_LOGIN_PROVIDERS,
  type SocialLoginProvider,
};
