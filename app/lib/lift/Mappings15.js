if (typeof LIFT15 === 'undefined') {
    LIFT15 = {};
}
if (!LIFT15.Mappings) {
    LIFT15.Mappings = {};
}
LIFT15.Range = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Range'
});
LIFT15.Description = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Description'
});
LIFT15.Label = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Label'
});
LIFT15.Abbrev = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Abbrev'
});
LIFT15.RangeElement = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.RangeElement'
});
LIFT15.Form = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Form'
});
LIFT15.Text = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Text'
});
LIFT15.Annotation = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Annotation'
});
LIFT15.Span = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Span'
});
LIFT15.Translation = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Translation'
});
LIFT15.Illustration = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Illustration'
});
LIFT15.Ranges = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Ranges'
});
LIFT15.Variant = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Variant'
});
LIFT15.Trait = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Trait'
});
LIFT15.Field = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Field'
});
LIFT15.FieldDefinition = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.FieldDefinition'
});
LIFT15.Phonetic = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Phonetic'
});
LIFT15.Relation = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Relation'
});
LIFT15.Media = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Media'
});
LIFT15.Usage = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Usage'
});
LIFT15.LexicalUnit = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.LexicalUnit'
});
LIFT15.Note = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Note'
});
LIFT15.Reversal = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Reversal'
});
LIFT15.Main = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Main'
});
LIFT15.GrammaticalInfo = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.GrammaticalInfo'
});
LIFT15.Fields = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Fields'
});
LIFT15.Field = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Field'
});
LIFT15.Citation = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Citation'
});
LIFT15.Etymology = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Etymology'
});
LIFT15.Gloss = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Gloss'
});
LIFT15.Definition = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Definition'
});
LIFT15.SenseContent = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.SenseContent'
});
LIFT15.Example = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Example'
});
LIFT15.Header = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Header'
});
LIFT15.Entry = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Entry'
});
LIFT15.Lift = new Jsonix.Model.ClassInfo({
    name: 'LIFT15.Lift'
});
{
    {
        LIFT15.Range.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT15.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT15.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT15.Abbrev
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'rangeElement',
            collection: true,
            elementName: new Jsonix.XML.QName('range-element'),
            typeInfo: LIFT15.RangeElement
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'guid',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('guid')
        })];
    }
    {
        LIFT15.Description.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.Form.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT15.Text.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT15.Span
        })];
    }
    {
        LIFT15.Span.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT15.Span
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'clazz',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('class')
        })];
    }
    {
        LIFT15.Annotation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'name',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'who',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('who')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'when',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('when')
        })];
    }
    {
        LIFT15.Label.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.Abbrev.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.RangeElement.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT15.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT15.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT15.Abbrev
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'parent',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('parent')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'guid',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('guid')
        })];
    }
    {
        LIFT15.Translation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT15.Illustration.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT15.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT15.Ranges.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'range',
            collection: true,
            elementName: new Jsonix.XML.QName('range'),
            typeInfo: LIFT15.Range
        })];
    }
    {
        LIFT15.Variant.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT15.Phonetic
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT15.Relation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'ref',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('ref')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.FieldDefinition.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT15.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT15.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'name',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'class',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('class')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'optionRange',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('option-range')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'writingSystem',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('writing-system')
        })];
    }
    {
        LIFT15.Trait.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'name',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        })];
    }
    {
        LIFT15.Field.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'name',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Phonetic.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'media',
            collection: true,
            elementName: new Jsonix.XML.QName('media'),
            typeInfo: LIFT15.Media
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Media.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT15.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT15.Relation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'usage',
            elementName: new Jsonix.XML.QName('usage'),
            typeInfo: LIFT15.Usage
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'order',
            typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
            attributeName: new Jsonix.XML.QName('order')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'ref',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('ref')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Usage.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.LexicalUnit.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.Note.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Reversal.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT15.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT15.GrammaticalInfo
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT15.Main.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT15.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT15.GrammaticalInfo
        })];
    }
    {
        LIFT15.GrammaticalInfo.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LIFT15.Fields.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        })];
    }
    {
        LIFT15.Citation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.Etymology.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT15.Gloss
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'source',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('source')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Gloss.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT15.Definition.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        })];
    }
    {
        LIFT15.SenseContent.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT15.GrammaticalInfo
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT15.Gloss
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'definition',
            elementName: new Jsonix.XML.QName('definition'),
            typeInfo: LIFT15.Definition
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT15.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT15.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'example',
            collection: true,
            elementName: new Jsonix.XML.QName('example'),
            typeInfo: LIFT15.Example
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'reversal',
            collection: true,
            elementName: new Jsonix.XML.QName('reversal'),
            typeInfo: LIFT15.Reversal
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'illustration',
            collection: true,
            elementName: new Jsonix.XML.QName('illustration'),
            typeInfo: LIFT15.Illustration
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'subsense',
            collection: true,
            elementName: new Jsonix.XML.QName('subsense'),
            typeInfo: LIFT15.SenseContent
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'order',
            typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
            attributeName: new Jsonix.XML.QName('order')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Header.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT15.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'ranges',
            elementName: new Jsonix.XML.QName('ranges'),
            typeInfo: LIFT15.Ranges
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fields',
            elementName: new Jsonix.XML.QName('fields'),
            typeInfo: LIFT15.Fields
        })];
    }
    {
        LIFT15.Entry.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'lexicalUnit',
            elementName: new Jsonix.XML.QName('lexical-unit'),
            typeInfo: LIFT15.LexicalUnit
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'citation',
            elementName: new Jsonix.XML.QName('citation'),
            typeInfo: LIFT15.Citation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT15.Phonetic
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'variant',
            collection: true,
            elementName: new Jsonix.XML.QName('variant'),
            typeInfo: LIFT15.Variant
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'sense',
            collection: true,
            elementName: new Jsonix.XML.QName('sense'),
            typeInfo: LIFT15.SenseContent
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT15.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT15.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'etymology',
            collection: true,
            elementName: new Jsonix.XML.QName('etymology'),
            typeInfo: LIFT15.Etymology
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'id',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('id')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'guid',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('guid')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'order',
            typeInfo: Jsonix.Schema.XSD.Integer.INSTANCE,
            attributeName: new Jsonix.XML.QName('order')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateDeleted',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateDeleted')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
    {
        LIFT15.Lift.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'header',
            elementName: new Jsonix.XML.QName('header'),
            typeInfo: LIFT15.Header
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'entry',
            collection: true,
            elementName: new Jsonix.XML.QName('entry'),
            typeInfo: LIFT15.Entry
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'version',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('version')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'producer',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('producer')
        })];
    }
    {
        LIFT15.Example.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT15.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT15.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT15.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT15.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT15.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'translation',
            collection: true,
            elementName: new Jsonix.XML.QName('translation'),
            typeInfo: LIFT15.Translation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT15.Note
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'source',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('source')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateCreated',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateCreated')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'dateModified',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('dateModified')
        })];
    }
}
LIFT15.Mappings.elementInfos = [
    {
        elementName: new Jsonix.XML.QName('range'),
        typeInfo: LIFT15.Range
    },
    {
        elementName: new Jsonix.XML.QName('description'),
        typeInfo: LIFT15.Description
    },
    {
        elementName: new Jsonix.XML.QName('form'),
        typeInfo: LIFT15.Form
    },
    {
        elementName: new Jsonix.XML.QName('text'),
        typeInfo: LIFT15.Text
    },
    {
        elementName: new Jsonix.XML.QName('span'),
        typeInfo: LIFT15.Span
    },
    {
        elementName: new Jsonix.XML.QName('annotation'),
        typeInfo: LIFT15.Annotation
    },
    {
        elementName: new Jsonix.XML.QName('label'),
        typeInfo: LIFT15.Label
    },
    {
        elementName: new Jsonix.XML.QName('abbrev'),
        typeInfo: LIFT15.Abbrev
    },
    {
        elementName: new Jsonix.XML.QName('range-element'),
        typeInfo: LIFT15.RangeElement
    },
    {
        elementName: new Jsonix.XML.QName('translation'),
        typeInfo: LIFT15.Translation
    },
    {
        elementName: new Jsonix.XML.QName('illustration'),
        typeInfo: LIFT15.Illustration
    },
    {
        elementName: new Jsonix.XML.QName('ranges'),
        typeInfo: LIFT15.Ranges
    },
    {
        elementName: new Jsonix.XML.QName('lift-ranges'),
        typeInfo: LIFT15.Ranges
    },
    {
        elementName: new Jsonix.XML.QName('variant'),
        typeInfo: LIFT15.Variant
    },
    {
        elementName: new Jsonix.XML.QName('trait'),
        typeInfo: LIFT15.Trait
    },
    {
        elementName: new Jsonix.XML.QName('pronunciation'),
        typeInfo: LIFT15.Phonetic
    },
    {
        elementName: new Jsonix.XML.QName('media'),
        typeInfo: LIFT15.Media
    },
    {
        elementName: new Jsonix.XML.QName('relation'),
        typeInfo: LIFT15.Relation
    },
    {
        elementName: new Jsonix.XML.QName('usage'),
        typeInfo: LIFT15.Usage
    },
    {
        elementName: new Jsonix.XML.QName('lexical-unit'),
        typeInfo: LIFT15.LexicalUnit
    },
    {
        elementName: new Jsonix.XML.QName('note'),
        typeInfo: LIFT15.Note
    },
    {
        elementName: new Jsonix.XML.QName('reversal'),
        typeInfo: LIFT15.Reversal
    },
    {
        elementName: new Jsonix.XML.QName('main'),
        typeInfo: LIFT15.Main
    },
    {
        elementName: new Jsonix.XML.QName('grammatical-info'),
        typeInfo: LIFT15.GrammaticalInfo
    },
    {
        elementName: new Jsonix.XML.QName('fields'),
        typeInfo: LIFT15.Fields
    },
    {
        elementName: new Jsonix.XML.QName('field-definition'),
        typeInfo: LIFT15.FieldDefinition
    },
    {
        elementName: new Jsonix.XML.QName('field'),
        typeInfo: LIFT15.Field
    },
    {
        elementName: new Jsonix.XML.QName('citation'),
        typeInfo: LIFT15.Citation
    },
    {
        elementName: new Jsonix.XML.QName('etymology'),
        typeInfo: LIFT15.Etymology
    },
    {
        elementName: new Jsonix.XML.QName('gloss'),
        typeInfo: LIFT15.Gloss
    },
    {
        elementName: new Jsonix.XML.QName('definition'),
        typeInfo: LIFT15.Definition
    },
    {
        elementName: new Jsonix.XML.QName('header'),
        typeInfo: LIFT15.Header
    },
    {
        elementName: new Jsonix.XML.QName('entry'),
        typeInfo: LIFT15.Entry
    },
    {
        elementName: new Jsonix.XML.QName('lift'),
        typeInfo: LIFT15.Lift
    },
    {
        elementName: new Jsonix.XML.QName('example'),
        typeInfo: LIFT15.Example
    },
    {
        elementName: new Jsonix.XML.QName('sense'),
        typeInfo: LIFT15.SenseContent
    },
    {
        elementName: new Jsonix.XML.QName('subsense'),
        typeInfo: LIFT15.SenseContent
    }
];