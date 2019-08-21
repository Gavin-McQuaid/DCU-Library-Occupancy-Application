export default function(spec) {
	// Log in page integration tests
	spec.describe('Logging in successfully', function() {
		spec.it('allows login', async function() {
			await spec.fillIn('Login.EmailTextInput', 'test@dcu.ie');
			await spec.fillIn('Login.PasswordTextInput', 'testtest');
			await spec.press('Login.LoginButton');
			await spec.pause(2000);
			await spec.exists('Menu.topBar');
		});
	});

	spec.describe('Logging in unsuccessfully', function() {
		spec.it('doesn\'t allow  invalid login', async function() {
			await spec.fillIn('Login.EmailTextInput', 'test@dcu.ie');
			await spec.fillIn('Login.PasswordTextInput', 'testtest1');
			await spec.press('Login.LoginButton');
			await spec.pause(2000);
			await spec.exists('Login.LoginButton');
		});
	});

	spec.describe('Checks Creation, validation and authentication', function() {
		spec.it('creation, validation and authentication work as expected', async function() {
			await spec.press('Login.CreateAccountButton');
			await spec.pause(2000);	
			// Starts with invalid email
			await spec.fillIn('SignUp.EmailTextInput', 'bob@gmail.com');
			await spec.fillIn('SignUp.PasswordTextInput', 'testtest');
			await spec.fillIn('SignUp.ConfirmPasswordTextInput', 'testtest');
			await spec.press('SignUp.CreateAccountButton');
			await spec.pause(2000);
			await spec.exists('SignUp.CreateAccountButton');
			// Tries taken email
			await spec.fillIn('SignUp.EmailTextInput', 'gavin.mcquaid7@mail.dcu.ie');
			await spec.press('SignUp.CreateAccountButton');
			await spec.pause(2000);
			await spec.exists('SignUp.CreateAccountButton');
			// Password of invalid length; Passwords must be at least eight characters long
			await spec.fillIn('SignUp.PasswordTextInput', 'testtes');
			await spec.fillIn('SignUp.ConfirmPasswordTextInput', 'testtes');
			await spec.press('SignUp.CreateAccountButton');
			await spec.pause(2000);
			await spec.exists('SignUp.CreateAccountButton');
			// Passwords don't match
			await spec.fillIn('SignUp.PasswordTextInput', 'testtest');
			await spec.fillIn('SignUp.ConfirmPasswordTextInput', 'testtes');
			await spec.press('SignUp.CreateAccountButton');
			await spec.pause(2000);
			await spec.exists('SignUp.CreateAccountButton');
			// Successful creation of account
			await spec.fillIn('SignUp.EmailTextInput', 'tests1@mail.dcu.ie');
			await spec.fillIn('SignUp.PasswordTextInput', 'testtest');
			await spec.fillIn('SignUp.ConfirmPasswordTextInput', 'testtest');
			await spec.press('SignUp.CreateAccountButton');
			await spec.pause(2000);
			await spec.exists('Login.LoginButton');
			// Login to unauthenticated account
			await spec.fillIn('Login.EmailTextInput', 'tests1@mail.dcu.ie');
			await spec.fillIn('Login.PasswordTextInput', 'testtest');
			await spec.press('Login.LoginButton');
			await spec.pause(2000);
			await spec.notExists('Menu.topBar');
			// Authenticate with wrong code
			await spec.fillIn('AuthenticateAccount.code', '123456');
			await spec.press('AuthenticateAccount.codeButton');
			await spec.pause(2000);
			await spec.notExists('Menu.topBar');
			await spec.press('AuthenticateAccount.newcodeButton');
			await spec.fillIn('AuthenticateAccount.code', '000000');
			await spec.press('AuthenticateAccount.codeButton');
			await spec.pause(2000);
			await spec.exists('Menu.topBar');
		});
	});

	spec.describe('Reset password functionality', function() {
		spec.it('reset password functionality works', async function() {
			await spec.press('Login.ResetPasswordButton');
			await spec.pause(2000);	
			// Try invalid email
			await spec.fillIn('ResetPasswordRequest.EmailTextInput', 'bob@gmail.com');
			await spec.press('ResetPasswordRequest.ResetButton');
			await spec.pause(2000);
			await spec.exists('ResetPasswordRequest.ResetButton');
			// Try valid email
			await spec.fillIn('ResetPasswordRequest.EmailTextInput', 'tests1@mail.dcu.ie');
			await spec.press('ResetPasswordRequest.ResetButton');
			await spec.pause(2000);
			await spec.exists('ConfirmCode.Button');
			// Try invalid code
			await spec.fillIn('ConfirmCode.TextInput', '123456');
			await spec.press('ConfirmCode.Button');
			await spec.pause(2000);
			await spec.exists('ConfirmCode.Button');
			// Try valid code
			await spec.fillIn('ConfirmCode.TextInput', '000000');
			await spec.press('ConfirmCode.Button');
			await spec.pause(2000);
			await spec.exists('ResetPassword.ResetButton');
			// Password of wrong length
			await spec.fillIn('ResetPassword.PasswordTextInput', 'testtes');
			await spec.fillIn('ResetPassword.ConfirmPasswordTextInput', 'testtes');
			await spec.press('ResetPassword.ResetButton');
			await spec.pause(2000);
			await spec.exists('ResetPassword.ResetButton');
			// Passwords don't match
			await spec.fillIn('ResetPassword.PasswordTextInput', 'testtest1');
			await spec.fillIn('ResetPassword.ConfirmPasswordTextInput', 'testtest');
			await spec.press('ResetPassword.ResetButton');
			await spec.pause(2000);
			await spec.exists('ResetPassword.ResetButton');
			// Valid new password
			await spec.fillIn('ResetPassword.PasswordTextInput', 'testtest1');
			await spec.fillIn('ResetPassword.ConfirmPasswordTextInput', 'testtest1');
			await spec.press('ResetPassword.ResetButton');
			await spec.pause(2000);
			await spec.exists('Login.LoginButton');
			// Try old login
			await spec.fillIn('Login.EmailTextInput', 'tests1@mail.dcu.ie');
			await spec.fillIn('Login.PasswordTextInput', 'testtest');
			await spec.press('Login.LoginButton');
			await spec.pause(2000);
			await spec.notExists('Menu.topBar');
			// Try new login
			await spec.fillIn('Login.EmailTextInput', 'tests1@mail.dcu.ie');
			await spec.fillIn('Login.PasswordTextInput', 'testtest1');
			await spec.press('Login.LoginButton');
			await spec.pause(2000);
			await spec.exists('Menu.topBar');
		});
	});


	




	
	

	

}
