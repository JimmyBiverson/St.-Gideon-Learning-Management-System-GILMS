import type { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

const IconInlineCode = forwardRef<SVGSVGElement, LucideProps>(
   ({ color = 'currentColor', size = 24, strokeWidth = 2, ...props }, ref) => {
      return (
         <svg
            ref={ref}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
            {...props}
         >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 6.5l-5.5 5.5l5.5 5.5" />
            <path d="M16 6.5l5.5 5.5l-5.5 5.5" />
         </svg>
      );
   },
);

IconInlineCode.displayName = 'IconInlineCode';

export default IconInlineCode;
