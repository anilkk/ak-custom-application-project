import React from 'react';
import { Query } from '@apollo/client/react/components';
import { useQuery, useMutation } from '@apollo/client';
import Text from '@commercetools-uikit/text';
import DataTable from '@commercetools-uikit/data-table';
import TextInput from '@commercetools-uikit/text-input';
import { FormDialog } from '@commercetools-frontend/application-components';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import FlatButton from '@commercetools-uikit/flat-button';
import FieldLabel from '@commercetools-uikit/field-label';
import { GRAPHQL_TARGETS, MC_API_PROXY_TARGETS } from '@commercetools-frontend/constants';
import { actions as sdkActions, useAsyncDispatch } from '@commercetools-frontend/sdk';
import messages from './messages';
import { GetCustomObjectsByContainer } from './get-customobjectsbycontainer.graphql';
import { AddCustomObject } from './add-customobject.graphql';
import { DeleteCustomObject } from './delete-customobjectbycontainerandkey.graphql';

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
                        {container, key, value, id: key}
                    ))} columns={columns} />
            );
        }}
        </Query>
    );
};

const ViewFour = () => {
    const [key, setKey] = React.useState('');
    const [deleteKey, setDeleteKey] = React.useState('');
    const [value, setValue] = React.useState('');
    const [container, setContainer] = React.useState('');
    const [deleteContainer, setDeleteContainer] = React.useState('');
    const [ addCustomObjIsOpen, setAddCustomObjIsOpen] = React.useState(false);
    const [ deleteCustomObjIsOpen, setDeleteCustomObjIsOpen] = React.useState(true);
    const [addCustomObject, { data }] = useMutation(AddCustomObject);
    const [deleteCustomObject] = useMutation(DeleteCustomObject);

    const dispatch = useAsyncDispatch();

    const handleAddCustomObject = async () => {
        // await addCustomObject({variables: {
        //     target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        //     "customObjectDraft": {
        //         "key": "key-anil", 
        //         "container": "demo-container",
        //         "value": "\"value-anil\""
        //     }
        // }})
        // console.log('RESULT -->', data);
        dispatch(sdkActions.post({
            mcApiProxyTarget: MC_API_PROXY_TARGETS.COMMERCETOOLS_PLATFORM,
            service: 'customObjects',
            payload: {
                key: "key-dispatch",
                value: "value-dispatch",
                container: "demo-container",
            }
        }));
        setAddCustomObjIsOpen(false);
    };

    const handleDeleteCustomObject = async () => {
        await deleteCustomObject({variables: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
            "key": "key-n",
            "container": "demo-container",
        }})
        console.log('RESULT -->', data);
        setDeleteCustomObjIsOpen(false);
    };


    return (
        <div>
            <FlatButton
                tone="primary"
                label="Toggle Add Custom Object form"
                onClick={() => setAddCustomObjIsOpen(!addCustomObjIsOpen)}
                isDisabled={false}
            />
            <FlatButton
                tone="primary"
                label="Toggle Delete Custom Object form"
                onClick={() => setDeleteCustomObjIsOpen(!deleteCustomObject)}
                isDisabled={false}
            />
            <Text.Body intlMessage={messages.title} />
            <CustomObjects />
            <FormDialog
                title="Add new Custom Object"
                isOpen={addCustomObjIsOpen}
                onClose={() => {setAddCustomObjIsOpen(false)}}
                onSecondaryButtonClick={() => {setAddCustomObjIsOpen(false)}}
                onPrimaryButtonClick={handleAddCustomObject}
            >
                <SpacingsStack scale="m">
                    <FieldLabel
                        title={"Key:"}
                        hasRequiredIndicator={true}
                        htmlFor="key"
                        horizontalConstraint={7}
                    />
                    <TextInput id="key" value={key} onChange={(event) => setKey(event.target.value)} />
                    <FieldLabel
                        title={"Value:"}
                        hasRequiredIndicator={true}
                        htmlFor="value"
                        horizontalConstraint={7}
                    />
                    <TextInput id="value" value={value} onChange={(event) => setValue(event.target.value)} />
                    <FieldLabel
                        title={"Container:"}
                        hasRequiredIndicator={true}
                        htmlFor="container"
                        horizontalConstraint={7}
                    />
                    <TextInput id="container" value={container} onChange={(event) => setContainer(event.target.value)} />
                </SpacingsStack>
            </FormDialog>
            <FormDialog
                title="Delete a Custom Object"
                isOpen={deleteCustomObjIsOpen}
                onClose={() => {setDeleteCustomObjIsOpen(false)}}
                onSecondaryButtonClick={() => {setDeleteCustomObjIsOpen(false)}}
                onPrimaryButtonClick={handleDeleteCustomObject}
            >
                <SpacingsStack scale="m">
                    <FieldLabel
                        title={"Key:"}
                        hasRequiredIndicator={true}
                        htmlFor="deleteKey"
                        horizontalConstraint={7}
                    />
                    <TextInput id="deleteKey" value={deleteKey} onChange={(event) => setDeleteKey(event.target.value)} />
                    <FieldLabel
                        title={"Container:"}
                        hasRequiredIndicator={true}
                        htmlFor="deleteContainer"
                        horizontalConstraint={7}
                    />
                    <TextInput id="deleteContainer" value={deleteContainer} onChange={(event) => setDeleteContainer(event.target.value)} />
                </SpacingsStack>
            </FormDialog>
        </div>
    );
};
ViewFour.displayName = 'ViewFour';

export default ViewFour;
