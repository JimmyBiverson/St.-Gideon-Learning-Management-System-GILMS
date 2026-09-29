import Api from './Api'
import ProjectController from './ProjectController'
import PageController from './PageController'
import PageTranslationController from './PageTranslationController'
const Controllers = {
    Api: Object.assign(Api, Api),
ProjectController: Object.assign(ProjectController, ProjectController),
PageController: Object.assign(PageController, PageController),
PageTranslationController: Object.assign(PageTranslationController, PageTranslationController),
}

export default Controllers