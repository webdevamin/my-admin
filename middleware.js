// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const fb_admin_uid = request.cookies.get("fb_admin_uid");
  const isTokenValid = fb_admin_uid === process.env.FB_ADMIN_UID;

  if (!isTokenValid) {
    return Response.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/items", "/settings/:path*"],
};
