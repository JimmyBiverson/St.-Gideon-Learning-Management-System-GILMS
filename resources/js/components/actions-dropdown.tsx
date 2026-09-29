import { Link } from '@inertiajs/react';
import { EllipsisVertical, PencilIcon, TrashIcon, Eye } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import DeleteModal from './inertia/delete-modal';

interface ActionRoutes {
   label: string;
   route: string;
   method: 'get' | 'put' | 'delete';
   message?: string;
   role?: boolean;
}
interface Props {
   icon?: ReactNode;
   side?: 'left' | 'right' | 'top' | 'bottom';
   routes?: ActionRoutes[];
   component?: ReactNode;
   className?: string;
}

const ActionsDropdown = (props: Props) => {
   const {
      icon = <EllipsisVertical />,
      side = 'left',
      routes,
      component,
      className,
   } = props;

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
               {icon}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent side={side} className={cn('max-w-32', className)}>
            <DropdownMenuGroup className="space-y-1">
               {component ?? component}

               {routes?.map((route, index) => {
                  if (route.role === false) {
                     return null;
                  }

                  if (route.method === 'delete') {
                     return (
                        <DeleteModal
                           key={index}
                           message={route.message ?? ''}
                           routePath={route.route}
                           actionComponent={
                              <DropdownMenuItem
                                 variant="destructive"
                                 className="h-8 cursor-pointer"
                                 onSelect={(e) => e.preventDefault()}
                              >
                                 <TrashIcon className="stroke-destructive" />
                                 <span className="text-destructive">
                                    {route.label}
                                 </span>
                              </DropdownMenuItem>
                           }
                        />
                     );
                  }

                  const Icon = route.method === 'get' ? Eye : PencilIcon;

                  return (
                     <DropdownMenuItem
                        key={index}
                        className="h-8 cursor-pointer"
                        asChild
                     >
                        <Link
                           href={route.route}
                           method={route.method}
                           className="w-full text-left"
                           as={route.method === 'get' ? 'a' : 'button'}
                        >
                           <Icon className="stroke-foreground" />
                           {route.label}
                        </Link>
                     </DropdownMenuItem>
                  );
               })}
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default ActionsDropdown;
