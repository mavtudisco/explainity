"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

const ProfileMenu = (props: Props) => {
  const { user } = props;

  const router = useRouter();

  // Helper to get initials
  function getInitials(name: string | undefined) {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer"
          title={user?.name || user?.email}
        >
          {getInitials(user?.name)}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
        {/* <DropdownMenuItem
          onClick={async () => {
            router.push("/profile");
          }}
          className="text-white hover:bg-gray-800 cursor-pointer"
        >
          Profile
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/");
                  router.refresh();
                },
              },
            });
          }}
          className="text-white hover:bg-gray-800 cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
