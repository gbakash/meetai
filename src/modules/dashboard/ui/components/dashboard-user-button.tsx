"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { LogOut, User, CreditCard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!session) {
    return (
      <div className="flex items-center justify-center py-4">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const user = session.user;

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => window.location.reload(),
      },
    });
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button className="flex w-full items-center gap-3 px-3 py-2 hover:bg-sidebar-accent/30 rounded-md transition">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || "/default-avatar.png"} />
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </button>
        </DrawerTrigger>

        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold">
              {user.name}
            </DrawerTitle>
            <DrawerDescription>{user.email}</DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col gap-2 mt-4 px-2">
            <Button variant="outline" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" /> Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" /> Billing
            </Button>
          </div>

          <DrawerFooter className="mt-4">
            <Button variant="destructive" className="w-full" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 px-3 py-2 hover:bg-sidebar-accent/30 rounded-md transition">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || "/default-avatar.png"} />
            <AvatarFallback>
              {user.name?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="top" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" /> Billing
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
