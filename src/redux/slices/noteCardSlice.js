import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import {
    getAllReferenceWorks,
    getAllTags,
    onSubmitNewReference,
    onSubmitNewTag
} from '../../apis/cardsAndRefs/cardsAndRefs'

// const userAuthFromLocalStorage = () => {
//     const isAuth = localStorage.getItem('isAuth')

//     if (isAuth && JSON.parse(isAuth) === true) {
//         return true
//     }

//     return false
// }

const initialState = {
    // notecard — tags: 
    allTags: [], //all tags from controller
    tagSuggestions: [],
    tagValues: [], //tags to be sent as value
    tagsLoading: true,
    newTagLoading: true,
    
    // notecard — references: 
    allReferences: [], //all tags from controller
    referenceSuggestions: [],
    referenceValues: [], //tags to be sent as value
    referencesLoading: true,
    newReferenceLoading: true,

    notecardTitle: "",
    reference: "",
    noteType: "",
    text: "",
    //tag
    tag: "",
    // author
    firstName: "",
    lastName: "",
    middleName: "",
    yearOfBirth: -1,
    monthOfBirth: -1,
    dayOfBirth: -1,
    yearDied: -1,
    authorTitleDegree: "",
    // reference work
    referenceWorkTitle: "",
    journal: "",
    link: "",
    identifier: "",
    publisher: "",
    placeOfPublication: "",
    website: "",
    accessYear: -1,
    accessMonth: -1,
    accessDate: -1,
    publicationYear: -1,
    publicationMonth: -1,
    publicationDay: -1,
    revisionYear: -1,
    revisionMonth: -1,
    revisionDay: -1,
    workType: "",
    authors: [],
}
export const getAllTagsAsync = createAsyncThunk(
    'notecard/getAllTags',
    async () => {
        // await getAllTags();
        const response = await getAllTags();
        // The value we return becomes the `fulfilled` action payload
        // console.log(response.data)
        return (response.data);
    }
);
export const pushNewTag = createAsyncThunk(
    'notecard/pushNewTag',
    async (tag) => {
        console.log(tag)
        // await getAllTags();
        const response = await onSubmitNewTag({ 'tagName': tag });
        // The value we return becomes the `fulfilled` action payload
        // console.log(response.data)
        return (response.data);
    }
);
export const getAllReferencesAsync = createAsyncThunk(
    'notecard/getAllReferences',
    async () => {
        // await getAllTags();
        const response = await getAllReferenceWorks();
        // The value we return becomes the `fulfilled` action payload
        // console.log(response.data)
        return (response.data);
    }
);
export const pushNewReference = createAsyncThunk(
    'notecard/pushNewReference',
    async ({reference}) => {
        // console.log(tag)
        // await getAllTags();
        const response = await onSubmitNewReference({reference});
        // The value we return becomes the `fulfilled` action payload
        // console.log(response.data)
        return (response.data);
    }
);

export const notecardSlice = createSlice({
    name: 'notecard',
    initialState,
    reducers: {
        updateTags: (state, action) => {
            let tmp = [...state.tagValues]
            tmp.push(action.payload)
            state.tagValues = tmp
        },
        updateTagToSelected: (state, action) => {
            if (state.allTags[action.payload.i].selected) {
                state.allTags[action.payload.i].selected = false;
                state.tagSuggestions[state.suggestions.findIndex(i => i.tag_id === action.payload.tag.tag_id)].selected = false;
            } else {
                state.allTags[action.payload.i].selected = true;
                state.tagSuggestions[action.payload.i].selected = true;
            }
        },
        pushTagToValues: (state, action) => {
            console.log(action.payload)
            console.log(state.tagValues.some(o => o.tag_id === action.payload.tag_id))
            state.tagValues.push(action.payload);
        },
        popTagFromValues: (state, action) => {
            let tmp = [...current(state.tagValues)]
            tmp.splice(tmp.findIndex(o => o.tag_id === action.payload.tag_id), 1);
            state.tagValues = tmp;
        },
        addTagSuggestion: (state, action) => {
            state.tagSuggestions.push(action.payload);
        },
        removeTagSuggestion: (state, action) => {
            state.tagSuggestions.splice(state.tagSuggestions.findIndex(x => x.tag_id === action.payload.tag_id), 1)
        },
        clearTagSuggestions: (state) => {
            state.tagSuggestions = [];
        },
        sortTagSuggestions: (state) => {
            state.tagSuggestions.sort((a, b) => (a.tag_name > b.tag_name) ? 1 : ((b.tag_name > a.tag_name) ? -1 : 0));
        },
        spliceFromAllTags: (state, action) => {
            // console.log(state.allTags.length)
            // console.log(state.allTags)
            // console.log(current(state.allTags))
            let tmp = [...current(state.allTags)]
            // let tmp = []
            // let tmp = [...state.allTags]

            // console.log(tmp)
            // console.log(action.payload)
            // console.log(Number(tmp.findIndex(i => i.tag_id == action.payload.tag_id)))
            // console.log(state.allTags.indexOf(i => i.tag_id == action.payload.tag_id))
            tmp.splice(tmp.findIndex(i => i.tag_id === action.payload.tag_id), 1)
            state.allTags = tmp;
            // console.log("popAllTags:")
            // console.log(state.allTags.some(o => o.tag_id === action.payload.tag_id))
            console.log(state.allTags.length)
        },
        pushToAllTags: (state, action) => {
            let tmp = [...current(state.allTags)]
            tmp.push(action.payload)
            state.allTags = tmp;
            console.log(state.allTags.length)
        },
        // References: 
        updateReferences: (state, action) => {
            let tmp = [...state.referenceValues]
            tmp.push(action.payload)
            state.referenceValues = tmp
        },
        updateReferenceToSelected: (state, action) => {
            if (state.allReferences[action.payload.i].selected) {
                state.allReferences[action.payload.i].selected = false;
                state.referenceSuggestions[state.suggestions.findIndex(i => i.tag_id === action.payload.tag.tag_id)].selected = false;
            } else {
                state.allReferences[action.payload.i].selected = true;
                state.referenceSuggestions[action.payload.i].selected = true;
            }
        },
        pushReferenceToValues: (state, action) => {
            console.log(action.payload)
            console.log(state.referenceValues.some(o => o.reference_work_id === action.payload.reference_work_id))
            state.referenceValues.push(action.payload);
        },
        popReferenceFromValues: (state, action) => {
            let tmp = [...current(state.referenceValues)]
            tmp.splice(tmp.findIndex(o => o.tag_id === action.payload.tag_id), 1);
            state.referenceValues = tmp;
        },
        addReferenceSuggestion: (state, action) => {
            state.referenceSuggestions.push(action.payload);
        },
        removeReferenceSuggestion: (state, action) => {
            state.referenceSuggestions.splice(state.referenceSuggestions.findIndex(x => x.tag_id === action.payload.tag_id), 1)
        },
        clearReferenceSuggestions: (state) => {
            state.referenceSuggestions = [];
        },
        sortReferenceSuggestions: (state) => {
            state.referenceSuggestions.sort((a, b) => (a.tag_name > b.tag_name) ? 1 : ((b.tag_name > a.tag_name) ? -1 : 0));
        },
        spliceFromAllReferences: (state, action) => {
            // console.log(state.allReferences.length)
            // console.log(state.allReferences)
            // console.log(current(state.allReferences))
            let tmp = [...current(state.allReferences)]
            // let tmp = []
            // let tmp = [...state.allReferences]

            // console.log(tmp)
            // console.log(action.payload)
            // console.log(Number(tmp.findIndex(i => i.tag_id == action.payload.tag_id)))
            // console.log(state.allReferences.indexOf(i => i.tag_id == action.payload.tag_id))
            tmp.splice(tmp.findIndex(i => i.tag_id === action.payload.tag_id), 1)
            state.allReferences = tmp;
            // console.log("popAllReferences:")
            // console.log(state.allReferences.some(o => o.tag_id === action.payload.tag_id))
            console.log(state.allReferences.length)
        },
        pushToAllReferences: (state, action) => {
            let tmp = [...current(state.allReferences)]
            tmp.push(action.payload)
            state.allReferences = tmp;
            console.log(state.allReferences.length)
        }

    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getAllTagsAsync.pending, (state) => {
                state.tagsLoading = true;
            })
            .addCase(getAllTagsAsync.fulfilled, (state, action) => {
                state.tagsLoading = false;
                let tmp = action.payload.data.map((tag) => {
                    return (
                        {
                            tag_id: tag.tag_id,
                            tag_name: tag.tag_name,
                        }
                    )
                })
                state.allTags = tmp;
                console.log(state.allTags)
            })
            .addCase(pushNewTag.pending, (state) => {
                state.newTagLoading = true;
            })
            .addCase(pushNewTag.fulfilled, (state, action) => {
                state.newTagLoading = false;
                console.log(action.payload.data)
                state.tagValues.push(action.payload.data);
            })
            .addCase(getAllReferencesAsync.pending, (state) => {
                state.referencesLoading = true;
            })
            .addCase(getAllReferencesAsync.fulfilled, (state, action) => {
                state.referencesLoading = false;
                let tmp = action.payload.data.map((reference) => {
                    return (
                        {
                            reference_work_id: reference.reference_work_id,
                            reference_work_title: reference.reference_work_title,
                            publication_year: reference.publication_year,
                        }
                    )
                })
                state.allReferences = tmp;
                console.log(state.allReferences)
            })
            .addCase(pushNewReference.pending, (state) => {
                state.newReferenceLoading = true;
            })
            .addCase(pushNewReference.fulfilled, (state, action) => {
                state.newReferenceLoading = false;
                console.log(action.payload.data)
                state.referenceValues.push(action.payload.data);
            })
    },
});

export const {
    // tags:
    updateTags,
    updateTagToSelected,
    pushTagToValues,
    addTagSuggestion,
    removeTagSuggestion,
    clearTagSuggestions,
    spliceFromAllTags,
    popTagFromValues,
    pushToAllTags,
    sortTagSuggestions,
    pushToAllReferences,
    popReferenceFromValues,
    sortReferenceSuggestions,
    addReferenceSuggestion,
    clearReferenceSuggestions,
    spliceFromAllReferences,
    pushReferenceToValues
    // references: 
} = notecardSlice.actions;

export const selectAllNoteCardState = (state) => state.notecard;

// notecard — tags: 
export const selectAllTags = (state) => state.notecard.allTags
export const selectTagSuggestions = (state) => state.notecard.tagSuggestions
export const selectTagValues = (state) => state.notecard.tagValues
export const selectTagsLoading = (state) => state.notecard.tagsLoading

// notecard — references
export const selectAllReferences = (state) => state.notecard.allReferences
export const selectReferenceSuggestions = (state) => state.notecard.referenceSuggestions
export const selectReferenceValues = (state) => state.notecard.referenceValues
export const selectReferencesLoading = (state) => state.notecard.referencesLoading

// export const selectStatus = (state) => state.notecard.status
export const selectNotecardTitle = (state) => state.notecard.title
export const selectReference = (state) => state.notecard.reference
export const selectNoteType = (state) => state.notecard.noteType
export const selectText = (state) => state.notecard.text
//tag
export const selectTag = (state) => state.notecard.tag
// author
export const selectFirstName = (state) => state.notecard.firstName
export const selectLastName = (state) => state.notecard.lastName
export const selectMiddleName = (state) => state.notecard.middleName
export const selectYearOfBirth = (state) => state.notecard.yearOfBirth
export const selectMonthOfBirth = (state) => state.notecard.monthOfBirth
export const selectDayOfBirth = (state) => state.notecard.dayOfBirth
export const selectYearDied = (state) => state.notecard.yearDied
export const selectAuthorTitleDegree = (state) => state.notecard.authorTitleDegree
// reference work
export const selectReferenceWorkTitle = (state) => state.notecard.referenceWorkTitle
export const selectJournal = (state) => state.notecard.journal
export const selectLink = (state) => state.notecard.link
export const selectIdentifier = (state) => state.notecard.identifier
export const selectPublisher = (state) => state.notecard.publisher
export const selectPlaceOfPublication = (state) => state.notecard.placeOfPublication
export const selectWebsite = (state) => state.notecard.website
export const selectAccessYear = (state) => state.notecard.accessYear
export const selectAccessMonth = (state) => state.notecard.accessMonth
export const selectAccessDate = (state) => state.notecard.accessDate
export const selectPublicationYear = (state) => state.notecard.publicationYear
export const selectPublicationMonth = (state) => state.notecard.publicationMonth
export const selectPublicationDay = (state) => state.notecard.publicationDay
export const selectRevisionYear = (state) => state.notecard.revisionYear
export const selectRevisionMonth = (state) => state.notecard.revisionMonth
export const selectRevisionDay = (state) => state.notecard.revisionDay
export const selectWorkType = (state) => state.notecard.workType
export const selectAuthors = (state) => state.notecard.authors



export default notecardSlice.reducer;
