import InstallerController from './InstallerController'
import InstallerDBController from './InstallerDBController'
const Controllers = {
    InstallerController: Object.assign(InstallerController, InstallerController),
InstallerDBController: Object.assign(InstallerDBController, InstallerDBController),
}

export default Controllers