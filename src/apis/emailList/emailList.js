import base from '../base';

export async function onEmailSubscription(registrationData) {
    return await base.post(
        '/email-subscribe',
        registrationData
    )
}
export async function onEmailUnsubscribe(email) {
    return await base.delete(
        '/email-unsubscribe',
        email
    )
}
// export async function onEmailCheck(email) {
//     return await base.get(
//         '/email-unsubscribe',
//         email
//     )
// }
export async function confirmEmail(key) {
    return await base.post(
        `/confirm/${key}`,
    )
}