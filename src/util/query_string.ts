export function getQueryStringValue(name: string) {
  if ((window as any) && typeof window !== 'undefined') {
    const query = (window as any).location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === name) {
        return decodeURIComponent(pair[1]);
      }
    }
  }
  return undefined;
}
