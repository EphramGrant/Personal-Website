export async function onRequest(context) {
  const response = await context.env.ASSETS.fetch(context.request);
  const url = new URL(context.request.url);
  const path = url.pathname;
  
  const headers = new Headers(response.headers);
  
  if (path.endsWith('.wasm.gz')) {
    headers.set('Content-Type', 'application/wasm');
    headers.set('Content-Encoding', 'gzip');
  } else if (path.endsWith('.framework.js.gz')) {
    headers.set('Content-Type', 'application/javascript');
    headers.set('Content-Encoding', 'gzip');
  } else if (path.endsWith('.data.gz')) {
    headers.set('Content-Type', 'application/octet-stream');
    headers.set('Content-Encoding', 'gzip');
  }
  
  return new Response(response.body, {
    status: response.status,
    headers
  });
}
