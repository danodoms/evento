"use client";

import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectFilter from "@/components/SelectFilter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { format, getMonth, getYear, parseISO } from "date-fns";
import {
    Ellipsis,
    Filter,
    Plus,
    Trash,
    Crown,
    BadgeCheck,
    Award,
    Info,
    Ban,
    Check,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getAllUsers, type User, convertRole, toggleUserStatus } from "@/models/User";
import UserFormDialog from "./UserFormDialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useAuth } from "@/hooks/useAuth";
import Unauthorized from "@/components/auth/Unauthorized";




export default function AdminPage() {

    const { currentUserRole } = useAuth()




    const {
        data: users = [],
        error,
        isLoading,
        refetch
    } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    const [statusFilter, setStatusFilter] = useState<"active" | "inactive">(
        "active",
    );


    const resetFilters = () => {
        setStatusFilter("active");
    };

    const countActiveFilters = () => {
        let count = 0;
        if (statusFilter !== "active") count++;
        return count;
    };

    const handleToggleUserStatus = (user: User) => {
        toggleUserStatus(user);
        refetch()
    }


    const getIconByRole = (role: number) => {
        switch (role) {
            case 0:
                return <Crown className="size-5" />;
            case 1:
                return <Award className="size-5" />;
            case 2:
                return <BadgeCheck className="size-5" />;
            default:
                return null; // Return null or handle other cases as needed
        }
    };

    const filteredUsers = users.filter(
        (user) => (statusFilter === "active" ? user.is_active : !user.is_active),
    );


    if (currentUserRole !== "ADMIN") {
        return <Unauthorized />
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold tracking-tight mr-auto">Manage Access</h1>
                <Link href="/admin/create">
                    <Button variant={"ghost"}>
                        <Plus className="size-4" />
                        Add
                    </Button>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">
                            <Filter className="mr-2 size-4" />
                            Filter
                            {countActiveFilters() > 0 && (
                                <Badge variant={"destructive"} className="ml-2">
                                    {countActiveFilters()}
                                </Badge>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="flex h-full justify-center flex-col">
                        <SheetHeader>
                            <SheetTitle>Filter Users</SheetTitle>
                            <SheetDescription className="text-balance">
                                Select filters to apply
                            </SheetDescription>
                        </SheetHeader>
                        <div className="flex gap-1 flex-col justify-evenly py-4">
                            <p className="text-xs opacity-50">Status</p>
                            <SelectFilter
                                label="Status"
                                items={["Inactive"]}
                                value={statusFilter}
                                setValue={setStatusFilter}
                                defaultValue={{ label: "Active", value: "active" }}
                            />
                        </div>
                        <SheetFooter className="flex gap-2 flex-col">
                            <SheetClose asChild>
                                <Button type="submit" className="w-full mx-auto">
                                    Apply Filters
                                </Button>
                            </SheetClose>
                            <Button
                                className="mt-20 w-full"
                                onClick={resetFilters}
                                variant={"ghost"}
                            >
                                Reset Filters
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>


            {/* <div className="p-4 border rounded-lg flex flex-col gap-2 ">
                <h2 className="">
                    About User roles
                </h2>

                <Separator className="my-1" />

                <div className="text-xs flex flex-col gap-3 ">
                    <p><Crown className="inline-block mr-2" />Admin: Full access</p>

                    <p><Award className="inline-block mr-2" />Officer: Scanning and adding students</p>

                    <p><BadgeCheck className="inline-block mr-2" />Representative: Scan module only</p>
                </div>
            </div> */}


            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger >
                        <div className="flex gap-3 items-center">
                            <Info />
                            About roles
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="text-xs flex flex-col gap-3 ">
                            <p><Crown className="inline-block mr-2" />Admin: Full access</p>

                            <p><Award className="inline-block mr-2" />Officer: Scanning and adding students</p>

                            <p><BadgeCheck className="inline-block mr-2" />Representative: Scan module only</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>



            {filteredUsers.length ? (
                <div className="flex flex-col gap-3 md:grid grid-cols-2 overflow-y-auto max-h-screen rounded-md">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            className="p-4 border rounded-lg flex flex-col gap-2 backdrop-contrast-50 backdrop-opacity-25"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">


                                    {/* <Crown className="size-5" /> */}

                                    {getIconByRole(user.role)}

                                    <p className="font-semibold text-sm">{convertRole(user.role)}</p>


                                    {!user.is_active && <Badge variant="destructive">Deactivated</Badge>}


                                </div>
                                <div className="flex gap-2 items-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className=" rounded-full text-sm flex gap-2 items-center">
                                            <Ellipsis className=" " />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild className="w-full">
                                                <UserFormDialog user={user} />
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleToggleUserStatus(user)}>
                                                {user.is_active ? (
                                                    <><Ban className="size-4 mr-2" />Deactivate</>
                                                ) : (
                                                    <><Check className="size-4 mr-2" />Activate</>
                                                )}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <Separator className="my-1" />
                            <h2 className="font-bold text-xl">{user.email}</h2>
                            <div className="text-xs text-balance truncate mt-1 opacity-50">
                                Added on {format(user?.created_at, 'MMMM dd, yyyy HH:mm:ss')}
                            </div>
                            {/* <div className="flex gap-2 flex-wrap mt-1">
                                <Badge className="flex gap-1">
                                    <Clock className="size-3" />
                                    {renderEventDuration(event.duration)}
                                </Badge>
                                {event.location && (
                                    <Badge className="flex gap-1">
                                        <MapPin className="size-3" />
                                        {event.location}
                                    </Badge>
                                )}
                            </div> */}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col mx-auto gap-4 p-20 opacity-50">
                    <p>No Users</p>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}
