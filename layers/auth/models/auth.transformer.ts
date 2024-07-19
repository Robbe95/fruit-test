import type { RegisterDto } from '@auth/models/register/registerDto.model'
import type { RegisterForm } from '@auth/models/register/registerForm.model'

import type { CurrentUser } from './current-user/currentUser.model'
import type { CurrentUserDto } from './current-user/currentUserDto.model'
import type { ForgotPasswordDto } from './forgot-password/forgotPasswordDto.model'
import type { ForgotPasswordForm } from './forgot-password/forgotPasswordForm.model'
import type { LoginDto } from './login/loginDto.model'
import type { LoginForm } from './login/loginForm.model'
import type { ResetPasswordDto } from './reset-password/resetPasswordDto.model'
import type { ResetPasswordForm } from './reset-password/resetPasswordForm.model'

export class AuthTransformer {
  static toCurrentUser(dto: CurrentUserDto): CurrentUser {
    return {
      id: dto.id,
      email: dto.email,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      phone: dto.phone ?? null,
    }
  }

  static toForgotPasswordDto(form: ForgotPasswordForm): ForgotPasswordDto {
    return {
      email: form.email,
    }
  }

  static toLoginDto(form: LoginForm): LoginDto {
    return {
      password: form.password,
      username: form.email,
    }
  }

  static toRegisterDto(form: RegisterForm): RegisterDto {
    return {
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    }
  }

  static toResetPasswordDto(form: ResetPasswordForm): ResetPasswordDto {
    return {
      email: form.email,
      password: form.password,
      passwordConfirmation: form.password,
      token: form.token,
    }
  }
}
