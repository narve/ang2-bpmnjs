import {Custom} from './custom';

var inherits = require('inherits');

var PropertiesActivator = require('bpmn-js-properties-panel/lib/PropertiesActivator');

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
var processProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps'),
    eventProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps'),
    linkProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps'),
    documentationProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps'),
    idProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps'),
    nameProps = require('bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps');

import {CustomProps} from './props';

// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element: any, bpmnFactory: any, elementRegistry: any) {

    var generalGroup = {
        id: 'general',
        label: 'General',
        entries: new Array,
    };

    idProps(generalGroup, element, elementRegistry);
    nameProps(generalGroup, element);
    processProps(generalGroup, element);

    var detailsGroup = {
        id: 'details',
        label: 'Details',
        entries: new Array,
    };
    linkProps(detailsGroup, element);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry);

    var documentationGroup = {
        id: 'documentation',
        label: 'Documentation',
        entries: new Array,
    };

    documentationProps(documentationGroup, element, bpmnFactory);

    return [
        generalGroup,
        detailsGroup,
        documentationGroup
    ];
}

function createCustomTabGroups(element: any, elementRegistry: any) {

    var theGroup = {
        id: Custom.id,
        label: Custom.name,
        entries: new Array
    };

    CustomProps(theGroup, element);

    return [
        theGroup
    ];
}

export function CustomPropertiesProvider(eventBus: any, bpmnFactory: any, elementRegistry: any) {

    PropertiesActivator.call(this, eventBus);

    this.getTabs = function (element: any) {

        var generalTab = {
            id: 'general',
            label: 'General',
            groups: createGeneralTabGroups(element, bpmnFactory, elementRegistry)
        };

        var theTab = {
            id: Custom.id,
            label: Custom.name,
            groups: createCustomTabGroups(element, elementRegistry)
        };

        return [
            generalTab,
            theTab,
        ];
    };
}

inherits(CustomPropertiesProvider, PropertiesActivator);
