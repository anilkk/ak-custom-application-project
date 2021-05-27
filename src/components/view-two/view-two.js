import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Query } from '@apollo/client/react/components';
import Text from '@commercetools-uikit/text';
import TextInput from '@commercetools-uikit/text-input';
import FieldLabel from '@commercetools-uikit/field-label';
import FlatButton from '@commercetools-uikit/flat-button';
import { FormDialog } from '@commercetools-frontend/application-components';
import Spacings from '@commercetools-uikit/spacings';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import { actions as sdkActions, useAsyncDispatch } from '@commercetools-frontend/sdk';
import messages from './messages';
import { GetProjectQuery } from './get-project.graphql';
import { AddCustomObject } from './add-customobject.graphql';
import { DeleteCustomObject } from './delete-customobjectbycontainerandkey.graphql';

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
    const [films, setFilms] = React.useState([]);
    const [customObjectKey, setCustomObjectKey] = React.useState('');
    const [deleteCustomObjectFormIsOpen, setDeleteCustomObjectFormIsOpen] = React.useState(false);
    const dispatch = useAsyncDispatch();
    const [addCustomObject] = useMutation(AddCustomObject, {
        variables: {
          target,
          "customObjectDraft": {
            "key": "ak-3-key-from-custom-app",
            "value": "\"ak-3-value-from-custom-app\"",
            "container": "demo-container"
          }
        }
    });

    const [deleteCustomObject] = useMutation(DeleteCustomObject, {
      variables: {
        target,
        key: customObjectKey,
        container: 'demo-container'
      }
  });

    const handleAddCustomObject = () => {
      addCustomObject();
    };
    const handleDeleteCustomObject = () => {
      deleteCustomObject();
      setDeleteCustomObjectFormIsOpen(false);
    };
    const openDeleteCustomObjectForm = () => {
      setDeleteCustomObjectFormIsOpen(true);
    };
    const handleClose = () => {    
      setDeleteCustomObjectFormIsOpen(false);
    };
    const getFilmsData = async () => {
      const result = await dispatch(sdkActions.forwardTo.post({
        uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
        payload: {
          query: `query {
            allFilms {
              films {
                title
              }
            }
          }`
        },
        headers : {
          'my-test-prop': "anil-kumar"
        }
      }));
      setFilms(result.data.allFilms.films);
      console.log('RESULT -->', result);
    }
    
    return (
        <div>
            <Text.Body intlMessage={messages.title} />
            <Project />
            <FlatButton onClick={getFilmsData} label="Get films data" />
            <FlatButton onClick={handleAddCustomObject} label="Add new custom object" />
            <FlatButton onClick={openDeleteCustomObjectForm} label="Delete custom object" />
            <FormDialog
              title="Delete Custom Object"
              isOpen={deleteCustomObjectFormIsOpen}
              onClose={handleClose}
              onSecondaryButtonClick={handleClose}
              onPrimaryButtonClick={handleDeleteCustomObject}
            >
                <Spacings.Stack scale="m">
                <FieldLabel
                      title={"Key:"}
                      hasRequiredIndicator={true}
                      htmlFor="deleteKey"
                      horizontalConstraint={7}
                  />
                  <TextInput id="deleteKey" value={customObjectKey} onChange={(event) => {
                    console.log('USER entered -->', event.target.value);
                    setCustomObjectKey(event.target.value)
                  }} />
                </Spacings.Stack>
            </FormDialog>

        </div>
    );
};
ViewTwo.displayName = 'ViewTwo';

export default ViewTwo;
