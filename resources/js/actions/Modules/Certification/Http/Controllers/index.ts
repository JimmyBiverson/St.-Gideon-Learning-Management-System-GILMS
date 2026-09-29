import CertificateTemplateController from './CertificateTemplateController'
import MarksheetTemplateController from './MarksheetTemplateController'
import CertificationController from './CertificationController'
const Controllers = {
    CertificateTemplateController: Object.assign(CertificateTemplateController, CertificateTemplateController),
MarksheetTemplateController: Object.assign(MarksheetTemplateController, MarksheetTemplateController),
CertificationController: Object.assign(CertificationController, CertificationController),
}

export default Controllers