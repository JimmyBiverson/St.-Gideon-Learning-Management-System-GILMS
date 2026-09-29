import { router, usePage } from '@inertiajs/react';
import {
   GraduationCap,
   Heart,
   LogOut,
   Mail,
   SettingsIcon,
   UserCircle,
} from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTrigger,
} from '@/components/ui/sheet';
import { useInitials } from '@/hooks/use-initials';
import { logout } from '@/routes';

export function ProfileDrawer() {
   const { auth, translate, direction } = usePage<SharedData>().props;
   const { button } = translate;
   const { user } = auth;
   const getInitials = useInitials();
   const [open, setOpen] = useState(false);

   const studentMenuItems = [
      {
         name: button.my_courses ?? 'My Courses',
         slug: 'courses',
         Icon: GraduationCap,
      },
      {
         name: button.wishlist ?? 'Wishlist',
         slug: 'wishlist',
         Icon: Heart,
      },
      {
         name: button.profile ?? 'Profile',
         slug: 'profile',
         Icon: UserCircle,
      },
      {
         name: button.settings ?? 'Settings',
         slug: 'settings',
         Icon: SettingsIcon,
      },
   ];

   const handleLogout = () => {
      setOpen(false);
      router.post(logout());
   };

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               size="icon"
               variant="ghost"
               className="relative h-10 w-10 rounded-full bg-transparent"
            >
               <Avatar className="h-10 w-10">
                  <AvatarImage
                     src={user.photo || ''}
                     alt={user.name}
                     className="object-cover"
                  />
                  <AvatarFallback className="bg-muted text-base font-semibold">
                     {getInitials(user.name)}
                  </AvatarFallback>
               </Avatar>
               {/* Online status dot */}
               <span className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
            </Button>
         </SheetTrigger>

         <SheetContent
            className="w-80 p-0 sm:max-w-80"
            side={direction === 'rtl' ? 'left' : 'right'}
         >
            <SheetHeader className="p-0">
               {/* Cover / Hero area */}
               <div className="relative h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent" />

               {/* Avatar overlapping cover */}
               <div className="absolute top-14 left-5">
                  <Avatar className="h-16 w-16 border-4 border-background shadow-md">
                     <AvatarImage
                        src={user.photo || ''}
                        alt={user.name}
                        className="object-cover"
                     />
                     <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
                        {getInitials(user.name)}
                     </AvatarFallback>
                  </Avatar>
               </div>
            </SheetHeader>

            {/* Profile Info */}
            <div className="space-y-1 px-5 pt-12 pb-4">
               <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                     <h3 className="truncate text-base font-semibold">
                        {user.name}
                     </h3>
                     <div className="mt-0.5 flex items-center gap-1.5">
                        <Mail className="h-3 w-3 flex-shrink-0 text-muted-foreground" />
                        <p className="truncate text-xs text-muted-foreground">
                           {user.email}
                        </p>
                     </div>
                  </div>
                  <Badge
                     variant="secondary"
                     className="flex-shrink-0 text-[10px] capitalize"
                  >
                     {user.role}
                  </Badge>
               </div>
            </div>

            <Separator />

            {/* Logout */}
            <div className="px-3 py-3">
               <button
                  className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10"
                  onClick={handleLogout}
               >
                  <LogOut className="h-4 w-4" />
                  <span>{button.logout ?? 'Log out'}</span>
               </button>
            </div>
         </SheetContent>
      </Sheet>
   );
}
