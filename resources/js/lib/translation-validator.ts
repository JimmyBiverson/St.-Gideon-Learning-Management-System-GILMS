export interface ValidationResult {
   valid: boolean;
   errors: string[];
   warnings: string[];
}

export interface PlaceholderCheck {
   key: string;
   original: string[];
   modified: string[];
   missing: string[];
   added: string[];
}

export interface DiffResult {
   changed: string[];
   unchanged: string[];
   errors: string[];
}

/**
 * Detect placeholders in a string
 * Supports Laravel style (:name), curly brace style ({name}), and printf style (%s, %d, %1$s)
 */
export function detectPlaceholders(text: string): string[] {
   if (typeof text !== 'string') {
      return [];
   }

   const placeholders: string[] = [];

   // Laravel style: :name, :email, :count
   const laravelMatches = text.match(/:\w+/g);

   if (laravelMatches) {
      placeholders.push(...laravelMatches);
   }

   // Curly brace style: {name}, {email}, {count}
   const curlyMatches = text.match(/\{\w+\}/g);

   if (curlyMatches) {
      placeholders.push(...curlyMatches);
   }

   // Printf style: %s, %d, %1$s, %2$d
   const printfMatches = text.match(/%(?:\d+\$)?[sdfFgGeEoxXcb]/g);

   if (printfMatches) {
      placeholders.push(...printfMatches);
   }

   return [...new Set(placeholders)];
}

/**
 * Validate that keys in modified object match original object
 */
export function validateKeys(
   original: Record<string, any>,
   modified: Record<string, any>,
): ValidationResult {
   const errors: string[] = [];
   const warnings: string[] = [];

   const originalKeys = Object.keys(original).sort();
   const modifiedKeys = Object.keys(modified).sort();

   // Check for added keys
   const addedKeys = modifiedKeys.filter((key) => !originalKeys.includes(key));

   if (addedKeys.length > 0) {
      errors.push(`Added keys are not allowed: ${addedKeys.join(', ')}`);
   }

   // Check for removed keys
   const removedKeys = originalKeys.filter(
      (key) => !modifiedKeys.includes(key),
   );

   if (removedKeys.length > 0) {
      errors.push(`Removed keys are not allowed: ${removedKeys.join(', ')}`);
   }

   return {
      valid: errors.length === 0,
      errors,
      warnings,
   };
}

/**
 * Validate that placeholders are preserved in modified values
 */
export function validatePlaceholders(
   original: Record<string, any>,
   modified: Record<string, any>,
): ValidationResult {
   const errors: string[] = [];
   const warnings: string[] = [];
   const placeholderChecks: PlaceholderCheck[] = [];

   for (const key of Object.keys(original)) {
      if (
         typeof original[key] === 'string' &&
         typeof modified[key] === 'string'
      ) {
         const originalPlaceholders = detectPlaceholders(original[key]);
         const modifiedPlaceholders = detectPlaceholders(modified[key]);

         if (originalPlaceholders.length > 0) {
            const missing = originalPlaceholders.filter(
               (p) => !modifiedPlaceholders.includes(p),
            );
            const added = modifiedPlaceholders.filter(
               (p) => !originalPlaceholders.includes(p),
            );

            if (missing.length > 0 || added.length > 0) {
               placeholderChecks.push({
                  key,
                  original: originalPlaceholders,
                  modified: modifiedPlaceholders,
                  missing,
                  added,
               });

               if (missing.length > 0) {
                  warnings.push(
                     `Key "${key}": Missing placeholders: ${missing.join(', ')}`,
                  );
               }

               if (added.length > 0) {
                  warnings.push(
                     `Key "${key}": Added placeholders: ${added.join(', ')}`,
                  );
               }
            }
         }
      }
   }

   return {
      valid: true,
      errors,
      warnings,
   };
}

/**
 * Validate that data types match between original and modified
 */
export function validateDataTypes(
   original: Record<string, any>,
   modified: Record<string, any>,
): ValidationResult {
   const errors: string[] = [];
   const warnings: string[] = [];

   for (const key of Object.keys(original)) {
      if (modified[key] !== undefined) {
         const originalType = typeof original[key];
         const modifiedType = typeof modified[key];

         if (originalType !== modifiedType) {
            errors.push(
               `Key "${key}": Type mismatch (expected ${originalType}, got ${modifiedType})`,
            );
         }
      }
   }

   return {
      valid: errors.length === 0,
      errors,
      warnings,
   };
}

/**
 * Get diff between original and modified objects
 */
export function getDiff(
   original: Record<string, any>,
   modified: Record<string, any>,
): DiffResult {
   const changed: string[] = [];
   const unchanged: string[] = [];
   const errors: string[] = [];

   for (const key of Object.keys(original)) {
      if (modified[key] === undefined) {
         errors.push(key);
      } else if (original[key] !== modified[key]) {
         changed.push(key);
      } else {
         unchanged.push(key);
      }
   }

   return {
      changed,
      unchanged,
      errors,
   };
}

/**
 * Comprehensive validation of translation JSON
 */
export function validateTranslationJson(
   original: Record<string, any>,
   modified: Record<string, any>,
): ValidationResult {
   const allErrors: string[] = [];
   const allWarnings: string[] = [];

   // Validate keys
   const keyValidation = validateKeys(original, modified);
   allErrors.push(...keyValidation.errors);
   allWarnings.push(...keyValidation.warnings);

   if (!keyValidation.valid) {
      return {
         valid: false,
         errors: allErrors,
         warnings: allWarnings,
      };
   }

   // Validate data types
   const typeValidation = validateDataTypes(original, modified);
   allErrors.push(...typeValidation.errors);
   allWarnings.push(...typeValidation.warnings);

   // Validate placeholders
   const placeholderValidation = validatePlaceholders(original, modified);
   allWarnings.push(...placeholderValidation.warnings);

   return {
      valid: allErrors.length === 0,
      errors: allErrors,
      warnings: allWarnings,
   };
}

/**
 * Format JSON with proper indentation
 */
export function formatJson(json: string): string {
   try {
      const parsed = JSON.parse(json);

      return JSON.stringify(parsed, null, 2);
   } catch {
      return json;
   }
}

/**
 * Check if string is valid JSON
 */
export function isValidJson(json: string): boolean {
   try {
      JSON.parse(json);

      return true;
   } catch {
      return false;
   }
}
