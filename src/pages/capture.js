import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../apis/auth/auth'
import { Layout } from '../components/layout'
import {
    // updateCaptureState,
    updateTags,
    getAllTagsAsync,
    getAllReferencesAsync,
    selectStatus,
    selectAllTags,
    selectTagsLoading,
    selectTagValues,
    updateTagToSelected,
    pushTagToValues,
    selectTagSuggestions,
    pushNewTag,
    selectReferenceSuggestions,
    selectAllReferences,
    selectReferenceValues
} from '../redux/slices/noteCardSlice'
import { unauthenticateUser } from '../redux/slices/authSlice'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import styles from './pages.module.css'
import { Helmet } from "react-helmet";
import { getAllReferenceWorks, getAllTags, onSubmitNewCard } from '../apis/cardsAndRefs/cardsAndRefs'
import $ from 'jquery';
import { TagsDropdown } from '../features/form/TagsWithS'
import { ReferencesDropdown } from '../features/form/RefsWithS'


const Capture = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null)
    const tagSuggestions = useSelector(selectTagSuggestions)
    const referenceSuggestions = useSelector(selectReferenceSuggestions)
    const allTags = useSelector(selectAllTags)
    const allReferences = useSelector(selectAllReferences)
    const tagValues = useSelector(selectTagValues)
    const referenceValues = useSelector(selectReferenceValues)

    const logout = async () => {
        try {
            await onLogout();

            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth');
        } catch (error) {
            //   console.log(error.response)
        }
    }

    const protectedInfo = async () => {
        try {
            const { data } = await fetchProtectedInfo();

            setProtectedData(data.info);

            setLoading(false);
        } catch (error) {
            logout();
        }
    }
    // const setAllTags = async () => {
    //     try {
    //         const { data } = await getAllTags();
    //         console.log(data.data)
    //         dispatch(updateAllTags(data.data));

    //         // setLoading(false);
    //     } catch (error) {
    //         // logout();
    //     }
    // }

    useEffect(() => {
        protectedInfo();
        dispatch(getAllTagsAsync());
        dispatch(getAllReferencesAsync());

        // setAllTags();
    }, [])

    const [values, setValues] = useState({
        title: '',
        reference: '',
        noteType: '',
        tags: '',
        cardText: '',
        newTag: '',
    });
    const [refValues, setRefValues] = useState({
        title: '',
        type: '',
        year: '',
        journal: '',
        link: '',
        identifier: '',
        publisher: '',
        placeOfPublication: '',
        website: '',
        accessDate: '',
        publicationDate: '',
        revisionDate: '',
    });

    const [error1, setError1] = useState(false);
    const [newTagError, setNewTagError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [recaptcha, setRecaptcha] = useState(false);
    const [newTagValue, setNewTagValue] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await getAllTags.get("/");
    //             console.log(response);
    //             // console.log(response.data.data.restaurants);
    //             // setRestaurants(response.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    //     setAllTags();
    // }, []);

    function onReCAPTCHA(value) {
        // console.log("Captcha value:", value);
        setRecaptcha(true);
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onNewTagChange = (e) => {
        setNewTagValue(e.target.value);
    }
    const onRefChange = (e) => {
        setRefValues({ ...refValues, [e.target.name]: e.target.value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        let tagIDs = []
        let referenceIDs = []
        for (let i = 0; i < tagValues.length; i++) {
            tagIDs.push(Number(tagValues[i].tag_id));
        }
        for (let i = 0; i < referenceValues.length; i++) {
            referenceIDs.push(Number(referenceValues[i].reference_work_id));
        }
        try {
            const { data } = await onSubmitNewCard({
                "notecardTitle": values.title,
                "references": referenceIDs,
                "noteType": values.noteType,
                "tags": tagIDs,
                "text": values.cardText
            })
            // const response = await onRegistration(values)
            // console.log(response);
            setError1('')
            // setError2('')
            setSuccess(data.message)
            // setValues({ email: '', password: '' })
            setTimeout(() => {
                setSuccess(false)
            }, "5000");

        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.errors[0].msg);
            // if (error.response.data.errors[0].msg) {
            //     setError1(error.response.data.errors[0].msg)
            //     setTimeout(() => {
            //         setError1(false)
            //     }, "5000");
            // }
            // // // if (error.response.data.errors[1].msg !== undefined) {
            // //     setError1(error.response.data.errors[0].msg)
            // // // }
            // setSuccess('')
        }
    }
    const onSubmitRef = async (e) => {
        e.preventDefault()

        try {
            // const { data } = await onRegistration(values)
            // // const response = await onRegistration(values)
            // // console.log(response);
            // setError1('')
            // setError2('')
            // setSuccess(data.message)
            // setValues({ email: '', password: '' })
            // setTimeout(() => {
            //     setSuccess(false)
            // }, "5000");

        } catch (error) {
            // console.log(error);
            // console.log(error.response.data.errors[0].msg);
            // if (error.response.data.errors[0].msg) {
            //     setError1(error.response.data.errors[0].msg)
            //     setTimeout(() => {
            //         setError1(false)
            //     }, "5000");
            // }
            // // // if (error.response.data.errors[1].msg !== undefined) {
            // //     setError1(error.response.data.errors[0].msg)
            // // // }
            // setSuccess('')
        }

    }

    return loading ? (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <div>
            <Layout>
                <div className={styles.page}>
                    <h1>Capture</h1>
                    <p>{protectedData}</p>

                    <button onClick={() => logout()} className={styles.submitBtn}>
                        Logout
                    </button>
                    <form onSubmit={(e) => onSubmit(e)} id='register' className={styles.form}>
                        <div className={styles.formInput}>
                            <label htmlFor='title' className={styles.formLabel}>
                                Title
                            </label>
                            <input
                                onChange={(e) => onChange(e)}
                                type='text'
                                className={styles.formControl}
                                id='title'
                                name='title'
                                value={values.title}
                                placeholder='Type your title'
                                required
                            />
                        </div>
                        {/* <div className={styles.formInput}>
                            <label htmlFor='reference' className={styles.formLabel}>
                                Add Reference
                            </label>
                            <input
                                onChange={(e) => onChange(e)}
                                type='text'
                                value={values.source}
                                className={styles.formControl}
                                id='reference'
                                name='reference'
                                placeholder='Type your source'
                            />
                        </div> */}
                        <ReferencesDropdown
                            allReferences={allReferences}
                            referenceSuggestions={referenceSuggestions}
                        />
                        <div className={styles.formInput}>
                            <label htmlFor='newTag' className={styles.formLabel}>
                                Add a New Tag
                            </label>
                            <div className={styles.newTag}>
                                <input
                                    onChange={(e) => onNewTagChange(e)}
                                    type='text'
                                    value={newTagValue}
                                    className={styles.formControl}
                                    id='newTag'
                                    name='newTag'
                                    placeholder='Type your new tag'
                                />
                                <button
                                    className={styles.newTagBtn}
                                    type='button'
                                    onClick={() => {
                                        dispatch(pushNewTag(newTagValue.toLowerCase()))
                                        setNewTagValue('')
                                    }}
                                >
                                    +
                                </button>
                                {/* <p>{newTagError}</p> */}
                            </div>
                        </div>
                        <TagsDropdown
                            allTags={allTags}
                            tagSuggestions={tagSuggestions}
                        />

                        <div className={styles.formInput}>
                            <label htmlFor='type' className={styles.formLabel}>
                                Note Type
                            </label>
                            <select
                                onChange={(e) => onChange(e)}
                                // type='text'
                                value={values.noteType}
                                className={styles.formControl}
                                id='noteType'
                                name='noteType'
                                // placeholder='Type your source'
                                required
                            >
                                <option value="">Choose an option</option>
                                <option value="idea">Idea</option>
                                <option value="quote">Quote</option>
                                <option value="question">Question</option>
                            </select>
                        </div>
                        <div className={styles.formText}>
                            <label htmlFor='type' className={styles.formLabel}>
                                Text*
                            </label>
                            <textarea
                                onChange={(e) => onChange(e)}
                                // type='select'
                                value={values.cardText}
                                className={styles.formTextArea}
                                id='cardText'
                                name='cardText'
                                rows='1'
                                cols='79'
                                required
                            >
                            </textarea>
                        </div>
                        <div className={styles.formSubmit}>

                            <button type='submit'
                                className={styles.submitBtn}
                            // disabled={!recaptcha}
                            // onClick={onSubmit1()}
                            >
                                Submit
                            </button>
                        </div>
                        {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                        {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                        {/* {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''} */}
                    </form>
                    <h2>Add a New Reference Work</h2>
                    <form onSubmit={(e) => onSubmitRef(e)} id='new-source' className={styles.form}>
                        <div className={styles.formInput}>
                            <label htmlFor='title' className={styles.formLabel}>
                                Title*
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                className={styles.formControl}
                                id='title'
                                name='title'
                                value={refValues.title}
                                placeholder='Type the title'
                                required
                            />
                        </div>

                        <div className={styles.formInput}>
                            <label htmlFor='reference' className={styles.formLabel}>
                                Author
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.reference}
                                className={styles.formControl}
                                id='author'
                                name='author'
                                placeholder='Type the author'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='year' className={styles.formLabel}>
                                Year
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.year}
                                className={styles.formControl}
                                id='year'
                                name='year'
                                placeholder='Type the year'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Journal
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.journal}
                                className={styles.formControl}
                                id='journal'
                                name='journal'
                                placeholder='Type the journal'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Link
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.link}
                                className={styles.formControl}
                                id='link'
                                name='link'
                                placeholder='Type the link'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Identifier (ISBN or DOI)
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.identifier}
                                className={styles.formControl}
                                id='identifier'
                                name='identifier'
                                placeholder='Type the identifier'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Publisher
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.publisher}
                                className={styles.formControl}
                                id='publisher'
                                name='publisher'
                                placeholder='Type the publisher'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Place of Publication
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.placeOfPublication}
                                className={styles.formControl}
                                id='place_of_publication'
                                name='placeOfPublication'
                                placeholder='Type the place of publication'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Website URL
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.website}
                                className={styles.formControl}
                                id='website'
                                name='website'
                                placeholder='Type the website url'
                            />
                        </div>

                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Publication Date
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.publicationDate}
                                className={styles.formControl}
                                id='publication_date'
                                name='publicationDate'
                                placeholder='Type the publication date'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Access Date (if publication date not avalilable)
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.accessDate}
                                className={styles.formControl}
                                id='access_date'
                                name='accessDate'
                                placeholder='Type the access date'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='tags' className={styles.formLabel}>
                                Revision Date
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.revisionDate}
                                className={styles.formControl}
                                id='revision_date'
                                name='revisionDate'
                                placeholder='Type the revision date'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='type' className={styles.formLabel}>
                                Work Type
                            </label>
                            <select
                                onChange={(e) => onRefChange(e)}
                                // type=''
                                value={refValues.type}
                                className={styles.formControl}
                                id='type'
                                name='type'
                                // placeholder='Type your source'
                                required
                            >
                                <option value="book">Book</option>
                                <option value="article">Article</option>
                                <option value="website">Website</option>
                                <option value="journal">Journal</option>
                                <option value="other">other</option>
                            </select>
                        </div>

                        <div className={styles.formSubmit}>

                            <button type='submit'
                                className={styles.submitBtn}
                                disabled={!recaptcha}
                            >
                                Submit
                            </button>
                        </div>
                        {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                        {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                        {/* {error2 ? <div style={{ color: 'red', margin: '10px 0' }}>{error2}</div> : ''} */}
                    </form>
                    <h2>Add a New Author</h2>
                    <form onSubmit={(e) => onSubmitRef(e)} id='new-author' className={styles.form}>
                        <div className={styles.formInput}>
                            <label htmlFor='frist_name' className={styles.formLabel}>
                                Frist Name*
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                className={styles.formControl}
                                id='frist_name'
                                name='frist_name'
                                value={refValues.title}
                                placeholder='Type their frist name'
                                required
                            />
                        </div>

                        <div className={styles.formInput}>
                            <label htmlFor='last_name' className={styles.formLabel}>
                                Last Name*
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.reference}
                                className={styles.formControl}
                                id='last_name'
                                name='last_name'
                                placeholder='Type their last name'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='middle_name' className={styles.formLabel}>
                                Middle Name
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.year}
                                className={styles.formControl}
                                id='middle_name'
                                name='middle_name'
                                placeholder='Type their middle name'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='year_of_birth' className={styles.formLabel}>
                                Year of Birth
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.journal}
                                className={styles.formControl}
                                id='year_of_birth'
                                name='year_of_birth'
                                placeholder='Type their year of birth'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='month_of_birth' className={styles.formLabel}>
                                Month of Birth
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.journal}
                                className={styles.formControl}
                                id='month_of_birth'
                                name='month_of_birth'
                                placeholder='Type their month of birth'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='day_of_birth' className={styles.formLabel}>
                                Day of Birth
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.journal}
                                className={styles.formControl}
                                id='day_of_birth'
                                name='day_of_birth'
                                placeholder='Type their day of birth'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='year_died' className={styles.formLabel}>
                                Year Deceased
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.link}
                                className={styles.formControl}
                                id='year_died'
                                name='year_died'
                                placeholder='Type the year they died'
                            />
                        </div>
                        <div className={styles.formInput}>
                            <label htmlFor='author_title_degree' className={styles.formLabel}>
                                Identifier (ISBN or DOI)
                            </label>
                            <input
                                onChange={(e) => onRefChange(e)}
                                type='text'
                                value={refValues.identifier}
                                className={styles.formControl}
                                id='author_title_degree'
                                name='idenauthor_title_degreetifier'
                                placeholder='Type their title or degree'
                            />
                        </div>
                        <div className={styles.formSubmit}>
                            <button type='submit'
                                className={styles.submitBtn}
                            // disabled={!recaptcha}
                            >
                                Submit
                            </button>
                        </div>
                        {success ? <div style={{ color: 'green', margin: '10px 0' }}>{success}</div> : ''}
                        {error1 ? <div style={{ color: 'red', margin: '10px 0' }}>{error1}</div> : ''}
                    </form>
                </div>
            </Layout>
        </div>
    )
}

export default Capture