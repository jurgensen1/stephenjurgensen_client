import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { fetchProtectedInfo, onLogout } from '../apis/auth/auth'
// import { Layout } from '../components/layout'
import {
    // updateCaptureState,
    updateReferences,
    getAllReferencesAsync,
    selectStatus,
    selectAllReferences,
    selectReferencesLoading,
    selectReferences,
    updateReferenceToSelected,
    pushReferenceToValues,
    addSuggestion,
    removeSuggestion,
    selectSuggestions,
    clearSuggestions,
    popAllReferences,
    popReferenceFromValues,
    pushToAllReferences,
    sortSuggestions,
    selectReferenceValues,
    sortReferenceSuggestions,
    addReferenceSuggestion,
    clearReferenceSuggestions,
    spliceFromAllReferences
} from '../../redux/slices/noteCardSlice'
// import { unauthenticateUser } from '../redux/slices/authSlice'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import styles from './RefsWithS.module.css';
import { Helmet } from "react-helmet";
// import { getAllReferences } from '../../../apis/cardsAndRefs/cardsAndRefs'
import $ from 'jquery';

function References(props) {
    const dispatch = useDispatch();
    return (
        <div
            className={styles.ReferencesDropdownItem}
            key={"reference-suggestion-" + Number(props.reference.reference_work_id)}
            id={"reference-suggestion-" + Number(props.reference.reference_work_id)}
            // style={
            //     props.reference.selected
            //         ? { display: "none", color: "pink" }
            //         : { display: "block", color: "black" }
            // }
            onClick={() => {
                dispatch(pushReferenceToValues(props.reference))
                dispatch(spliceFromAllReferences(props.reference))
                // console.log(props.allReferences)
                // props.onReferencesChange(props.referencesField)
            }}
        >
            {props.reference.reference_work_title}
        </div>
    );
}

export const ReferencesDropdown = (props) => {
    const dispatch = useDispatch();
    // const [suggestions, setSuggestions] = useState([])
    const [referencesField, setReferencesField] = useState('')
    const [referencesValues, setReferencesValues] = useState([])
    const [allReferencesReact, setAllReferencesReact] = useState([])
    const [referencesWrapperVisablity, setReferencesWrapperVisablity] = useState({
        // display: "none",
        position: 'absolute',
        width: '200px',
        zIndex: 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
    })
    const allReferences = useSelector(selectAllReferences)
    const referenceValues = useSelector(selectReferenceValues)
    const referencesLoading = useSelector(selectReferencesLoading)
    // const suggestions = useSelector(selectSuggestions)

    const onReferencesChange = (e) => {
        setReferencesField(e)
        setReferencesWrapperVisablity({
            display: "inline",
            position: 'absolute',
            backgroundColor: 'white',
        })
        dispatch(clearReferenceSuggestions())
        let referencesDropdownBottom = 0
        let referencesElement = document.getElementById('references')

        referencesElement
            ? referencesDropdownBottom = Math.floor(referencesElement
                .getBoundingClientRect().bottom)
            : referencesDropdownBottom = -200;

        setReferencesWrapperVisablity({ top: referencesDropdownBottom })
        let inputString = e.trim()
        let reLower = new RegExp("^" + inputString.toLowerCase());
        let reUpper = new RegExp("^" + inputString.toUpperCase());

        if (e == '') {
            // setReferencesWrapperVisablity({ display: "none" })
        } else {

            for (let i = 0; i < props.allReferences.length; i++) {
                console.log(props.allReferences[i].reference_work_title)
                console.log(props.allReferences)
                if (
                    reLower.test(
                        props.allReferences[i].reference_work_title)
                        || reUpper.test(props.allReferences[i].reference_work_title)
                ) {
                    console.log((props.allReferences[i]))
                    dispatch(addReferenceSuggestion(props.allReferences[i]))
                }
            }
            dispatch(sortReferenceSuggestions())
        }
    }
    useEffect(() => {
        onReferencesChange(referencesField)
    }, [referenceValues])
    // useEffect(() => {
    //     dispatch(getAllReferencesAsync());

    //     // setAllReferences();
    // }, [updateReferenceToSelected()])
    return referencesLoading ? (
        <p>Loading...</p>
    ) : (
        <div className={styles.formReferencesInput}>
            <label htmlFor='references' className={styles.formLabel}>
                Search References
            </label>
            <div className={styles.selectedReferencesWrapper}>
                {
                    referenceValues && referenceValues.map((reference, i) => {
                        return (
                            <div
                                className={styles.selectedReferencesItem}
                                key={"reference-" + Number(reference.reference_work_id)}

                            >
                                {reference.reference_work_title}
                                <div
                                    className={styles.removeSelectedReferenceButton}
                                    onClick={() => {
                                        // dispatch(updateReferenceToSelected({ i: i, reference: reference }));
                                        dispatch(popReferenceFromValues(reference));
                                        dispatch(pushToAllReferences(reference));
                                        onReferencesChange(referencesField);
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
                    onReferencesChange(e.target.value)
                }}
                type='text'
                value={referencesField}
                className={styles.formControl}
                id='references'
                name='references'
                placeholder='Type your references'
            />
            <div className={styles.ReferencesDropdownWrapper} id={"referencesWrapper"} style={referencesWrapperVisablity}>
                {/* {console.log(props.suggestions)} */}
                {props.referenceSuggestions && props.referenceSuggestions.map((reference, i) => {
                    return (
                        <References
                            reference={reference}
                            i={i}
                            key={"reference-index-" + i}
                            allReferences={allReferences}
                            onReferencesChange={onReferencesChange}
                            referencesField={referencesField}
                        />
                    );
                })}

            </div>
        </div>
    )
}