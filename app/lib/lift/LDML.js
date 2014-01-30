if (typeof LDML === 'undefined') {
    LDML = {};
}
if (!LDML.Mappings) {
    LDML.Mappings = {};
}
LDML.Ldml = new Jsonix.Model.ClassInfo({
    name: 'LDML.Ldml'
});
LDML.Identity = new Jsonix.Model.ClassInfo({
    name: 'LDML.Identity'
});
LDML.Version = new Jsonix.Model.ClassInfo({
    name: 'LDML.Version'
});
LDML.Generation = new Jsonix.Model.ClassInfo({
    name: 'LDML.Generation'
});
LDML.Language = new Jsonix.Model.ClassInfo({
    name: 'LDML.Language'
});
LDML.Territory = new Jsonix.Model.ClassInfo({
    name: 'LDML.Territory'
});
LDML.Script = new Jsonix.Model.ClassInfo({
    name: 'LDML.Script'
});
LDML.Variant = new Jsonix.Model.ClassInfo({
    name: 'LDML.Variant'
});
LDML.Collations = new Jsonix.Model.ClassInfo({
    name: 'LDML.Collations'
});
LDML.Collation = new Jsonix.Model.ClassInfo({
    name: 'LDML.Collation'
});
LDML.Rules = new Jsonix.Model.ClassInfo({
    name: 'LDML.Rules'
});
LDML.Base = new Jsonix.Model.ClassInfo({
    name: 'LDML.Base'
});
LDML.Alias = new Jsonix.Model.ClassInfo({
    name: 'LDML.Alias'
});
LDML.Special = new Jsonix.Model.ClassInfo({
    name: 'LDML.Special'
});
LDML.PalasoAbbreviation = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoAbbreviation'
});
LDML.PalasoDefaultFontFamily = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoDefaultFontFamily'
});
LDML.PalasoLanguageName = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoLanguageName'
});
LDML.PalasoVersion = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoVersion'
});
LDML.PalasoSortRulesType = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoSortRulesType'
});
LDML.PalasoDefaultKeyboard = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoDefaultKeyboard'
});
LDML.PalasoKnownKeyboards = new Jsonix.Model.ClassInfo({
    name: 'LDML.KnownKeyboards'
});
LDML.PalasoKeyboard = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoKeyboard'
});
LDML.PalasoSpellCheckingId = new Jsonix.Model.ClassInfo({
    name: 'LDML.PalasoSpellCheckingId'
});
LDML.FWGraphiteEnabled = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWGraphiteEnabled'
});
LDML.FWRegionName = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWRegionName'
});
LDML.FWScriptName = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWScriptName'
});
LDML.FWMatchedPairs = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWMatchedPairs'
});
LDML.FWPunctuationPatterns = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWPunctuationPatterns'
});
LDML.FWQuotationMarks = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWQuotationMarks'
});
LDML.FWValidChars = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWValidChars'
});
LDML.FWWindowsLCID = new Jsonix.Model.ClassInfo({
    name: 'LDML.FWWindowsLCID'
});
LDML.FWDefaultFontFeatures = new Jsonix.Model.ClassInfo({
    name: 'LDML.DefaultFontFeatures'
});
{
    {
        LDML.Ldml.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'identity',
            elementName: new Jsonix.XML.QName('identity'),
            typeInfo: LDML.Identity
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'collations',
            elementName: new Jsonix.XML.QName('collations'),
            typeInfo: LDML.Collations
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'special',
            collection: true,
            elementName: new Jsonix.XML.QName('special'),
            typeInfo: LDML.Special
        })];
    }
    {
        LDML.Identity.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'version',
            elementName: new Jsonix.XML.QName('version'),
            typeInfo: LDML.Version
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'generation',
            elementName: new Jsonix.XML.QName('generation'),
            typeInfo: LDML.Generation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'language',
            elementName: new Jsonix.XML.QName('language'),
            typeInfo: LDML.Language
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'territory',
            elementName: new Jsonix.XML.QName('territory'),
            typeInfo: LDML.Territory
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'script',
            elementName: new Jsonix.XML.QName('script'),
            typeInfo: LDML.Script
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'variant',
            elementName: new Jsonix.XML.QName('variant'),
            typeInfo: LDML.Variant
        })];
    }
    {
        LDML.Version.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'number',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('number')
        })];
    }
    {
        LDML.Generation.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'date',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('date')
        })];
    }
    {
        LDML.Language.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LDML.Variant.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'type',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('type')
        })];
    }
    {
        LDML.Collations.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'collation',
            collection: true,
            elementName: new Jsonix.XML.QName('collation'),
            typeInfo: LDML.Collation
        })];
    }
    {
        LDML.Collation.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'base',
            elementName: new Jsonix.XML.QName('base'),
            typeInfo: LDML.Base
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'rules',
            elementName: new Jsonix.XML.QName('rules'),
            typeInfo: LDML.Rules
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'special',
            elementName: new Jsonix.XML.QName('special'),
            typeInfo: LDML.Special
        })];
    }
    {
        LDML.Base.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'alias',
            collection: true,
            elementName: new Jsonix.XML.QName('alias'),
            typeInfo: LDML.Alias
        })];
    }
    {
        LDML.Rules.properties = [new Jsonix.Model.AnyElementPropertyInfo({
            // Name of the property
            name: "any",
            // Whether the property is collection or not, defaults to false
            collection: false,
            // Whether the property allows DOM nodes, default to true
            allowDom: true,
            // Whether the property allows typed objects, default to true
            allowTypedObject: true,
            // If the property is a mixed property, default to true
            mixed: true
        })];
    }
    {
        LDML.Alias.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'source',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('source')
        })];
    }
    {
        LDML.Special.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoAbbreviation',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'abbreviation'),
            typeInfo: LDML.PalasoAbbreviation
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoDefaultFontFamily',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'defaultFontFamily'),
            typeInfo: LDML.PalasoDefaultFontFamily
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoLanguageName',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'languageName'),
            typeInfo: LDML.PalasoLanguageName
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoVersion',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'version'),
            typeInfo: LDML.PalasoVersion
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoVersion',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'version'),
            typeInfo: LDML.PalasoVersion
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoSortRulesType',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'sortRulesType'),
            typeInfo: LDML.PalasoSortRulesType
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoDefaultKeyboard',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'defaultKeyboard'),
            typeInfo: LDML.PalasoDefautlKeyboard
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoKnownKeyboards',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'knownKeyboards'),
            typeInfo: LDML.PalasoKnownKeyboards
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'palasoSpellCheckingId',
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'spellCheckingId'),
            typeInfo: LDML.PalasoSpellCheckingId
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwGraphiteEnabled',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'graphiteEnabled'),
            typeInfo: LDML.FWGraphiteEnabled
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwRegionName',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'regionName'),
            typeInfo: LDML.FWRegionName
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwScriptName',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'scriptName'),
            typeInfo: LDML.FWScriptName
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwMatchedPairs',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'matchedPairs'),
            typeInfo: LDML.FWMatchedPairs
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwPunctuationPatterns',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'punctuationPatterns'),
            typeInfo: LDML.FWPunctuationPatterns
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwQuotationMarks',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'quotationMarks'),
            typeInfo: LDML.FWQuotationMarks
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwValidChars',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'validChars'),
            typeInfo: LDML.FWValidChars
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwWindowsLCID',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'windowsLCID'),
            typeInfo: LDML.FWWindowsLCID
        }), new Jsonix.Model.ElementPropertyInfo({
            name: 'fwDefaultFontFeatures',
            elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'defaultFontFeatures'),
            typeInfo: LDML.FWDefaultFontFeatures
        })];
    }
    {
        LDML.PalasoAbbreviation.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoDefaultFontFamily.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoLanguageName.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoVersion.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoSortRulesType.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoDefaultKeyboard.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.PalasoKnownKeyboards.properties = [new Jsonix.Model.ElementPropertyInfo({
            name: 'keyboard',
            collection: true,
            elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'keyboard'),
            typeInfo: LDML.PalasoKeyboard
        })];
    }
    {
        LDML.PalasoKeyboard.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'layout',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('layout')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'locale',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('locale')
        }), new Jsonix.Model.AttributePropertyInfo({
            name: 'os',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('os')
        })];
    }
    {
        LDML.FWGraphiteEnabled.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWRegionName.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWScriptName.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWMatchedPairs.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWPunctuationPatterns.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWQuotationMarks.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWValidChars.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
    {
        LDML.FWWindowsLCID.properties = [new Jsonix.Model.AttributePropertyInfo({
            name: 'value',
            typeInfo: Jsonix.Schema.XSD.String.INSTANCE,
            attributeName: new Jsonix.XML.QName('value')
        })];
    }
}
LDML.Mappings.elementInfos = [
    {
        elementName: new Jsonix.XML.QName('ldml'),
        typeInfo: LDML.Ldml
    },
    {
        elementName: new Jsonix.XML.QName('identity'),
        typeInfo: LDML.Identity
    },
    {
        elementName: new Jsonix.XML.QName('version'),
        typeInfo: LDML.Version
    },
    {
        elementName: new Jsonix.XML.QName('generation'),
        typeInfo: LDML.Generation
    },
    {
        elementName: new Jsonix.XML.QName('language'),
        typeInfo: LDML.Language
    },
    {
        elementName: new Jsonix.XML.QName('territory'),
        typeInfo: LDML.Territory
    },
    {
        elementName: new Jsonix.XML.QName('script'),
        typeInfo: LDML.Script
    },
    {
        elementName: new Jsonix.XML.QName('variant'),
        typeInfo: LDML.Variant
    },
    {
        elementName: new Jsonix.XML.QName('collations'),
        typeInfo: LDML.Collations
    },
    {
        elementName: new Jsonix.XML.QName('collation'),
        typeInfo: LDML.Collation
    },
    {
        elementName: new Jsonix.XML.QName('rules'),
        typeInfo: LDML.Rules
    },
    {
        elementName: new Jsonix.XML.QName('base'),
        typeInfo: LDML.Base
    },
    {
        elementName: new Jsonix.XML.QName('alias'),
        typeInfo: LDML.Alias
    },
    {
        elementName: new Jsonix.XML.QName('special'),
        typeInfo: LDML.Special
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'abbreviation'),
        typeInfo: LDML.PalasoAbbreviation
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'defaultFontFamily'),
        typeInfo: LDML.PalasoDefaultFontFamily
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'languageName'),
        typeInfo: LDML.PalasoLanguageName
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'version'),
        typeInfo: LDML.PalasoVersion
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'sortRulesType'),
        typeInfo: LDML.PalasoSortRulesType
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'spellCheckingId'),
        typeInfo: LDML.PalasoSpellCheckingId
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v1', 'defaultKeyboard'),
        typeInfo: LDML.PalasoDefaultKeyboard
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'knownKeyboards'),
        typeInfo: LDML.PalasoKnownKeyboards
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'keyboard'),
        typeInfo: LDML.PalasoKeyboard
    },
    {
        elementName: new Jsonix.XML.QName('urn://palaso.org/ldmlExtensions/v2', 'version'),
        typeInfo: LDML.PalasoVersion
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'graphiteEnabled'),
        typeInfo: LDML.FWGraphiteEnabled
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'regionName'),
        typeInfo: LDML.FWRegionName
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'scriptName'),
        typeInfo: LDML.FWScriptName
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'matchedPairs'),
        typeInfo: LDML.FWMatchedPairs
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'punctuationPatterns'),
        typeInfo: LDML.FWPunctuationPatterns
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'quotationMarks'),
        typeInfo: LDML.FWQuotationMarks
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'validChars'),
        typeInfo: LDML.FWValidChars
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'windowsLCID'),
        typeInfo: LDML.FWWindowsLCID
    },
    {
        elementName: new Jsonix.XML.QName('urn://fieldworks.sil.org/ldmlExtensions/v1', 'defaultFontFeatures'),
        typeInfo: LDML.FWDefaultFontFeatures
    }
];