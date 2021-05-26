import React from 'react';
import { Query } from '@apollo/client/react/components';
import Text from '@commercetools-uikit/text';
import DataTable from '@commercetools-uikit/data-table';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import messages from './messages';
import { GetCustomers } from './get-customers.graphql'

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const columns = [
    { key: 'firstName', label: 'First Name'},
    { key: 'companyName', label: 'Company Name'},
    { key: 'email', label: 'Email' },
];

const Customers = () => {
    return (
        <Query
            query={GetCustomers}
            context={{ target }}
        >
        {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
      
            return (
                     <DataTable rows={data.customers.results.map(({email, firstName, companyName}) =>(
                        {email, firstName, companyName, id: email}
                    ))} columns={columns} />
            );
        }}

        </Query>
    );
};

const ViewThree = () => {
    return (
        <div>
            <Text.Body intlMessage={messages.title} />
            <Customers />
        </div>
    );
};
ViewThree.displayName = 'ViewThree';

export default ViewThree;
