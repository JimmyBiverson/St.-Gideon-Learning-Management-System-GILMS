import Store from './Store'
import Billing from './Billing'
import Blog from './Blog'
import Certification from './Certification'
import Course from './Course'
import Exam from './Exam'
import Frontend from './Frontend'
import Installer from './Installer'
import Language from './Language'
import Maintenance from './Maintenance'
const Modules = {
    Store: Object.assign(Store, Store),
Billing: Object.assign(Billing, Billing),
Blog: Object.assign(Blog, Blog),
Certification: Object.assign(Certification, Certification),
Course: Object.assign(Course, Course),
Exam: Object.assign(Exam, Exam),
Frontend: Object.assign(Frontend, Frontend),
Installer: Object.assign(Installer, Installer),
Language: Object.assign(Language, Language),
Maintenance: Object.assign(Maintenance, Maintenance),
}

export default Modules