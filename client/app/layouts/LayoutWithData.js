import React from 'react';
import { connect } from 'react-redux';
import { userLogOut } from './actions';
import { browserHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from './Layout';

const query = gql`{
    user: currentUser {
        id
        email
        username
        first_name
        last_name
    }
}
`;
const LayoutWithData = connect(
    (state) => state,
    (dispatch) => {
        return {
            onLogOut: () => {
                dispatch(userLogOut());
            },
            onLogIn: () => {
                browserHistory.push('/users/login');
            }
        }
    }
)
(graphql(query, {
    props: ({ data: { user, isLoading } }) => {
        return { user, isLoading };
    }
})(Layout));

export default LayoutWithData;
