import { connect } from 'react-redux';
import prepareModelForRails from 'app/utils/prepareModelForRails';
import railsErrorsForReduxForm from 'app/utils/railsErrorsForReduxForm';
import OrganizationForm from './OrganizationForm';
import React from 'react';
import { compose, withApollo } from 'react-apollo';
import { reduxForm, SubmissionError } from 'redux-form';

const NewOrganizationPage = compose(
    withApollo,
    connect(
        (state) => ({}),
        (dispatch, ownProps) => {
            return {
                onSubmit: (values) => {
                    return fetch('/users.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            user: prepareModelForRails(values, ["organization"])
                        }),
                        credentials: 'same-origin'
                    })
                        .then(response => response.json())
                        .then(json => {
                            if (json.errors) {
                                throw new SubmissionError(railsErrorsForReduxForm(json.errors));
                            } else {
                                ownProps.client.resetStore();
                                window.location.assign(json.user.organization.url);
                            }
                        });
                }
            }
        }
    ),
    reduxForm({
        form: 'newOrganization'
    })
)(OrganizationForm);

export default NewOrganizationPage;
