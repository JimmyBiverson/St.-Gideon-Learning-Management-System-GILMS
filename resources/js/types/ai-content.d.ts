type AiGlobalContentFormat = 'html' | 'json' | 'text';
type AiGlobalContent =
   | string
   | Record<string, unknown>
   | Record<string, unknown>[];

interface AiGlobalContentResponse {
   format: AiGlobalContentFormat;
   content: AiGlobalContent;
}
