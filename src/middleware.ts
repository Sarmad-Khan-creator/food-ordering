import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserByClerkId } from './actions/user.action';

const isPublicRoute = createRouteMatcher(['/auth(.*)', '/', '/api/webhook']);

export default clerkMiddleware(async (auth, request) => {
  const { redirectToSignIn, userId } = auth();
  if (!userId && !isPublicRoute(request)) {
    // return redirectToSignIn({ returnBackUrl: request.url });
    auth().protect();

    const user = await getUserByClerkId(userId!);

    if (user.role === 'USER' && request.url.startsWith('/admin')) {
      NextResponse.redirect('/unauthorized');
    }
  }

  if (userId && !isPublicRoute(request)) {
    return NextResponse.next();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
