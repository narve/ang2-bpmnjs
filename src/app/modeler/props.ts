var entryFactory = require('bpmn-js-properties-panel/lib/factory/EntryFactory');
var is = require('bpmn-js/lib/util/ModelUtil').is;

export function CustomProps(group:any, element:any) {
    if (is(element, 'bpmn:SendTask')) {
        group.entries.push(entryFactory.textField({
            id : 'template',
            description : 'template',
            label : 'template',
            modelProperty : 'template'
        }));
    }

    if (is(element, 'bpmn:UserTask')) {
        group.entries.push(entryFactory.textField({
            id : 'worklist',
            description : 'worklist',
            label : 'worklist',
            modelProperty : 'worklist'
        }));
    }

    if (is(element, 'bpmn:ExclusiveGateway')) {
        group.entries.push(entryFactory.textField({
            id: 'condition',
            description: 'The Instance property whose value should match one of the outgoing flows',
            label: 'Instance property to evaluate',
            modelProperty: 'condition'
        }));
    }

    if (is(element, 'bpmn:ScriptTask')) {
        group.entries.push(entryFactory.textBox({
            id: 'script',
            description: 'script',
            label: 'script',
            modelProperty: 'script'
        }));
    }

    if (is(element, 'bpmn:SubProcess')) {
        group.entries.push(entryFactory.textField({
            id: 'ReferencedProcessDefinition',
            description: 'ReferencedProcessDefinition',
            label: 'ReferencedProcessDefinition',
            modelProperty: 'ReferencedProcessDefinition'
        }));
    }


};