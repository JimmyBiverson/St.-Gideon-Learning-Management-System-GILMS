import SystemController from './SystemController'
import UpdaterController from './UpdaterController'
import UpdatePackageController from './UpdatePackageController'
import BackupController from './BackupController'
const Controllers = {
    SystemController: Object.assign(SystemController, SystemController),
UpdaterController: Object.assign(UpdaterController, UpdaterController),
UpdatePackageController: Object.assign(UpdatePackageController, UpdatePackageController),
BackupController: Object.assign(BackupController, BackupController),
}

export default Controllers