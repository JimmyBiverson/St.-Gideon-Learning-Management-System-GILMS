import payments from '@/routes/payments';

interface Props {
   from?: 'api' | 'web';
   item: 'exam' | 'course';
   item_id: number | string;
   children: React.ReactNode;
   className?: string;
}

const CheckoutItem = ({
   from = 'web',
   item,
   item_id,
   children,
   className,
}: Props) => {
   return (
      <a
         href={payments.index.url({ from, item, id: item_id })}
         className={className}
      >
         {children}
      </a>
   );
};

export default CheckoutItem;
