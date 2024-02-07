import base from '../base';

export async function onSubmitNewCard(notecardData) {
    return await base.post(
        '/new-card',
        notecardData
    )
}
export async function onSubmitNewReference(referenceData) {
    return await base.post(
        '/new-reference-work',
        referenceData
    )
}
export async function onSubmitNewAuthor(authorData) {
    return await base.post(
        '/new-author',
        authorData
    )
}
export async function onSubmitNewTag(tagData) {
    return await base.post(
        '/new-tag',
        tagData
    )
}

export async function getAllAuthors() {
    return await base.get(
        '/all-authors',
    )
}
export async function getAllTags() {
    return await base.get(
        '/all-tags',
    )
}
export async function getAllReferenceWorks() {
    return await base.get(
        '/all-reference-works',
    )
}