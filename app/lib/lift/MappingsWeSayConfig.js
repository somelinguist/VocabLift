if (typeof WeSayConfig === 'undefined') {
    WeSayConfig = {};
}
if (!WeSayConfig.Mappings) {
    WeSayConfig.Mappings = {};
}
WeSayConfig.Configuration = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Configuration'
});
WeSayConfig.Components = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Components'
});
WeSayConfig.ViewTemplate = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.ViewTemplate'
});
WeSayConfig.Fields = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Fields'
});
WeSayConfig.Field = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Field'
});
WeSayConfig.WritingSystems = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.WritingSystems'
});
WeSayConfig.Tasks = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Tasks'
});
WeSayConfig.Task = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Task'
});
WeSayConfig.Addins = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Addins'
});
WeSayConfig.Addin = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.Addin'
});
WeSayConfig.ReadOnly = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.ReadOnly'
});
WeSayConfig.WritingSystemsToMatch = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.WritingSystemsToMatch'
});
WeSayConfig.WritingSystemsWhichAreRequired = new Jsonix.Model.ClassInfo({
    name: 'WeSayConfig.writingSystemsWhichAreRequired'
});
{
    {
        WeSayConfig.Configuration.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'components',
            elementName: new Jsonix.XML.QName('components'),
            typeInfo: WeSayConfig.Components
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'tasks',
            elementName: new Jsonix.XML.QName('tasks'),
            typeInfo: WeSayConfig.Tasks
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'addins',
            elementName: new Jsonix.XML.QName('addins'),
            typeInfo: WeSayConfig.Addins
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'version',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('version')
        })];
    }
    {
        WeSayConfig.Components.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'viewTemplate',
            elementName: new Jsonix.XML.QName('viewTemplate'),
            typeInfo: WeSayConfig.ViewTemplate
        })];
    }
    {
        WeSayConfig.ViewTemplate.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'fields',
            elementName: new Jsonix.XML.QName('fields'),
            typeInfo: WeSayConfig.Fields
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'id',
            elementName: new Jsonix.XML.QName('id'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        })];
    }
    {
        WeSayConfig.Fields.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: WeSayConfig.Field
        })];
    }
    {
        WeSayConfig.Field.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'className',
            elementName: new Jsonix.XML.QName('className'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'dataType',
            elementName: new Jsonix.XML.QName('dataType'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'displayName',
            elementName: new Jsonix.XML.QName('displayName'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'enabled',
            elementName: new Jsonix.XML.QName('enabled'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fieldName',
            elementName: new Jsonix.XML.QName('fieldName'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'multiParagraph',
            elementName: new Jsonix.XML.QName('multiParagraph'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'spellCheckingEnabled',
            elementName: new Jsonix.XML.QName('spellCheckingEnabled'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'multiplicity',
            elementName: new Jsonix.XML.QName('multiplicity'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'visibility',
            elementName: new Jsonix.XML.QName('visibility'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'optionsListFile',
            elementName: new Jsonix.XML.QName('optionsListFile'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'writingSystems',
            elementName: new Jsonix.XML.QName('writingSystems'),
            typeInfo: WeSayConfig.WritingSystems
        })];
    }
    {
        WeSayConfig.WritingSystems.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'id',
            collection: true,
            elementName: new Jsonix.XML.QName('id'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        })];
    }
    {
        WeSayConfig.Tasks.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'task',
            collection: true,
            elementName: new Jsonix.XML.QName('task'),
            typeInfo: WeSayConfig.Task
        })];
    }
    {
        WeSayConfig.Task.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'taskName',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('taskName')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'visible',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('visible')
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'wordListFileName',
            elementName: new Jsonix.XML.QName('wordListFileName'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'wordListWritingSystemId',
            elementName: new Jsonix.XML.QName('wordListWritingSystemId'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'semanticDomainsQuestionFileName',
            elementName: new Jsonix.XML.QName('semanticDomainsQuestionFileName'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'showMeaningField',
            elementName: new Jsonix.XML.QName('showMeaningField'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'readOnly',
            elementName: new Jsonix.XML.QName('readOnly'),
            typeInfo: WeSayConfig.ReadOnly
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'writingSystemsToMatch',
            elementName: new Jsonix.XML.QName('writingSystemsToMatch'),
            typeInfo: WeSayConfig.WritingSystemsToMatch
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'writingSystemsWhichAreRequired',
            elementName: new Jsonix.XML.QName('writingSystemsWhichAreRequired'),
            typeInfo: WeSayConfig.WritingSystemsWhichAreRequired
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'longLabel',
            elementName: new Jsonix.XML.QName('longLabel'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'showFields',
            elementName: new Jsonix.XML.QName('showFields'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE
        })];
    }
    {
        WeSayConfig.Addins.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'addin',
            collection: true,
            elementName: new Jsonix.XML.QName('addin'),
            typeInfo: WeSayConfig.Addin
        })];
    }
    {
        WeSayConfig.Addin.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'showInWeSay',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('showInWeSay')
        })];
    }
}
WeSayConfig.Mappings.elementInfos = [
    {
        elementName: new Jsonix.XML.QName('configuration'),
        typeInfo: WeSayConfig.Configuration
    },
    {
        elementName: new Jsonix.XML.QName('components'),
        typeInfo: WeSayConfig.Components
    },
    {
        elementName: new Jsonix.XML.QName('viewTemplate'),
        typeInfo: WeSayConfig.ViewTemplate
    },
    {
        elementName: new Jsonix.XML.QName('fields'),
        typeInfo: WeSayConfig.Fields
    },
    {
        elementName: new Jsonix.XML.QName('field'),
        typeInfo: WeSayConfig.Field
    },
    {
        elementName: new Jsonix.XML.QName('writingSystems'),
        typeInfo: WeSayConfig.WritingSystems
    },
    {
        elementName: new Jsonix.XML.QName('tasks'),
        typeInfo: WeSayConfig.Tasks
    },
    {
        elementName: new Jsonix.XML.QName('task'),
        typeInfo: WeSayConfig.Task
    },
    {
        elementName: new Jsonix.XML.QName('readOnly'),
        typeInfo: WeSayConfig.ReadOnly
    },
    {
        elementName: new Jsonix.XML.QName('writingSystemsToMatch'),
        typeInfo: WeSayConfig.WritingSystemsToMatch
    },
    {
        elementName: new Jsonix.XML.QName('writingSystemsWhichAreRequired'),
        typeInfo: WeSayConfig.WritingSystemsWhichAreRequired
    },
    {
        elementName: new Jsonix.XML.QName('addins'),
        typeInfo: WeSayConfig.Addins
    },
    {
        elementName: new Jsonix.XML.QName('addin'),
        typeInfo: WeSayConfig.Addin
    }
];
WeSayConfig.test = true;