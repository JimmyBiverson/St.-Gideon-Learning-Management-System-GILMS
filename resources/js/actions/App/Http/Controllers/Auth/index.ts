import PasswordResetLinkController from './PasswordResetLinkController'
import NewPasswordController from './NewPasswordController'
import AuthenticatedSessionController from './AuthenticatedSessionController'
import RegisteredUserController from './RegisteredUserController'
import GoogleAuthController from './GoogleAuthController'
import EmailVerificationPromptController from './EmailVerificationPromptController'
import VerifyEmailController from './VerifyEmailController'
import EmailVerificationNotificationController from './EmailVerificationNotificationController'
import ConfirmablePasswordController from './ConfirmablePasswordController'
const Auth = {
    PasswordResetLinkController: Object.assign(PasswordResetLinkController, PasswordResetLinkController),
NewPasswordController: Object.assign(NewPasswordController, NewPasswordController),
AuthenticatedSessionController: Object.assign(AuthenticatedSessionController, AuthenticatedSessionController),
RegisteredUserController: Object.assign(RegisteredUserController, RegisteredUserController),
GoogleAuthController: Object.assign(GoogleAuthController, GoogleAuthController),
EmailVerificationPromptController: Object.assign(EmailVerificationPromptController, EmailVerificationPromptController),
VerifyEmailController: Object.assign(VerifyEmailController, VerifyEmailController),
EmailVerificationNotificationController: Object.assign(EmailVerificationNotificationController, EmailVerificationNotificationController),
ConfirmablePasswordController: Object.assign(ConfirmablePasswordController, ConfirmablePasswordController),
}

export default Auth