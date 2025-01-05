import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const sessionClaims = await auth();
  const userId = sessionClaims?.userId;

  // if (!userId) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  let userRole = "student"; // Default to "student"
  try {
    // Fetch user metadata using Clerk REST API
    const clerkApiKey = process.env.CLERK_SECRET_KEY; // Ensure this is set in .env
    const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${clerkApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user metadata: ${response.statusText}`);
    }

    const user = await response.json();
    userRole = user.public_metadata?.userType || "student";
  } catch (error) {
    console.error("Failed to fetch user metadata:", error);
  }

  if (isStudentRoute(req)) {
    if (userRole !== "student") {
      const url = new URL("/teacher/courses", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== "teacher") {
      const url = new URL("/user/courses", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
