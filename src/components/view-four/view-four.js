import React from 'react';
import { Query } from '@apollo/client/react/components';
import Text from '@commercetools-uikit/text';
import DataTable from '@commercetools-uikit/data-table';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import messages from './messages';
import { GetCustomObjectsByContainer } from './get-customobjectsbycontainer.graphql'

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const columns = [
    { key: 'container', label: 'container'},
    { key: 'key', label: 'key'},
    { key: 'value', label: 'Value' },
];

const CustomObjects = () => {
    return (
        <Query
            query={GetCustomObjectsByContainer}
            variables={{
                "container": "demo-container"
            }}
            context={{ target }}
        >
        {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
      
            return (
                     <DataTable rows={data.customObjects.results.map(({container, key, value}) =>(
                        {container, key, value}
                    ))} columns={columns} />
            );
        }}

        </Query>
    );
};

const ViewFour = () => {
    return (
        <div>
            <Text.Body intlMessage={messages.title} />
            <CustomObjects />
        </div>
    );
};
ViewFour.displayName = 'ViewFour';

export default ViewFour;
