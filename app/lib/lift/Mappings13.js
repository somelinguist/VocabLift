if (typeof LIFT13 === 'undefined') {
    LIFT13 = {};
}
if (!LIFT13.Mappings) {
    LIFT13.Mappings = {};
}
LIFT13.Range = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Range'
});
LIFT13.Description = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Description'
});
LIFT13.Label = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Label'
});
LIFT13.Abbrev = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Abbrev'
});
LIFT13.RangeElement = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.RangeElement'
});
LIFT13.Form = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Form'
});
LIFT13.Text = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Text'
});
LIFT13.Annotation = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Annotation'
});
LIFT13.Span = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Span'
});
LIFT13.Translation = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Translation'
});
LIFT13.Illustration = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Illustration'
});
LIFT13.Ranges = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Ranges'
});
LIFT13.Variant = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Variant'
});
LIFT13.Trait = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Trait'
});
LIFT13.Field = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Field'
});
LIFT13.Phonetic = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Phonetic'
});
LIFT13.Relation = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Relation'
});
LIFT13.Media = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Media'
});
LIFT13.Usage = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Usage'
});
LIFT13.LexicalUnit = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.LexicalUnit'
});
LIFT13.Note = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Note'
});
LIFT13.Reversal = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Reversal'
});
LIFT13.Main = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Main'
});
LIFT13.GrammaticalInfo = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.GrammaticalInfo'
});
LIFT13.Fields = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Fields'
});
LIFT13.FieldDefn = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.FieldDefn'
});
LIFT13.Citation = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Citation'
});
LIFT13.Etymology = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Etymology'
});
LIFT13.Gloss = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Gloss'
});
LIFT13.Definition = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Definition'
});
LIFT13.SenseContent = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.SenseContent'
});
LIFT13.Example = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Example'
});
LIFT13.Header = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Header'
});
LIFT13.Entry = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Entry'
});
LIFT13.Lift = new Jsonix.Model.ClassInfo({
    name: 'LIFT13.Lift'
});
{
    {
        LIFT13.Range.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT13.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT13.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT13.Abbrev
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'rangeElement',
            collection: true,
            elementName: new Jsonix.XML.QName('range-element'),
            typeInfo: LIFT13.RangeElement
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
        LIFT13.Description.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.Form.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT13.Text.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT13.Span
        })];
    }
    {
        LIFT13.Span.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT13.Span
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
        LIFT13.Annotation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
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
        LIFT13.Label.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.Abbrev.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.RangeElement.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT13.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT13.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT13.Abbrev
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
        LIFT13.Translation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT13.Illustration.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT13.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT13.Ranges.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'range',
            collection: true,
            elementName: new Jsonix.XML.QName('range'),
            typeInfo: LIFT13.Range
        })];
    }
    {
        LIFT13.Variant.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT13.Phonetic
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT13.Relation
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
        LIFT13.Trait.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'name',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('name')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LIFT13.Field.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
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
        LIFT13.Phonetic.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'media',
            collection: true,
            elementName: new Jsonix.XML.QName('media'),
            typeInfo: LIFT13.Media
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
        LIFT13.Media.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT13.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT13.Relation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'usage',
            elementName: new Jsonix.XML.QName('usage'),
            typeInfo: LIFT13.Usage
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
        LIFT13.Usage.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.LexicalUnit.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.Note.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
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
        LIFT13.Reversal.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT13.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT13.GrammaticalInfo
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT13.Main.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT13.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT13.GrammaticalInfo
        })];
    }
    {
        LIFT13.GrammaticalInfo.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LIFT13.Fields.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.FieldDefn
        })];
    }
    {
        LIFT13.FieldDefn.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'tag',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('tag')
        })];
    }
    {
        LIFT13.Citation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.Etymology.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT13.Gloss
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
        LIFT13.Gloss.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT13.Definition.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        })];
    }
    {
        LIFT13.SenseContent.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT13.GrammaticalInfo
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT13.Gloss
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'definition',
            elementName: new Jsonix.XML.QName('definition'),
            typeInfo: LIFT13.Definition
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT13.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT13.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'example',
            collection: true,
            elementName: new Jsonix.XML.QName('example'),
            typeInfo: LIFT13.Example
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'reversal',
            collection: true,
            elementName: new Jsonix.XML.QName('reversal'),
            typeInfo: LIFT13.Reversal
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'illustration',
            collection: true,
            elementName: new Jsonix.XML.QName('illustration'),
            typeInfo: LIFT13.Illustration
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'subsense',
            collection: true,
            elementName: new Jsonix.XML.QName('subsense'),
            typeInfo: LIFT13.SenseContent
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
        LIFT13.Header.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT13.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'ranges',
            elementName: new Jsonix.XML.QName('ranges'),
            typeInfo: LIFT13.Ranges
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fields',
            elementName: new Jsonix.XML.QName('fields'),
            typeInfo: LIFT13.Fields
        })];
    }
    {
        LIFT13.Entry.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'lexicalUnit',
            elementName: new Jsonix.XML.QName('lexical-unit'),
            typeInfo: LIFT13.LexicalUnit
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'citation',
            elementName: new Jsonix.XML.QName('citation'),
            typeInfo: LIFT13.Citation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT13.Phonetic
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'variant',
            collection: true,
            elementName: new Jsonix.XML.QName('variant'),
            typeInfo: LIFT13.Variant
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'sense',
            collection: true,
            elementName: new Jsonix.XML.QName('sense'),
            typeInfo: LIFT13.SenseContent
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT13.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT13.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'etymology',
            collection: true,
            elementName: new Jsonix.XML.QName('etymology'),
            typeInfo: LIFT13.Etymology
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
        LIFT13.Lift.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'header',
            elementName: new Jsonix.XML.QName('header'),
            typeInfo: LIFT13.Header
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'entry',
            collection: true,
            elementName: new Jsonix.XML.QName('entry'),
            typeInfo: LIFT13.Entry
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
        LIFT13.Example.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT13.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT13.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT13.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT13.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT13.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'translation',
            collection: true,
            elementName: new Jsonix.XML.QName('translation'),
            typeInfo: LIFT13.Translation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT13.Note
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
LIFT13.Mappings.elementInfos = [
    {
        elementName: new Jsonix.XML.QName('range'),
        typeInfo: LIFT13.Range
    },
    {
        elementName: new Jsonix.XML.QName('description'),
        typeInfo: LIFT13.Description
    },
    {
        elementName: new Jsonix.XML.QName('form'),
        typeInfo: LIFT13.Form
    },
    {
        elementName: new Jsonix.XML.QName('text'),
        typeInfo: LIFT13.Text
    },
    {
        elementName: new Jsonix.XML.QName('span'),
        typeInfo: LIFT13.Span
    },
    {
        elementName: new Jsonix.XML.QName('annotation'),
        typeInfo: LIFT13.Annotation
    },
    {
        elementName: new Jsonix.XML.QName('label'),
        typeInfo: LIFT13.Label
    },
    {
        elementName: new Jsonix.XML.QName('abbrev'),
        typeInfo: LIFT13.Abbrev
    },
    {
        elementName: new Jsonix.XML.QName('range-element'),
        typeInfo: LIFT13.RangeElement
    },
    {
        elementName: new Jsonix.XML.QName('translation'),
        typeInfo: LIFT13.Translation
    },
    {
        elementName: new Jsonix.XML.QName('illustration'),
        typeInfo: LIFT13.Illustration
    },
    {
        elementName: new Jsonix.XML.QName('ranges'),
        typeInfo: LIFT13.Ranges
    },
    {
        elementName: new Jsonix.XML.QName('variant'),
        typeInfo: LIFT13.Variant
    },
    {
        elementName: new Jsonix.XML.QName('trait'),
        typeInfo: LIFT13.Trait
    },
    {
        elementName: new Jsonix.XML.QName('pronunciation'),
        typeInfo: LIFT13.Phonetic
    },
    {
        elementName: new Jsonix.XML.QName('media'),
        typeInfo: LIFT13.Media
    },
    {
        elementName: new Jsonix.XML.QName('relation'),
        typeInfo: LIFT13.Relation
    },
    {
        elementName: new Jsonix.XML.QName('usage'),
        typeInfo: LIFT13.Usage
    },
    {
        elementName: new Jsonix.XML.QName('lexical-unit'),
        typeInfo: LIFT13.LexicalUnit
    },
    {
        elementName: new Jsonix.XML.QName('note'),
        typeInfo: LIFT13.Note
    },
    {
        elementName: new Jsonix.XML.QName('reversal'),
        typeInfo: LIFT13.Reversal
    },
    {
        elementName: new Jsonix.XML.QName('main'),
        typeInfo: LIFT13.Main
    },
    {
        elementName: new Jsonix.XML.QName('grammatical-info'),
        typeInfo: LIFT13.GrammaticalInfo
    },
    {
        elementName: new Jsonix.XML.QName('fields'),
        typeInfo: LIFT13.Fields
    },
    {
        elementName: new Jsonix.XML.QName('citation'),
        typeInfo: LIFT13.Citation
    },
    {
        elementName: new Jsonix.XML.QName('etymology'),
        typeInfo: LIFT13.Etymology
    },
    {
        elementName: new Jsonix.XML.QName('gloss'),
        typeInfo: LIFT13.Gloss
    },
    {
        elementName: new Jsonix.XML.QName('definition'),
        typeInfo: LIFT13.Definition
    },
    {
        elementName: new Jsonix.XML.QName('header'),
        typeInfo: LIFT13.Header
    },
    {
        elementName: new Jsonix.XML.QName('entry'),
        typeInfo: LIFT13.Entry
    },
    {
        elementName: new Jsonix.XML.QName('lift'),
        typeInfo: LIFT13.Lift
    },
    {
        elementName: new Jsonix.XML.QName('example'),
        typeInfo: LIFT13.Example
    },
    {
        elementName: new Jsonix.XML.QName('sense'),
        typeInfo: LIFT13.SenseContent
    },
    {
        elementName: new Jsonix.XML.QName('subsense'),
        typeInfo: LIFT13.SenseContent
    }
];