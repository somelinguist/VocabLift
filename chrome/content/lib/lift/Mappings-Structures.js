{
    {
        LIFT.Range.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT.Abbrev
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'rangeElement',
            collection: true,
            elementName: new Jsonix.XML.QName('range-element'),
            typeInfo: LIFT.RangeElement
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
        LIFT.Description.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.Form.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT.Text.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT.Span
        })];
    }
    {
        LIFT.Span.properties = [new Jsonix.Model.ElementRefPropertyInfo({
            name: 'content',
            collection: true,
            mixed: true,
            elementName: new Jsonix.XML.QName('span'),
            typeInfo: LIFT.Span
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
        LIFT.Annotation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
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
        LIFT.Label.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.Abbrev.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.RangeElement.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT.Label
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'abbrev',
            elementName: new Jsonix.XML.QName('abbrev'),
            typeInfo: LIFT.Abbrev
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
        LIFT.Translation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT.Illustration.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT.Ranges.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'range',
            collection: true,
            elementName: new Jsonix.XML.QName('range'),
            typeInfo: LIFT.Range
        })];
    }
    {
        LIFT.LiftRanges.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'range',
            collection: true,
            elementName: new Jsonix.XML.QName('range'),
            typeInfo: LIFT.Range
        })];
    }
    {
        LIFT.Variant.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT.Pronunciation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT.Relation
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
        LIFT.Trait.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
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
        LIFT.Field.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
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
        LIFT.Pronunciation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'media',
            collection: true,
            elementName: new Jsonix.XML.QName('media'),
            typeInfo: LIFT.Media
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
        LIFT.Media.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'label',
            elementName: new Jsonix.XML.QName('label'),
            typeInfo: LIFT.Label
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'href',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('href')
        })];
    }
    {
        LIFT.Relation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'usage',
            elementName: new Jsonix.XML.QName('usage'),
            typeInfo: LIFT.Usage
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
        LIFT.Usage.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.LexicalUnit.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.Note.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
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
        LIFT.Reversal.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT.GrammaticalInfo
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LIFT.Main.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'main',
            elementName: new Jsonix.XML.QName('main'),
            typeInfo: LIFT.Main
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT.GrammaticalInfo
        })];
    }
    {
        LIFT.GrammaticalInfo.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LIFT.Fields.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        })];
    }
    {
        LIFT.Field.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'tag',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('tag')
        })];
    }
    {
        LIFT.Citation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.Etymology.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT.Gloss
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
        LIFT.Gloss.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'text',
            elementName: new Jsonix.XML.QName('text'),
            typeInfo: LIFT.Text
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'lang',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('lang')
        })];
    }
    {
        LIFT.Definition.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        })];
    }
    {
        LIFT.SenseContent.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'grammaticalInfo',
            elementName: new Jsonix.XML.QName('grammatical-info'),
            typeInfo: LIFT.GrammaticalInfo
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'gloss',
            collection: true,
            elementName: new Jsonix.XML.QName('gloss'),
            typeInfo: LIFT.Gloss
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'definition',
            elementName: new Jsonix.XML.QName('definition'),
            typeInfo: LIFT.Definition
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'example',
            collection: true,
            elementName: new Jsonix.XML.QName('example'),
            typeInfo: LIFT.Example
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'reversal',
            collection: true,
            elementName: new Jsonix.XML.QName('reversal'),
            typeInfo: LIFT.Reversal
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'illustration',
            collection: true,
            elementName: new Jsonix.XML.QName('illustration'),
            typeInfo: LIFT.Illustration
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'subsense',
            collection: true,
            elementName: new Jsonix.XML.QName('subsense'),
            typeInfo: LIFT.SenseContent
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
        LIFT.Header.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'description',
            elementName: new Jsonix.XML.QName('description'),
            typeInfo: LIFT.Description
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'ranges',
            elementName: new Jsonix.XML.QName('ranges'),
            typeInfo: LIFT.Ranges
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fields',
            elementName: new Jsonix.XML.QName('fields'),
            typeInfo: LIFT.Fields
        })];
    }
    {
        LIFT.Entry.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'lexicalUnit',
            elementName: new Jsonix.XML.QName('lexical-unit'),
            typeInfo: LIFT.LexicalUnit
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'citation',
            elementName: new Jsonix.XML.QName('citation'),
            typeInfo: LIFT.Citation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'pronunciation',
            collection: true,
            elementName: new Jsonix.XML.QName('pronunciation'),
            typeInfo: LIFT.Pronunciation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'variant',
            collection: true,
            elementName: new Jsonix.XML.QName('variant'),
            typeInfo: LIFT.Variant
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'sense',
            collection: true,
            elementName: new Jsonix.XML.QName('sense'),
            typeInfo: LIFT.SenseContent
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT.Note
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'relation',
            collection: true,
            elementName: new Jsonix.XML.QName('relation'),
            typeInfo: LIFT.Relation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'etymology',
            collection: true,
            elementName: new Jsonix.XML.QName('etymology'),
            typeInfo: LIFT.Etymology
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
        LIFT.Lift.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'header',
            elementName: new Jsonix.XML.QName('header'),
            typeInfo: LIFT.Header
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'entry',
            collection: true,
            elementName: new Jsonix.XML.QName('entry'),
            typeInfo: LIFT.Entry
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
        LIFT.Example.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'form',
            collection: true,
            elementName: new Jsonix.XML.QName('form'),
            typeInfo: LIFT.Form
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'annotation',
            collection: true,
            elementName: new Jsonix.XML.QName('annotation'),
            typeInfo: LIFT.Annotation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'trait',
            collection: true,
            elementName: new Jsonix.XML.QName('trait'),
            typeInfo: LIFT.Trait
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'field',
            collection: true,
            elementName: new Jsonix.XML.QName('field'),
            typeInfo: LIFT.Field
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'translation',
            collection: true,
            elementName: new Jsonix.XML.QName('translation'),
            typeInfo: LIFT.Translation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'note',
            collection: true,
            elementName: new Jsonix.XML.QName('note'),
            typeInfo: LIFT.Note
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
LIFT.Mappings.elementInfos = [
    {
        elementName: new Jsonix.XML.QName('range'),
        typeInfo: LIFT.Range
    },
    {
        elementName: new Jsonix.XML.QName('description'),
        typeInfo: LIFT.Description
    },
    {
        elementName: new Jsonix.XML.QName('form'),
        typeInfo: LIFT.Form
    },
    {
        elementName: new Jsonix.XML.QName('text'),
        typeInfo: LIFT.Text
    },
    {
        elementName: new Jsonix.XML.QName('span'),
        typeInfo: LIFT.Span
    },
    {
        elementName: new Jsonix.XML.QName('annotation'),
        typeInfo: LIFT.Annotation
    },
    {
        elementName: new Jsonix.XML.QName('label'),
        typeInfo: LIFT.Label
    },
    {
        elementName: new Jsonix.XML.QName('abbrev'),
        typeInfo: LIFT.Abbrev
    },
    {
        elementName: new Jsonix.XML.QName('range-element'),
        typeInfo: LIFT.RangeElement
    },
    {
        elementName: new Jsonix.XML.QName('translation'),
        typeInfo: LIFT.Translation
    },
    {
        elementName: new Jsonix.XML.QName('illustration'),
        typeInfo: LIFT.Illustration
    },
    {
        elementName: new Jsonix.XML.QName('lift-ranges'),
        typeInfo: LIFT.LiftRanges
    },
    {
        elementName: new Jsonix.XML.QName('ranges'),
        typeInfo: LIFT.Ranges
    },
    {
        elementName: new Jsonix.XML.QName('variant'),
        typeInfo: LIFT.Variant
    },
    {
        elementName: new Jsonix.XML.QName('trait'),
        typeInfo: LIFT.Trait
    },
    {
        elementName: new Jsonix.XML.QName('pronunciation'),
        typeInfo: LIFT.Pronunciation
    },
    {
        elementName: new Jsonix.XML.QName('media'),
        typeInfo: LIFT.Media
    },
    {
        elementName: new Jsonix.XML.QName('relation'),
        typeInfo: LIFT.Relation
    },
    {
        elementName: new Jsonix.XML.QName('usage'),
        typeInfo: LIFT.Usage
    },
    {
        elementName: new Jsonix.XML.QName('lexical-unit'),
        typeInfo: LIFT.LexicalUnit
    },
    {
        elementName: new Jsonix.XML.QName('note'),
        typeInfo: LIFT.Note
    },
    {
        elementName: new Jsonix.XML.QName('reversal'),
        typeInfo: LIFT.Reversal
    },
    {
        elementName: new Jsonix.XML.QName('main'),
        typeInfo: LIFT.Main
    },
    {
        elementName: new Jsonix.XML.QName('grammatical-info'),
        typeInfo: LIFT.GrammaticalInfo
    },
    {
        elementName: new Jsonix.XML.QName('fields'),
        typeInfo: LIFT.Fields
    },
    {
        elementName: new Jsonix.XML.QName('citation'),
        typeInfo: LIFT.Citation
    },
    {
        elementName: new Jsonix.XML.QName('etymology'),
        typeInfo: LIFT.Etymology
    },
    {
        elementName: new Jsonix.XML.QName('gloss'),
        typeInfo: LIFT.Gloss
    },
    {
        elementName: new Jsonix.XML.QName('definition'),
        typeInfo: LIFT.Definition
    },
    {
        elementName: new Jsonix.XML.QName('header'),
        typeInfo: LIFT.Header
    },
    {
        elementName: new Jsonix.XML.QName('entry'),
        typeInfo: LIFT.Entry
    },
    {
        elementName: new Jsonix.XML.QName('lift'),
        typeInfo: LIFT.Lift
    },
    {
        elementName: new Jsonix.XML.QName('example'),
        typeInfo: LIFT.Example
    },
    {
        elementName: new Jsonix.XML.QName('sense'),
        typeInfo: LIFT.SenseContent
    },
    {
        elementName: new Jsonix.XML.QName('subsense'),
        typeInfo: LIFT.SenseContent
    }
];