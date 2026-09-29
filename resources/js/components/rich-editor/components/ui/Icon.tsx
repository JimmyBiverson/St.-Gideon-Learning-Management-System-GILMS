import clsx from 'clsx';
import type { LucideProps } from 'lucide-react';
import { icons } from '../icons/icons';
import type { LucideIcon } from '../icons/icons';

export type IconProps = LucideProps & {
   name: keyof typeof icons;
};

export const Icon = ({ name, className, size = 20, ...props }: IconProps) => {
   const Comp: LucideIcon = icons[name];

   return (
      <Comp size={size} className={clsx('rte-icon', className)} {...props} />
   );
};

export default Icon;
