import React from 'react';
import { Query } from '@apollo/client/react/components';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import DataTable from '@commercetools-uikit/data-table';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { GetProjectQuery } from './get-project.graphql';
import messages from './messages';

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const Project = props => (
    <Query
      query={GetProjectQuery}
      variables={{
      }}
      context={{ target }}
    >
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
  
        return (
          <Text.Headline as="h1">{`${data.project.name}`}</Text.Headline>
        );
      }}
    </Query>
  );

const rows = [
    { id: 'parasite', title: 'Parasite', country: 'South Korea' },
    { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
    { id: 'wat', title: 'Woman at War', country: 'Iceland' },
    { id: 'jdkljs', title: 'jdksljsa at War', country: 'sjdkljskda' },
  ];

const columns = [
    { key: 'title', label: 'Title'},
    { key: 'country', label: 'Country' },
];


const ViewOne = () => {
    return (
        <div>
            <Text.Body intlMessage={messages.title} />
            <Constraints.Horizontal max={'auto'}> 
                <p> 
                    Lorem ipsum dolor sit amet, id labitur perpetua vix. An graece iisque corpora sit, erant nihil signiferumque et pro, cu ius minim altera temporibus. 
                </p> 
            </Constraints.Horizontal>
            <DataTable rows={rows} columns={columns} />
            <LoadingSpinner size="s">Loading</LoadingSpinner>
            <Project />
        </div>
    );
};
ViewOne.displayName = 'ViewOne';

export default ViewOne;
