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
                    media: action.payload.media,
                    mediaType: action.payload.mediaType
                }
            ];
        default:
            return state;
    }
}

const addBlogPost = (dispatch) => {
    return (title, content, location, date, triggers, severity, tags, media, mediaType, callback, ) => {
        dispatch({ type: 'add_blogpost', payload: { title, content, location, date, triggers, severity, tags, media, mediaType } })
        callback();
    }
}

const deleteBlogPost = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
}

const editBlogPost = dispatch => {
    return (id, title, content, location, date, triggers, severity, tags, callback, media, mediaType) => {
        dispatch({
            type: 'edit_blogpost',
            payload: { id, title, content, location, date, triggers, severity, tags, media, mediaType }
        })
        callback();
    }
}

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost },
    [{ title: "Test Post", location: 'Anaheim, California', content: "TEST CONTENT", id: 1, media: "https://images.unsplash.com/photo-1579099715178-d89708832bce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80", mediaType: "image", triggers: [{ name: 'sensory', icon: 'ios-body', }, ,] }]
);