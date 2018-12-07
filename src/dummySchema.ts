export default {
  data: {
    __schema: {
      queryType: {
        name: "Query"
      },
      mutationType: null,
      subscriptionType: null,
      types: [
        {
          kind: "OBJECT",
          name: "Query",
          description: null,
          fields: [
            {
              name: "characters",
              description: "Fetches a list of characters.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "CharacterWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "CharacterOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Character",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getCharacter",
              description: "Fetches a single character by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "CharacterWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Character",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description: "Fetches a list of comics.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "ComicWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "ComicOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Comic",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getComic",
              description: "Fetches a single comic by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "ComicWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Comic",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "creators",
              description: "Fetches a list of creators.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "CreatorWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "CreatorOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Creator",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getCreator",
              description: "Fetches a single creator by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "CreatorWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Creator",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description: "Fetches a list of events.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "EventsWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "EventsOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Event",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getEvent",
              description: "Fetches a single event by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "EventsWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Event",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description: "Fetches a list of series.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "SeriesWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "SeriesOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Series",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getSeries",
              description: "Fetches a single series by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "SeriesWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Series",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description: "Fetches a list of stories.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "StoriesWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "orderBy",
                  description: "",
                  type: {
                    kind: "ENUM",
                    name: "StoriesOrderBy",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "offset",
                  description:
                    "Skips the specified number of resources in the result set.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                },
                {
                  name: "limit",
                  description:
                    "Limit the result set to the specified number of resources.",
                  type: {
                    kind: "SCALAR",
                    name: "Int",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Story",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "getStory",
              description: "Fetches a single story by id.",
              args: [
                {
                  name: "where",
                  description: "",
                  type: {
                    kind: "INPUT_OBJECT",
                    name: "StoriesWhereInput",
                    ofType: null
                  },
                  defaultValue: null
                }
              ],
              type: {
                kind: "OBJECT",
                name: "Story",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "CharacterWhereInput",
          description:
            "Optional filters for characters. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "id",
              description: "Returns only characters matching the specified id",
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "name",
              description:
                "Returns only characters matching the specified full character name (e.g. Spider-Man).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "nameStartsWith",
              description:
                "Returns characters with names that begin with the specified string (e.g. Sp).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "modifiedSince",
              description:
                "Returns only characters which have been modified since the specified date.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "comics",
              description:
                "Returns only characters which appear in the specified comics (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "series",
              description:
                "Returns only characters which appear the specified series (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "events",
              description:
                "Returns only characters which appear in the specified events (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "stories",
              description:
                "Returns only characters which appear the specified stories (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "Int",
          description:
            "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. ",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "String",
          description:
            "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "ID",
          description:
            'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "CharacterOrderBy",
          description:
            "Orders the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "name_asc",
              description:
                "Returns character in A-Z order (i.e 3-D Man, A-Bomb (HAS), A.I.M, etc...)",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "name_desc",
              description: "Returns character in Z-A order (i.e , etc...)",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description:
                "Returns character's modification date in ascending order",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description:
                "Returns character's modification date in descending order",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Character",
          description: "A character resource in the Marvel universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the character resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "name",
              description: "The name of the character.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description:
                "The url path of to the image related to the character.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: "A short bio or description of the character.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "The date the resource was most recently modified.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "urls",
              description: "A set of public web site URLs for the resource.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "MarvelUrl",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description: "Lists of comics filtered by a character id.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description: "Lists of series filtered by a character id.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description: "Lists of events filtered by a character id.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description: "Lists of stories filtered by a character id.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INTERFACE",
          name: "MarvelNode",
          description:
            "An interface for common patterns found from the Marvel API",
          fields: [
            {
              name: "id",
              description: "A unique ID to a particular marvel resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for a resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description: "The url path for a canonical photo to the resource",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "A date for which the resource has been modified",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: [
            {
              kind: "OBJECT",
              name: "Character",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Comic",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Creator",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Event",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Series",
              ofType: null
            },
            {
              kind: "OBJECT",
              name: "Story",
              ofType: null
            }
          ]
        },
        {
          kind: "OBJECT",
          name: "MarvelUrl",
          description:
            "An object representing a url resource commonly found within Marvel's Api",
          fields: [
            {
              name: "type",
              description: "A text identifier for the URL.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "url",
              description: "A full URL (including scheme, domain, and path).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Summary",
          description:
            "Marvel Summary types for displaying relational types (i.e characters featured within a comic )",
          fields: [
            {
              name: "resourceURI",
              description:
                "The canonical URL identifier for this summary resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "name",
              description: "",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "role",
              description: "",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "type",
              description: "",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "ComicWhereInput",
          description:
            "Optional filters for comics. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "format",
              description:
                "Filter by the issue format (e.g. comic, digital comic, hardcover).",
              type: {
                kind: "ENUM",
                name: "ComicFormat",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "formatType",
              description:
                "Filter by the issue format type (comic or collection).",
              type: {
                kind: "ENUM",
                name: "ComicFormatType",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "noVariants",
              description:
                "Exclude variants (alternate covers, secondary printings, director's cuts, etc.) from the result set.",
              type: {
                kind: "SCALAR",
                name: "Boolean",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "dateDescriptor",
              description: "Return comics within a predefined date range.",
              type: {
                kind: "ENUM",
                name: "DateDescriptor",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "dateRange",
              description:
                "Returns comics within a predefined date range. Dates must be specified as date1,date2 (e.g. 2013-01-01,2013-01-02). Dates are preferably formatted as YYYY-MM-DD but may be sent as any common date format.",
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "diamondCode",
              description: "Filter by diamond code.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "digitalId",
              description: "Filter by digital comic id.",
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "upc",
              description: "Filter by UPC.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "isbn",
              description: "Filter by ISBN.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "ean",
              description: "Filter by EAN.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "issn",
              description: "Filter by ISSN.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "hasDigitalIssue",
              description:
                "Include only results which are available digitally.",
              type: {
                kind: "SCALAR",
                name: "Boolean",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "modifiedSince",
              description:
                "Return only comics which have been modified since the specified date.",
              type: {
                kind: "SCALAR",
                name: "DateTime",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "creators",
              description:
                "Return only comics which feature work by the specified creators (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "characters",
              description:
                "Return only comics which feature the specified characters (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "series",
              description:
                "Return only comics which are part of the specified series (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "events",
              description:
                "Return only comics which take place in the specified events (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "stories",
              description:
                "Return only comics which contain the specified stories (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "sharedAppearances",
              description:
                "Return only comics in which the specified characters appear together (for example in which BOTH Spider-Man and Wolverine appear). Accepts a comma-separated list of ids.",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "collaborators",
              description:
                "Return only comics in which the specified creators worked together (for example in which BOTH Stan Lee and Jack Kirby did work). Accepts a comma-separated list of ids.",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "ComicFormat",
          description:
            "Return only series containing one or more comics with the specified format.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "magazine",
              description:
                "Return only series containing one or more comics with the specified format of a magazine.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "trade_paperback",
              description:
                "Return only series containing one or more comics with the specified format of a trade paperback.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "hardcover",
              description:
                "Return only series containing one or more comics with the specified format of a hardcover.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "digest",
              description:
                "Return only series containing one or more comics with the specified format of a digest.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "graphic_novel",
              description:
                "Return only series containing one or more comics with the specified format of a graphic novel.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comic",
              description:
                "Return only series containing one or more comics with the specified format of a comic.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "digital_comic",
              description:
                "Return only series containing one or more comics with the specified format of a digital comic.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "infinite_comic",
              description:
                "Return only series containing one or more comics with the specified format of an infinite comic.",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "ComicFormatType",
          description: "Filter by the issue format type (comic or collection).",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "comic",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "collection",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "Boolean",
          description:
            "The `Boolean` scalar type represents `true` or `false`.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "DateDescriptor",
          description: "Returns a resource within a predefined date range.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "lastWeek",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thisWeek",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "nextWeek",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thisMonth",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "SCALAR",
          name: "DateTime",
          description: "",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "ComicOrderBy",
          description:
            "Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "focDate_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "onSaleDate_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "issueNumber_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "focDate_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "onSaleDate_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "issueNumber_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Comic",
          description: "A comic resource within the Marvel Universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the comic resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "digitalId",
              description:
                "The ID of the digital comic representation of this comic. Will be 0 if the comic is not available digitally.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title",
              description: "The canonical title of the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "issueNumber",
              description:
                "The number of the issue in the series (will generally be 0 for collection formats).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "variantDescription",
              description:
                "If the issue is a variant (e.g. an alternate cover, second printing, or director’s cut), a text description of the variant.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: "The preferred description of the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "The date the resource was most recently modified.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "isbn",
              description:
                "The ISBN for the comic (generally only populated for collection formats).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "upc",
              description:
                "The UPC barcode number for the comic (generally only populated for periodical formats)",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "diamondCode",
              description: "The Diamond code for the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ean",
              description: "The EAN barcode for the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "issn",
              description: "The ISSN barcode for the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "format",
              description:
                "The publication format of the comic e.g. comic, hardcover, trade paperback.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "textObjects",
              description: "A set of descriptive text blurbs for the comic.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "TextObject",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "urls",
              description: "A set of public web site URLs for the resource.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "MarvelUrl",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description: "A list of series (Summary Types) to this comic",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "variants",
              description:
                'A list of variant issues for this comic (includes the "original" issue if the current issue is a variant)',
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "collections",
              description:
                "A list of collections which include this comic (will generally be empty if the comic's format is a collection).",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "collectedIssues",
              description:
                'A list of issues collected in this comic (will generally be empty for periodical formats such as "comic" or magazine").',
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "dates",
              description: "A list of key dates for this comic.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "ComicDate",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "prices",
              description: "A list of prices for this comic.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "ComicPrice",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description: "The url path of to the image related to the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "images",
              description:
                "A list of promotional images associated with this comic.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "ComicImage",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "characters",
              description: "A list of characters (Summary Types) to this comic",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description:
                "A list of events (Summary Types) related to this comic",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description:
                "A list of stories (Summary Types) related to this comic",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "creators",
              description:
                "A list of creators (Summary Types) related to this comic",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "TextObject",
          description:
            "An object representing metadata for a resource commonly found within Marvel's Api",
          fields: [
            {
              name: "type",
              description:
                "The canonical type of the text object (e.g. solicit text, preview text, etc.).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "language",
              description:
                "The IETF language tag denoting the language the text object is written in.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "text",
              description: "The text.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "ComicDate",
          description: "An object representing a comic's date.",
          fields: [
            {
              name: "type",
              description:
                "A description of the date (e.g. onsale date, FOC date).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "date",
              description: "The date",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "ComicPrice",
          description: "An object representing a comic's price",
          fields: [
            {
              name: "type",
              description:
                "A description of the price (e.g. print price, digital price).",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "price",
              description: "The price of the comic resource",
              args: [],
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "ComicImage",
          description: "An object representing a comic's image.",
          fields: [
            {
              name: "path",
              description: "A file path to the resources image",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "extension",
              description: "The file extension for the resource image",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "CreatorWhereInput",
          description:
            "Optional filters for creators. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "firstName",
              description: "Filter by creator first name (e.g. Brian).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "middleName",
              description: "Filter by creator middle name (e.g. Michael).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "lastName",
              description: "Filter by creator last name (e.g. Bendis).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "suffix",
              description: "Filter by suffix or honorific (e.g. Jr., Sr.).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "nameStartsWith",
              description:
                "Filter by creator names that match critera (e.g. B, St L).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "firstNameStartsWith",
              description:
                "Filter by creator first names that match critera (e.g. B, St L).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "middleNameStartsWith",
              description:
                "Filter by creator middle names that match critera (e.g. Mi).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "lastNameStartsWith",
              description:
                "Filter by creator last names that match critera (e.g. Ben).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "modifiedSince",
              description:
                "Return only creators which have been modified since the specified date.",
              type: {
                kind: "SCALAR",
                name: "DateTime",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "comics",
              description:
                "Return only creators who worked on in the specified comics (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "series",
              description:
                "Return only creators who worked on the specified series (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "events",
              description:
                "Return only creators who worked on comics that took place in the specified events (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "stories",
              description:
                "Return only creators who worked on the specified stories (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "CreatorOrderBy",
          description:
            "Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "lastName_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "firstName_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "middleName_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "suffix_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "lastName_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "firstName_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "middleName_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "suffix_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Creator",
          description: "A creator resource within the Marvel Universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the creator resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "firstName",
              description: "The first name of the creator",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "middleName",
              description: "The middle name of the creator",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "lastName",
              description: "The last name of the creator",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "suffix",
              description: "The suffix of the creator",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "fullName",
              description: "The full name of the creator",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description:
                "The date for which the creator resource was last modified",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "urls",
              description: "A set of public web site URLs for the resource.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "MarvelUrl",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description:
                "The url path of to the image related to the creator.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description:
                "A list of series (Summary Types) related to this creator",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description:
                "A list of stories (Summary Types) related to this creator",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description:
                "A list of comics (Summary Types) related to this creator",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description:
                "A list of events (Summary Types) related to this creator",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "EventsWhereInput",
          description:
            "Optional filters for events. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "name",
              description: "Return only events which match the specified name.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "nameStartsWith",
              description:
                "Return events with names that begin with the specified string (e.g. Sp).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "modifiedSince",
              description:
                "Return only events which have been modified since the specified date.",
              type: {
                kind: "SCALAR",
                name: "DateTime",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "creators",
              description:
                "Return only events which feature work by the specified creators (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "characters",
              description:
                "Return only events which feature the specified characters (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "series",
              description:
                "Return only events which are part of the specified series (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "comics",
              description:
                "Return only events which take place in the specified comics (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "EventsOrderBy",
          description:
            "Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "name_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "startDate_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "name_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "startDate_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Event",
          description: "An event resource within the Marvel Universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the event resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title",
              description: "The title of the event.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: "A description of the event.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "urls",
              description: "A set of public web site URLs for the resource.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "MarvelUrl",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "The date the resource was most recently modified.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "start",
              description:
                "The date of publication of the first issue in this event.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "end",
              description:
                "The date of publication of the last issue in this event.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description: "The url path of to the image related to the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description:
                "A list of series (Summary Types) related to this event",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description:
                "A list of stories (Summary Types) related to this event",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description:
                "A list of comics (Summary Types) related to this event",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "characters",
              description:
                "A list of characters (Summary Types) related to this event",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "creators",
              description:
                "A list of creators (Summary Types) related to this event",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "next",
              description:
                "The next event (Summary Type) in relation to this event",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "previous",
              description:
                "The previous event (Summary Type) in relation to this event",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "SeriesWhereInput",
          description:
            "Optional filters for series. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "title",
              description: "Return only series matching the specified title.",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "titleStartsWith",
              description:
                "Return series with titles that begin with the specified string (e.g. Sp).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "startYear",
              description:
                "Return only series matching the specified start year.",
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "modifiedSince",
              description:
                "Return only series which have been modified since the specified date.",
              type: {
                kind: "SCALAR",
                name: "DateTime",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "contains",
              description:
                "Return only series containing one or more comics with the specified format.",
              type: {
                kind: "ENUM",
                name: "ComicFormat",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "seriesType",
              description: "Filter the series by publication frequency type.",
              type: {
                kind: "ENUM",
                name: "SeriesType",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "comics",
              description:
                "Return only series which contain the specified comics (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "stories",
              description:
                "Return only series which contain the specified stories (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "events",
              description:
                "Return only series which have comics that take place during the specified events (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "creators",
              description:
                "Return only series which feature work by the specified creators (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "characters",
              description:
                "Return only series which feature the specified characters (accepts a comma-separated list of ids).",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "SeriesType",
          description: "Filter the series by publication frequency type.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "collection",
              description:
                "Filter the series with a collection publication frequency.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "one_shot",
              description:
                "Filter the series with a one shot publication frequency.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "limited",
              description:
                "Filter the series with a limited publication frequency.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ongoing",
              description:
                "Filter the series with a ongoing publication frequency.",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "SeriesOrderBy",
          description:
            "Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "title_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "startYear_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "startYear_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Series",
          description: "A series resource within the Marvel Universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the series resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title",
              description: "The canonical title of the series.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: "A description of the series.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "urls",
              description: "A set of public web site URLs for the resource.",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "MarvelUrl",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "startYear",
              description: "The first year of publication for the series.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "endYear",
              description:
                "The last year of publication for the series (conventionally, 2099 for ongoing series) .",
              args: [],
              type: {
                kind: "SCALAR",
                name: "Int",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "rating",
              description: "The age-appropriateness rating for the series.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "The date the resource was most recently modified.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description: "The url path of to the image related to the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description:
                "A list of comics (Summary Types) related to this series",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "stories",
              description:
                "A list of stories (Summary Types) related to this series",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description:
                "A list of events (Summary Types) related to this series",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "characters",
              description:
                "A list of characters (Summary Types) related to this series",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "creators",
              description:
                "A list of creators (Summary Types) related to this series",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "next",
              description:
                "A list of previous series (Summary Types) in relation to this series",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "previous",
              description:
                "A list of previous series (Summary Types) in relation to this series",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "INPUT_OBJECT",
          name: "StoriesWhereInput",
          description:
            "Optional filters for stories. See notes on individual inputs below.",
          fields: null,
          inputFields: [
            {
              name: "modifiedSince",
              description: "",
              type: {
                kind: "SCALAR",
                name: "DateTime",
                ofType: null
              },
              defaultValue: null
            },
            {
              name: "comics",
              description: "",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "series",
              description: "",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "events",
              description: "",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "creators",
              description: "",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            },
            {
              name: "characters",
              description: "",
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "SCALAR",
                    name: "ID",
                    ofType: null
                  }
                }
              },
              defaultValue: null
            }
          ],
          interfaces: null,
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "StoriesOrderBy",
          description:
            "Order the result set by a field or fields. Multiple values are given priority in the order in which they are passed.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "id_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "id_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_asc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified_desc",
              description: "",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "Story",
          description: "A stories resource within the Marvel Universe",
          fields: [
            {
              name: "id",
              description: "The unique ID of the story resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "ID",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "title",
              description: "The story title.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: "A short description of the story.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "resourceURI",
              description: "The canonical URL identifier for this resource.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "type",
              description:
                "The story type e.g. interior story, cover, text story.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "modified",
              description: "The date the resource was most recently modified.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "thumbnail",
              description: "The url path of to the image related to the comic.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "comics",
              description:
                "A list of comics (Summary Types) related to this story",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "events",
              description:
                "A list of events (Summary Types) related to this story",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "characters",
              description:
                "A list of characters (Summary Types) related to this story",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "creators",
              description:
                "A list of creators (Summary Types) related to this story",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "series",
              description:
                "A list of series (Summary Types) related to this story",
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "Summary",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "originalIssue",
              description: "The original comic (Summary Type) with this story",
              args: [],
              type: {
                kind: "OBJECT",
                name: "Summary",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [
            {
              kind: "INTERFACE",
              name: "MarvelNode",
              ofType: null
            }
          ],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Schema",
          description:
            "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
          fields: [
            {
              name: "types",
              description: "A list of all types supported by this server.",
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "LIST",
                  name: null,
                  ofType: {
                    kind: "NON_NULL",
                    name: null,
                    ofType: {
                      kind: "OBJECT",
                      name: "__Type",
                      ofType: null
                    }
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "queryType",
              description: "The type that query operations will be rooted at.",
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "OBJECT",
                  name: "__Type",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "mutationType",
              description:
                "If this server supports mutation, the type that mutation operations will be rooted at.",
              args: [],
              type: {
                kind: "OBJECT",
                name: "__Type",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "subscriptionType",
              description:
                "If this server support subscription, the type that subscription operations will be rooted at.",
              args: [],
              type: {
                kind: "OBJECT",
                name: "__Type",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "directives",
              description: "A list of all directives supported by this server.",
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "LIST",
                  name: null,
                  ofType: {
                    kind: "NON_NULL",
                    name: null,
                    ofType: {
                      kind: "OBJECT",
                      name: "__Directive",
                      ofType: null
                    }
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Type",
          description:
            "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name and description, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
          fields: [
            {
              name: "kind",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "ENUM",
                  name: "__TypeKind",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "name",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "fields",
              description: null,
              args: [
                {
                  name: "includeDeprecated",
                  description: null,
                  type: {
                    kind: "SCALAR",
                    name: "Boolean",
                    ofType: null
                  },
                  defaultValue: "false"
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "__Field",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "interfaces",
              description: null,
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "__Type",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "possibleTypes",
              description: null,
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "__Type",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "enumValues",
              description: null,
              args: [
                {
                  name: "includeDeprecated",
                  description: null,
                  type: {
                    kind: "SCALAR",
                    name: "Boolean",
                    ofType: null
                  },
                  defaultValue: "false"
                }
              ],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "__EnumValue",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "inputFields",
              description: null,
              args: [],
              type: {
                kind: "LIST",
                name: null,
                ofType: {
                  kind: "NON_NULL",
                  name: null,
                  ofType: {
                    kind: "OBJECT",
                    name: "__InputValue",
                    ofType: null
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ofType",
              description: null,
              args: [],
              type: {
                kind: "OBJECT",
                name: "__Type",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "__TypeKind",
          description:
            "An enum describing what kind of type a given `__Type` is.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "SCALAR",
              description: "Indicates this type is a scalar.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "OBJECT",
              description:
                "Indicates this type is an object. `fields` and `interfaces` are valid fields.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INTERFACE",
              description:
                "Indicates this type is an interface. `fields` and `possibleTypes` are valid fields.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "UNION",
              description:
                "Indicates this type is a union. `possibleTypes` is a valid field.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ENUM",
              description:
                "Indicates this type is an enum. `enumValues` is a valid field.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INPUT_OBJECT",
              description:
                "Indicates this type is an input object. `inputFields` is a valid field.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "LIST",
              description:
                "Indicates this type is a list. `ofType` is a valid field.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "NON_NULL",
              description:
                "Indicates this type is a non-null. `ofType` is a valid field.",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Field",
          description:
            "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
          fields: [
            {
              name: "name",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "String",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "args",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "LIST",
                  name: null,
                  ofType: {
                    kind: "NON_NULL",
                    name: null,
                    ofType: {
                      kind: "OBJECT",
                      name: "__InputValue",
                      ofType: null
                    }
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "type",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "OBJECT",
                  name: "__Type",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "isDeprecated",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "Boolean",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "deprecationReason",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__InputValue",
          description:
            "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
          fields: [
            {
              name: "name",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "String",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "type",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "OBJECT",
                  name: "__Type",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "defaultValue",
              description:
                "A GraphQL-formatted string representing the default value for this input value.",
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__EnumValue",
          description:
            "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
          fields: [
            {
              name: "name",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "String",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "isDeprecated",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "Boolean",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "deprecationReason",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "OBJECT",
          name: "__Directive",
          description:
            "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
          fields: [
            {
              name: "name",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "String",
                  ofType: null
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "description",
              description: null,
              args: [],
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "locations",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "LIST",
                  name: null,
                  ofType: {
                    kind: "NON_NULL",
                    name: null,
                    ofType: {
                      kind: "ENUM",
                      name: "__DirectiveLocation",
                      ofType: null
                    }
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "args",
              description: null,
              args: [],
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "LIST",
                  name: null,
                  ofType: {
                    kind: "NON_NULL",
                    name: null,
                    ofType: {
                      kind: "OBJECT",
                      name: "__InputValue",
                      ofType: null
                    }
                  }
                }
              },
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          inputFields: null,
          interfaces: [],
          enumValues: null,
          possibleTypes: null
        },
        {
          kind: "ENUM",
          name: "__DirectiveLocation",
          description:
            "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
          fields: null,
          inputFields: null,
          interfaces: null,
          enumValues: [
            {
              name: "QUERY",
              description: "Location adjacent to a query operation.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "MUTATION",
              description: "Location adjacent to a mutation operation.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "SUBSCRIPTION",
              description: "Location adjacent to a subscription operation.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "FIELD",
              description: "Location adjacent to a field.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "FRAGMENT_DEFINITION",
              description: "Location adjacent to a fragment definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "FRAGMENT_SPREAD",
              description: "Location adjacent to a fragment spread.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INLINE_FRAGMENT",
              description: "Location adjacent to an inline fragment.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "VARIABLE_DEFINITION",
              description: "Location adjacent to a variable definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "SCHEMA",
              description: "Location adjacent to a schema definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "SCALAR",
              description: "Location adjacent to a scalar definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "OBJECT",
              description: "Location adjacent to an object type definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "FIELD_DEFINITION",
              description: "Location adjacent to a field definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ARGUMENT_DEFINITION",
              description: "Location adjacent to an argument definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INTERFACE",
              description: "Location adjacent to an interface definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "UNION",
              description: "Location adjacent to a union definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ENUM",
              description: "Location adjacent to an enum definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "ENUM_VALUE",
              description: "Location adjacent to an enum value definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INPUT_OBJECT",
              description:
                "Location adjacent to an input object type definition.",
              isDeprecated: false,
              deprecationReason: null
            },
            {
              name: "INPUT_FIELD_DEFINITION",
              description:
                "Location adjacent to an input object field definition.",
              isDeprecated: false,
              deprecationReason: null
            }
          ],
          possibleTypes: null
        }
      ],
      directives: [
        {
          name: "include",
          description:
            "Directs the executor to include this field or fragment only when the `if` argument is true.",
          locations: ["FIELD", "FRAGMENT_SPREAD", "INLINE_FRAGMENT"],
          args: [
            {
              name: "if",
              description: "Included when true.",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "Boolean",
                  ofType: null
                }
              },
              defaultValue: null
            }
          ]
        },
        {
          name: "skip",
          description:
            "Directs the executor to skip this field or fragment when the `if` argument is true.",
          locations: ["FIELD", "FRAGMENT_SPREAD", "INLINE_FRAGMENT"],
          args: [
            {
              name: "if",
              description: "Skipped when true.",
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "Boolean",
                  ofType: null
                }
              },
              defaultValue: null
            }
          ]
        },
        {
          name: "deprecated",
          description:
            "Marks an element of a GraphQL schema as no longer supported.",
          locations: ["FIELD_DEFINITION", "ENUM_VALUE"],
          args: [
            {
              name: "reason",
              description:
                "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/).",
              type: {
                kind: "SCALAR",
                name: "String",
                ofType: null
              },
              defaultValue: '"No longer supported"'
            }
          ]
        }
      ]
    }
  }
};
