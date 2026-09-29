import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function collectModuleAssetsPaths(paths, modulesPath) {
  modulesPath = path.join(__dirname, modulesPath);

  const moduleStatusesPath = path.join(__dirname, 'modules_statuses.json');

  try {
    // Read module_statuses.json
    const moduleStatusesContent = await fs.readFile(moduleStatusesPath, 'utf-8');
    const moduleStatuses = JSON.parse(moduleStatusesContent);

    // Read module directories
    const moduleDirectories = await fs.readdir(modulesPath);

    for (const moduleDir of moduleDirectories) {
      if (moduleDir === '.DS_Store') {
        // Skip .DS_Store directory
        continue;
      }

      // Check if the module is enabled (status is true)
      if (moduleStatuses[moduleDir] === true) {
        const viteConfigTs = path.join(modulesPath, moduleDir, 'vite.config.ts');
        const viteConfigJs = path.join(modulesPath, moduleDir, 'vite.config.js');
        let viteConfigPath = null;

        try {
          await fs.access(viteConfigTs);
          viteConfigPath = viteConfigTs;
        } catch {
          try {
            await fs.access(viteConfigJs);
            viteConfigPath = viteConfigJs;
          } catch {
            viteConfigPath = null;
          }
        }

        if (viteConfigPath) {
          try {
            // Convert to a file URL for Windows compatibility
            const moduleConfigURL = pathToFileURL(viteConfigPath);

            // Import the module-specific Vite configuration
            const moduleConfig = await import(moduleConfigURL.href);

            if (moduleConfig.paths && Array.isArray(moduleConfig.paths)) {
              paths.push(...moduleConfig.paths);
            }
          } catch {
            // Module vite config could not be loaded
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading module statuses or module configurations: ${error}`);
  }

  return paths;
}

export default collectModuleAssetsPaths;
