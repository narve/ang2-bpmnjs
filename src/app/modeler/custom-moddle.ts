import {Custom} from './custom';

export const CustomModdle = {
    name: Custom.name,
    prefix: Custom.prefix,
    uri: Custom.uri,
    xml: {
        tagAlias: "lowerCase"
    },
    associations: new Array(),
    types: [
        {
            name: "NESendTask",
            extends: [
                "bpmn:SendTask"
            ],
            properties: [
                {
                    "name": "template",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            name: "NEUserTask",
            extends: [
                "bpmn:UserTask"
            ],
            properties: [
                {
                    "name": "worklist",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            name: "NEGW",
            extends: [
                "bpmn:ExclusiveGateway"
            ],
            properties: [
                {
                    "name": "condition",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        },
        {
            name: "NESubProcess",
            extends: [
                "bpmn:SubProcess"
            ],
            properties: [
                {
                    "name": "ReferencedProcessDefinition",
                    "isAttr": true,
                    "type": "String"
                }
            ]
        }
    ]
};