@component('mail::message')
# Change Password

@component('mail::button', ['url' => config('app.frontend.name') . '/auth/update-password?token='.$token])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
