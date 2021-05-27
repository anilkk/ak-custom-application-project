import React from 'react';
import { Query } from '@apollo/client/react/components';
import Text from '@commercetools-uikit/text';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import messages from './messages';
import { GetProjectQuery } from './get-project.graphql';

{/* <Query
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
</Query> */}

const target = GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM;

const Project = (props) => (
    <Query
      query={GetProjectQuery}  
      context={{target}}
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

const ViewTwo = () => {
  const [userData, setUserData] = React.useState(null);
  React.useEffect(async () => {
    if (!userData) {
      await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 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'
        }
      })
      .then(result => {
        setUserData(result);
        console.log('RESULT ---->', JSON.stringify(result));
      })

    }
  }, []);

    return (
        <div>
            <Text.Body intlMessage={messages.title} />
            <Project />
            {userData && JSON.stringify(userData)}
        </div>
    );
};
ViewTwo.displayName = 'ViewTwo';

export default ViewTwo;
