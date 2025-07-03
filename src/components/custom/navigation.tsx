import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import ProfileMenu from "./profile-menu";

const Navigation = async () => {
  const session = await getSession();

  const headersList = await headers();
  const fullUrl = headersList.get("x-url") || headersList.get("referer");

  const pathname = fullUrl ? new URL(fullUrl).pathname : null;

  return (
    <nav className="border-b border-gray-800 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 h-16">
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Explanity
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!session ? (
              <>
                <Link
                  href={{
                    pathname: "/sign-in",
                    query: { callbackUrl: pathname },
                  }}
                >
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  href={{
                    pathname: "/sign-up",
                    query: { callbackUrl: pathname },
                  }}
                >
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <ProfileMenu user={session.user} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const getSession = async () => {
  "use server";
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export default Navigation;
