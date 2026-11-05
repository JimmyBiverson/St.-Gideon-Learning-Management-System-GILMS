import { usePage } from '@inertiajs/react';

export default function useAcademicTerminology() {
   const { academicTerminology } = usePage<SharedData>().props;
   const labels = academicTerminology ?? {
      singular: 'Subject',
      plural: 'Subjects',
   };

   const text = (copy: string) =>
      copy.replace(/\b(subjects?|courses?)\b/gi, (word) => {
         const label = word.toLowerCase().endsWith('s')
            ? labels.plural
            : labels.singular;
         if (word === word.toUpperCase()) return label.toUpperCase();
         return word === word.toLowerCase() ? label.toLowerCase() : label;
      });

   return { ...labels, text };
}
