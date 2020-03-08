import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
    switch (action.type) {
        case 'edit_blogpost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id) {
                    return action.payload
                }
                else {
                    return blogPost;
                }
            })
        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_blogpost':
            return [
                ...state,
                {
                    id: Math.floor(Math.random() * 99999),
                    title: action.payload.title,
                    content: action.payload.content,
                    location: action.payload.location,
                    date: action.payload.date,
                    triggers: action.payload.triggers,
                    severity: action.payload.severity,
                    tags: action.payload.tags,
                    media: action.payload.media
                }
            ];
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, location, date, triggers, severity, tags, media, callback, ) => {
        dispatch({ type: 'add_blogpost', payload: { title, content, location, date, triggers, severity, tags, media } })
        callback();
    }
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, location, date, triggers, severity, tags, callback, media) => {
        dispatch({
            type: 'edit_blogpost',
            payload: { id, title, content, location, date, triggers, severity, tags, media }
        })
        callback();
    }
}

const retrieveLogs = ({ navigation }) => {
    const date = navigation.getParam('date');
    // const password = navigation.getParam('password');
    const email = navigation.getParam('email');

    const doc_id = navigation.getParam('doc_id');

    console.log("EMAIL: " + email);
    console.log("DATE: " + date);
    console.log("Doc ID: " + doc_id);

    let val = [{ title: "Test Post", location: 'Anaheim, California', content: "TEST CONTENT", id: 1, media: "https://i.redd.it/0lhcsz48lmc31.png", triggers: [{ name: 'sensory', icon: 'ios-body', }, ,] }];

    return val;
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    // this.retrieveLogs()
    [{ title: "Test Post", location: 'Anaheim, California', content: "TEST CONTENT", id: 1, media: "https://i.redd.it/0lhcsz48lmc31.png", triggers: [{ name: 'sensory', icon: 'ios-body', }, ,] }]
);
