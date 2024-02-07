import base from '../base';

export async function onRegistration(registrationData) {
    return await base.post(
        '/register',
        registrationData
    )
}
export async function onLogin(loginData) {
    return await base.post(
        '/login',
        loginData
    )
}

export async function onLogout() {
    return await base.get(
        '/logout'
    )
}

export async function fetchProtectedInfo() {
    return await base.get(
        '/protected'
    )
}