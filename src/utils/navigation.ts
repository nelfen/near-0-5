export const isMenuItemActive = (
  location: { pathname: string; search: string },
  itemPath: string,
) => {
  if (itemPath.includes('?')) {
    const currentFullUrl = `${location.pathname}${location.search}`;
    return currentFullUrl === itemPath;
  }

  return location.pathname === itemPath;
};
