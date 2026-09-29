import HomeController from './HomeController'
import SitemapController from './SitemapController'
import JobCircularController from './JobCircularController'
import InstructorController from './InstructorController'
import SubscribeController from './SubscribeController'
import Auth from './Auth'
import UsersController from './UsersController'
import NewsletterController from './NewsletterController'
import SettingController from './SettingController'
import PluginController from './PluginController'
import DashboardController from './DashboardController'
import StudentController from './StudentController'
import NotificationController from './NotificationController'
import ChunkedUploadController from './ChunkedUploadController'
const Controllers = {
    HomeController: Object.assign(HomeController, HomeController),
SitemapController: Object.assign(SitemapController, SitemapController),
JobCircularController: Object.assign(JobCircularController, JobCircularController),
InstructorController: Object.assign(InstructorController, InstructorController),
SubscribeController: Object.assign(SubscribeController, SubscribeController),
Auth: Object.assign(Auth, Auth),
UsersController: Object.assign(UsersController, UsersController),
NewsletterController: Object.assign(NewsletterController, NewsletterController),
SettingController: Object.assign(SettingController, SettingController),
PluginController: Object.assign(PluginController, PluginController),
DashboardController: Object.assign(DashboardController, DashboardController),
StudentController: Object.assign(StudentController, StudentController),
NotificationController: Object.assign(NotificationController, NotificationController),
ChunkedUploadController: Object.assign(ChunkedUploadController, ChunkedUploadController),
}

export default Controllers