export async function onRequest(context) {
  const url = new URL(context.request.url);
  const host = url.hostname.toLowerCase();

  // 1. Direct redirects for vivouch.weiai.ai and vivouch.vi.fyi
  if (host === 'vivouch.weiai.ai' || host === 'vivouch.vi.fyi') {
    const targetUrl = new URL(url.pathname + url.search, 'https://career.weiai.ai');
    return Response.redirect(targetUrl.toString(), 301);
  }

  // 2. Referrer / Voucher shortlinks
  if (
    host === 'v.vi.fyi' || 
    host === 'vouch.vi.fyi' || 
    host === 'r.vi.fyi' || 
    host === 'refer.vi.fyi'
  ) {
    const search = new URLSearchParams(url.search);
    if (!search.has('role')) {
      search.set('role', 'referrer');
    }
    return Response.redirect(`https://career.weiai.ai/?${search.toString()}`, 302);
  }

  // 3. Seeker shortlinks
  if (host === 'c.vi.fyi' || host === 'career.vi.fyi') {
    const search = new URLSearchParams(url.search);
    if (!search.has('role')) {
      search.set('role', 'seeker');
    }
    return Response.redirect(`https://career.weiai.ai/?${search.toString()}`, 302);
  }

  // 4. Any other vi.fyi short domains
  if (host.endsWith('vi.fyi') && host !== 'vi.fyi') {
    const targetUrl = new URL(url.pathname + url.search, 'https://career.weiai.ai');
    return Response.redirect(targetUrl.toString(), 301);
  }

  return context.next();
}
