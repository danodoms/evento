import { useClerk, useAuth as useClerkAuth, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { convertRole, getAllUsers, role, User } from "@/models/User"; // Adjust this import based on your actual implementation

export function useAuth() {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const [currentUserRole, setCurrentUserRole] =
    useState<role>("REPRESENTATIVE");

  //THIS SETS THE INITIAL SCREEN WHEN AUTHENTICATING:  when set to TRUE, it does not show the authenticating screen to authorized users but shows unauthorized users the homescreen briefly
  const [isAuthorized, setIsAuthorized] = useState(true);
  const { signOut } = useClerk();

  const { data: authorizedUsers = [], isLoading: isUsersLoading } = useQuery<
    User[]
  >({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const emailExists = (users: User[], email: string): boolean => {
    console.log("Finding this email: ", email);
    return users.some((user) => user.email === email && user.is_active);
  };

  const getUserRole = (users: User[], email: string): role => {
    console.log("Finding role for this email: ", email);
    const user = users.find((user) => user.email === email && user.is_active);

    return user ? convertRole(user.role) : "REPRESENTATIVE";
  };

  useEffect(() => {
    //THIS TWO CHECKS BELOW ARE THE MOST IMPORTANT RETURNS
    if (authorizedUsers === undefined) {
      console.log("No users from database yet");
      return;
    }

    if (user?.primaryEmailAddress === undefined) {
      console.log("No user email found yet");
      return;
    }

    //if clerk user is loaded and users was queried successfully from supabase
    if (isLoaded && !isUsersLoading && authorizedUsers.length > 0) {
      // Skip authorization check for sign-in route
      if (pathname === "/sign-in") {
        setIsAuthorized(true);
        return;
      }

      if (!isSignedIn) {
        router.push("/sign-in");
      } else {
        const isUserAuthorized = emailExists(
          authorizedUsers,
          String(user?.primaryEmailAddress)
        );

        if (isUserAuthorized) {
          console.log("User authorized");
          setIsAuthorized(true);
          setCurrentUserRole(() =>
            getUserRole(authorizedUsers, String(user.primaryEmailAddress))
          );
        } else {
          console.log("User not authorized");
          setIsAuthorized(false);
          // signOut();  //THIS FUNCTION HAS BEEN MOVED TO "UNAUTHORIZED" COMPONENT
          // Optionally, redirect to an unauthorized page
          // router.push("/sign-in");
        }
      }
    }
  }, [
    isLoaded,
    isSignedIn,
    user,
    authorizedUsers,
    isUsersLoading,
    router,
    pathname,
  ]);

  return {
    isLoaded: isLoaded && !isUsersLoading,
    isAuthorized,
    user,
    currentUserRole,
  };
}
