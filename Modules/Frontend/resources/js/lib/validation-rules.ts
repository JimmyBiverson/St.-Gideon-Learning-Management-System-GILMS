/**
 * Validation rules for drag-and-drop operations
 * Prevents invalid element placements
 */

/**
 * Define element type categories
 */
export const CONTAINER_TYPES: EditorBtns[] = [
   // Layout Containers
   'container',
   'section',
   '__body',
   '2Col',
   '3Col',
   // Semantic Containers
   'form',
   'article',
   'nav',
   'header',
   'footer',
   'aside',
   'div',
   // Text Elements (can contain other elements)
   'heading',
   'paragraph',
   'span',
   'link',
   'button',
   'label',
   // List
   'ul',
   'li',
   // Dropdown Menu Components
   'dropdownMenu',
   'dropdownMenuContent',
   'dropdownMenuTrigger',
   // Popover Components
   'popover',
   'popoverContent',
   'popoverTrigger',
   // Drawer Components
   'drawer',
   'drawerContent',
   'drawerTrigger',
   // Accordion Components
   'accordion',
   'accordionItem',
   'accordionContent',
   'accordionTrigger',
   // Tabs Components
   'tabs',
   'tabsList',
   'tabsContent',
   'tabsTrigger',
];

export const LEAF_TYPES: EditorBtns[] = [
   // Media Elements (cannot contain children)
   'image',
   'video',
   'iframe',
   'icon',
   // Form Input Elements (cannot contain children)
   'input',
   'textarea',
   'select',
   'checkbox',
   'radio',
   // Dropdown Menu Items (leaf elements)
   'dropdownMenuItem',
   'dropdownMenuLabel',
   // Other
   'hr',
   'customCode',
];

/**
 * Check if an element type can contain children
 */
export function isContainerType(type: EditorBtns | null): boolean {
   if (!type) {
      return false;
   }

   return CONTAINER_TYPES.includes(type);
}

/**
 * Check if an element type is a leaf (cannot contain children)
 */
export function isLeafType(type: EditorBtns | null): boolean {
   if (!type) {
      return false;
   }

   return LEAF_TYPES.includes(type);
}

/**
 * Check if sourceType can be dropped into targetType
 */
export function canDropIntoContainer(
   sourceType: EditorBtns | null,
   targetType: EditorBtns | null,
): boolean {
   if (!sourceType || !targetType) {
      return false;
   }

   // Target must be a container type
   if (!isContainerType(targetType)) {
      return false;
   }

   // Dropdown menu items can only be placed in dropdown menu content
   if (
      sourceType === 'dropdownMenuItem' ||
      sourceType === 'dropdownMenuLabel'
   ) {
      return targetType === 'dropdownMenuContent';
   }

   // Sections can only be dropped into __body
   if (sourceType === 'section') {
      return targetType === '__body';
   }

   // 2Col and 3Col layouts can only be dropped into sections or __body
   if (sourceType === '2Col' || sourceType === '3Col') {
      return targetType === 'section' || targetType === '__body';
   }

   // Containers can be dropped into sections, layouts, or __body
   if (sourceType === 'container') {
      return ['section', '__body', '2Col', '3Col'].includes(targetType);
   }

   // Leaf elements can be dropped into any container
   if (isLeafType(sourceType)) {
      return isContainerType(targetType);
   }

   // Default: allow
   return true;
}

/**
 * Get allowed parent types for a given element type
 */
export function getAllowedParents(
   elementType: EditorBtns | null,
): EditorBtns[] {
   if (!elementType) {
      return [];
   }

   switch (elementType) {
      case 'section':
         return ['__body'];
      case '2Col':
      case '3Col':
         return ['section', '__body'];
      case 'container':
      case 'article':
      case 'nav':
      case 'header':
      case 'footer':
      case 'aside':
      case 'div':
      case 'form':
         return [
            'section',
            '__body',
            '2Col',
            '3Col',
            'container',
            'article',
            'nav',
            'header',
            'footer',
            'aside',
            'div',
            'form',
         ];
      // All leaf elements can be placed in any container
      default:
         if (isLeafType(elementType)) {
            return CONTAINER_TYPES;
         }

         return [];
   }
}

/**
 * Check if an element can be moved (some elements might be locked)
 */
export function canMoveElement(element: EditorElement): boolean {
   // __body cannot be moved
   if (element.type === '__body') {
      return false;
   }

   // Add more rules here as needed
   // For example: locked elements, special elements, etc.

   return true;
}

/**
 * Validate a move operation before executing
 */
export function validateMove(
   sourceElement: EditorElement,
   targetContainerId: string,
   targetContainer: EditorElement | null,
   allElements: EditorElement[],
): { valid: boolean; reason?: string } {
   // Check if source can be moved
   if (!canMoveElement(sourceElement)) {
      return {
         valid: false,
         reason: `${sourceElement.name} cannot be moved`,
      };
   }

   // Check if target exists
   if (!targetContainer) {
      return {
         valid: false,
         reason: 'Target container not found',
      };
   }

   // Check if trying to move into itself
   if (sourceElement.id === targetContainerId) {
      return {
         valid: false,
         reason: 'Cannot move element into itself',
      };
   }

   // Check if target type can accept source type
   if (!canDropIntoContainer(sourceElement.type, targetContainer.type)) {
      return {
         valid: false,
         reason: `${sourceElement.name} cannot be placed inside ${targetContainer.name}`,
      };
   }

   // Check for circular reference (moving parent into child)
   if (isDescendant(sourceElement, targetContainerId)) {
      return {
         valid: false,
         reason: 'Cannot move parent into its own child',
      };
   }

   return { valid: true };
}

/**
 * Helper: Check if targetId is a descendant of element
 */
function isDescendant(element: EditorElement, targetId: string): boolean {
   if (!Array.isArray(element.content)) {
      return false;
   }

   const content = element.content as EditorElement[];

   for (const child of content) {
      if (child.id === targetId) {
         return true;
      }

      if (isDescendant(child, targetId)) {
         return true;
      }
   }

   return false;
}

/**
 * Get maximum nesting depth for an element type
 */
export function getMaxNestingDepth(elementType: EditorBtns | null): number {
   if (!elementType) {
      return 0;
   }

   switch (elementType) {
      case '__body':
         return Infinity; // Root level
      case 'section':
         return 10; // Sections can be deeply nested (though unusual)
      case 'container':
      case '2Col':
      case '3Col':
         return 5; // Reasonable depth for containers
      default:
         return 3; // Leaf elements shouldn't be deeply nested
   }
}

/**
 * Check if adding an element would exceed nesting depth limits
 */
export function validateNestingDepth(
   elementType: EditorBtns | null,
   currentDepth: number,
): { valid: boolean; reason?: string } {
   if (!elementType) {
      return { valid: false, reason: 'Invalid element type' };
   }

   const maxDepth = getMaxNestingDepth(elementType);

   if (currentDepth >= maxDepth) {
      return {
         valid: false,
         reason: `Maximum nesting depth (${maxDepth}) exceeded`,
      };
   }

   return { valid: true };
}

/**
 * Get user-friendly error message for validation failure
 */
export function getValidationErrorMessage(
   sourceElement: EditorElement,
   targetContainer: EditorElement | null,
): string {
   if (!targetContainer) {
      return 'Invalid drop target';
   }

   if (sourceElement.id === targetContainer.id) {
      return 'Cannot drop an element onto itself';
   }

   if (!canDropIntoContainer(sourceElement.type, targetContainer.type)) {
      const sourceLabel = sourceElement.name || 'Element';
      const targetLabel = targetContainer.name || 'container';

      return `${sourceLabel} cannot be placed inside ${targetLabel}`;
   }

   return 'Invalid drop operation';
}
