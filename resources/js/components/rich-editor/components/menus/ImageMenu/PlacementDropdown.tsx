import MenuButton from '../../MenuButton';
import { DropdownMenuItem } from '../../ui/DropdownMenu';

interface PlacementDropdownProps {
   value: string;
   onChange: (value: string) => void;
}

const PlacementDropdown = ({ value, onChange }: PlacementDropdownProps) => {
   const options = [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
   ];

   const currentOption =
      options.find((option) => option.value === value) || options[1]; // Default to center

   return (
      <MenuButton
         type="dropdown"
         buttonStyle={{ width: '6.5rem' }}
         dropdownStyle={{ width: '7rem' }}
         icon="AlignCenter"
         text={currentOption.label}
         hideText={false}
         tooltip={false}
      >
         {options.map((option) => (
            <DropdownMenuItem
               key={option.value}
               data-active={option.value === value || undefined}
               onSelect={() => onChange(option.value)}
            >
               {option.label}
            </DropdownMenuItem>
         ))}
      </MenuButton>
   );
};

export default PlacementDropdown;
