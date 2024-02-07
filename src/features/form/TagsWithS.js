import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchProtectedInfo, onLogout } from '../apis/auth/auth'
// import { Layout } from '../components/layout'
import {
    // updateCaptureState,
    updateTags,
    getAllTagsAsync,
    selectStatus,
    selectAllTags,
    selectTagsLoading,
    updateTagToSelected,
    pushTagToValues,
    addTagSuggestion,
    removeTagSuggestion,
    selectTagSuggestions,
    clearTagSuggestions,
    spliceFromAllTags,
    popTagFromValues,
    pushToAllTags,
    sortTagSuggestions,
    selectTagValues
} from '../../redux/slices/noteCardSlice'
// import { unauthenticateUser } from '../redux/slices/authSlice'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import styles from './TagsWithS.module.css';
import { Helmet } from "react-helmet";
// import { getAllTags } from '../../../apis/cardsAndRefs/cardsAndRefs'
import $ from 'jquery';

function Tags(props) {
    const dispatch = useDispatch();
    return (
        <div
            className={styles.TagsDropdownItem}
            key={"tag-suggestion-" + Number(props.tag.tag_id)}
            id={"tag-suggestion-" + Number(props.tag.tag_id)}
            style={
                props.tag.selected
                    ? { display: "none", color: "pink" }
                    : { display: "block", color: "black" }
            }
            onClick={() => {
                dispatch(pushTagToValues(props.tag))
                dispatch(spliceFromAllTags(props.tag))
                // console.log(props.allTags)
                // props.onTagsChange(props.tagsField)
            }}
        >
            {props.tag.tag_name}
        </div>
    );
}

export const TagsDropdown = (props) => {
    const dispatch = useDispatch();
    // const [suggestions, setSuggestions] = useState([])
    const [tagsField, setTagsField] = useState('')
    const [tagsValues, setTagsValues] = useState([])
    const [allTagsReact, setAllTagsReact] = useState([])
    const [tagsWrapperVisablity, setTagsWrapperVisablity] = useState({
        // display: "none",
        position: 'absolute',
        width: '200px',
        zIndex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    })
    const allTags = useSelector(selectAllTags)
    const tagValues = useSelector(selectTagValues)
    const tagsLoading = useSelector(selectTagsLoading)
    // const suggestions = useSelector(selectSuggestions)

    const onTagsChange = (e) => {
        setTagsField(e)
        setTagsWrapperVisablity({
            display: "inline",
            position: 'absolute',
            backgroundColor: 'white',
        })
        dispatch(clearTagSuggestions())
        let tagsDropdownBottom = 0
        let tagsElement = document.getElementById('tags')

        tagsElement
            ? tagsDropdownBottom
            = Math.floor(tagsElement.getBoundingClientRect().bottom)
            : tagsDropdownBottom = -200;

        setTagsWrapperVisablity({ top: tagsDropdownBottom })
        let inputString = e.trim()
        let reLower = new RegExp("^" + inputString.toLowerCase());
        let reUpper = new RegExp("^" + inputString.toUpperCase());
        let match = 0;

        if (e == '') {
            // setTagsWrapperVisablity({ display: "none" })
        } else {

            for (let i = 0; i < props.allTags.length; i++) {
                if (
                    reLower.test(props.allTags[i].tag_name)
                    || reUpper.test(props.allTags[i].tag_name)
                ) {
                    console.log((props.allTags[i]))
                    dispatch(addTagSuggestion(props.allTags[i]))
                }
            }
            dispatch(sortTagSuggestions())
        }
    }
    useEffect(() => {
        onTagsChange(tagsField)
    }, [tagValues])
    // useEffect(() => {
    //     dispatch(getAllTagsAsync());

    //     // setAllTags();
    // }, [updateTagToSelected()])
    return tagsLoading ? (
        <p>Loading...</p>
    ) : (
        <div className={styles.formTagsInput}>
            <label htmlFor='tags' className={styles.formLabel}>
                Search Tags
            </label>
            <div className={styles.selectedTagsWrapper}>
                {
                    tagValues && tagValues.map((tag, i) => {
                        return (
                            <div
                                className={styles.selectedTagsItem}
                                key={"tag-" + Number(tag.tag_id)}

                            >
                                {tag.tag_name}
                                <div
                                    className={styles.removeSelectedTagButton}
                                    onClick={() => {
                                        // dispatch(updateTagToSelected({ i: i, tag: tag }));
                                        dispatch(popTagFromValues(tag));
                                        dispatch(pushToAllTags(tag));
                                        onTagsChange(tagsField);
                                    }}
                                >
                                    &nbsp;X
                                </div>

                            </div>
                        );
                    })
                }
            </div>
            <input
                onChange={(e) => {
                    onTagsChange(e.target.value)
                }}
                type='text'
                value={tagsField}
                className={styles.formControl}
                id='tags'
                name='tags'
                placeholder='Type your tags'
            />
            <div className={styles.TagsDropdownWrapper} id={"tagsWrapper"} style={tagsWrapperVisablity}>
                {/* {console.log(props.suggestions)} */}
                {props.tagSuggestions && props.tagSuggestions.map((tag, i) => {
                    return (
                        <Tags
                            tag={tag}
                            i={i}
                            key={"tag-index-" + i}
                            allTags={allTags}
                            onTagsChange={onTagsChange}
                            tagsField={tagsField}
                        />
                    );
                })}

            </div>
        </div>
    )
}