////POI ids: 0---
////POT ids: 1---
////Edges: floor transition: floor:0, distance:0

var DATA;
//var DATA;
//    bla = {
//    "floorPlan": [
//      {
//          "floorID": 1,
//          "imagePath": "floor1/floor1.png",
//          "imageWidth": 188,
//          "imageHeight": 93
//      },
//      {
//          "floorID": 2,
//          "imagePath": "floor2/floor2.png",
//          "imageWidth": 188,
//          "imageHeight": 93
//      },
//      {
//          "floorID": 3,
//          "imagePath": "floor3/floor3.png",
//          "imageWidth": 188,
//          "imageHeight": 93
//      },
//      {
//          "floorID": 4,
//          "imagePath": "floor4/floor4.png",
//          "imageWidth": 188,
//          "imageHeight": 93
//      },
//      {
//          "floorID": 5,
//          "imagePath": "floor5/floor5.png",
//          "imageWidth": 188,
//          "imageHeight": 93
//      }
//    ],
//    "node": [
//      {
//          "poi": [
//            {
//                "id": "0000",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 0"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 0"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "First artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Premier artéfact du musée"
//                  }
//                ],
//                "x": "8",
//                "y": "-85",
//                "floorID": 1,
//                "iBeacon": {
//                    "uuid": "0000",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0001",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 1"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 1"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Second artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Second artéfact du musée"
//                  }
//                ],
//                "x": "16",
//                "y": "-85",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0001",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0002",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 2"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 2"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Third artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Troisième artéfact du musée"
//                  }
//                ],
//                "x": "16",
//                "y": "-123",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0002",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0003",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 3"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 3"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Fourth artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Quatrième artéfact du musée"
//                  }
//                ],
//                "x": "47",
//                "y": "-123",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0003",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0004",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 4"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 4"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Fifth artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Cinquième artéfact du musée"
//                  }
//                ],
//                "x": "56",
//                "y": "-85",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0004",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0005",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 5"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 5"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Sixth artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Sixième artéfact du musée"
//                  }
//                ],
//                "x": "54",
//                "y": "-60",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0005",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0006",
//                "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 6"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 6"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "English",
//                      "description": "Seventh artifact of the museum"
//                  },
//                  {
//                      "language": "French",
//                      "description": "Septième artéfact du musée"
//                  }
//                ],
//                "x": "63",
//                "y": "-20",
//                "floorID": 2,
//                "iBeacon": {
//                    "uuid": "0006",
//                    "major": "<major>",
//                    "minor": "<minor>"
//                },
//                "media": {
//                    "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ],
//                    "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//                    ]
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": "S1",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "First Storyline POI"
//                        },
//                        {
//                            "language": "French",
//                            "title": "First Storyline POI french"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "First Storyline POI"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//                ]
//            },
//            {
//                "id": "0007",
//                "title": [
//                  {
//                      "language": "EN",
//                      "title": "Point of Interest 1"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "EN",
//                      "description": "This is the description for Point of Interest 1"
//                  }
//                ],
//                "x": 100,
//                "y": 100,
//                "floorID": "1",
//                "iBeacon": {
//                    "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
//                    "major": 0,
//                    "minor": 0
//                },
//                "media": {
//                    "image": [],
//                    "video": [
//                      {
//                          "path": "videos/MOEB_Introduction_-_Small.mov",
//                          "language": "EN",
//                          "caption": "None"
//                      }
//                    ],
//                    "audio": []
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": 0
//                  }
//                ]
//            },
//            {
//                "id": "0008",
//                "title": [
//                  {
//                      "language": "EN",
//                      "title": "Point of Interest 2"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "EN",
//                      "description": "This is the description for Point of Interest 2"
//                  }
//                ],
//                "x": 200,
//                "y": 100,
//                "floorID": "1",
//                "iBeacon": {
//                    "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
//                    "major": 1,
//                    "minor": 1
//                },
//                "media": {
//                    "image": [],
//                    "video": [{
//                        "path": "point1",
//                        "language": "EN",
//                        "caption": "None"
//                    }],
//                    "audio": []
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": 0
//                  }
//                ]
//            },
//            {
//                "id": "0009",
//                "title": [
//                  {
//                      "language": "EN",
//                      "title": "Point of Interest 3"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "EN",
//                      "description": "This is the description for Point of Interest 3"
//                  }
//                ],
//                "x": 300,
//                "y": 100,
//                "floorID": "1",
//                "iBeacon": {
//                    "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
//                    "major": 2,
//                    "minor": 2
//                },
//                "media": {
//                    "image": [],
//                    "video": [{
//                        "path": "point2",
//                        "language": "EN",
//                        "caption": "None"
//                    }],
//                    "audio": []
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": 0
//                  }
//                ]
//            },
//            {
//                "id": "0010",
//                "title": [
//                  {
//                      "language": "EN",
//                      "title": "Point of Interest 4"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "EN",
//                      "description": "This is the description for Point of Interest 4"
//                  }
//                ],
//                "x": 400,
//                "y": 100,
//                "floorID": "1",
//                "iBeacon": {
//                    "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
//                    "major": 3,
//                    "minor": 3
//                },
//                "media": {
//                    "image": [],
//                    "video": [{
//                        "path": "point3",
//                        "language": "EN",
//                        "caption": "None"
//                    }],
//                    "audio": []
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": 0
//                  }
//                ]
//            },
//            {
//                "id": "0011",
//                "title": [
//                  {
//                      "language": "EN",
//                      "title": "Point of Interest 5"
//                  }
//                ],
//                "description": [
//                  {
//                      "language": "EN",
//                      "description": "This is the description for Point of Interest 5"
//                  }
//                ],
//                "x": 500,
//                "y": 100,
//                "floorID": "1",
//                "iBeacon": {
//                    "uuid": "b9407f30-f5f8-466e-aff9-25556b57fe6d",
//                    "major": 9377,
//                    "minor": 54177
//                },
//                "media": {
//                    "image": [],
//                    "video": [],
//                    "audio": []
//                },
//                "storyPoint": [
//                  {
//                      "storylineID": 0
//                  }
//                ]
//            },
//            {
//               "id": "0012",
//                            "title": [
//                              {
//                                  "language": "English",
//                                  "title": "Artifact 1"
//                              },
//                              {
//                                  "language": "French",
//                                  "title": "Artéfact 1"
//                              }
//                            ],
//                            "description": [
//                              {
//                                  "language": "English",
//                                  "description": "MOEB Introduction"
//                              },
//                              {
//                                  "language": "French",
//                                  "description": "MOEB Introduction"
//                              }
//                            ],
//                            "x": "38",
//                            "y": "-80",
//                            "floorID": 2,
//                            "iBeacon": {
//                                "uuid": "0006",
//                                "major": "<major>",
//                                "minor": "<minor>"
//                            },
//                            "media": {
//                                "image": [
//                                  {
//                                      "path": "<URL>",
//                                      "language": "<language>",
//                                      "caption": "<caption>"
//                                  }
//                                ],
//                                "video": [
//                                  {
//                                      "path": "videos/MOEB_Introduction_-_Small.mov",
//                                      "language": "<language>",
//                                      "caption": "<caption>"
//                                  }
//                                ],
//                                "audio": [
//                                  {
//                                      "path": "<URL>",
//                                      "language": "<language>",
//                                      "caption": "<caption>"
//                                  }
//                                ]
//                            },
//                            "storyPoint": [
//                              {
//                                  "storylineID": "S2",
//                                  "title": [
//                                    {
//                                        "language": "English",
//                                        "title": "MOEB"
//                                    },
//                                    {
//                                        "language": "French",
//                                        "title": "MOEB"
//                                    }
//                                  ],
//                                  "description": [
//                                    {
//                                        "language": "English",
//                                        "description": "MOEB Introduction"
//                                    }
//                                  ],
//                                  "media": {
//                                      "image": [
//                                        {
//                                            "path": "<URL>",
//                                            "language": "<language>",
//                                            "caption": "<caption>"
//                                        }
//                                      ],
//                                      "video": [
//                                        {
//                                            "path": "<URL>",
//                                            "language": "<language>",
//                                            "caption": "<caption>"
//                                        }
//                                      ],
//                                      "audio": [
//                                        {
//                                            "path": "<URL>",
//                                            "language": "<language>",
//                                            "caption": "<caption>"
//                                        }
//                                      ]
//                                  }
//                              }
//                            ]
//             },
//			{
//			    "id": "0013",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 1"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 1"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 1"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 1"
//                  }
//			    ],
//			    "x": "52",
//			    "y": "-76",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "videos/MOEB_POINT_1_-_Small.mov",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 1"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0014",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 2"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 2"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 2"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 2"
//                  }
//			    ],
//			    "x": "54",
//			    "y": "-72",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "videos/MOEB_POINT_2_-_Small.mov",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 2"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0015",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 3"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 3"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 3"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 3"
//                  }
//			    ],
//			    "x": "55",
//			    "y": "-61",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "videos/MOEB_POINT_3_-_Small.mov",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 3"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0016",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 4"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 4"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 4"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 4"
//                  }
//			    ],
//			    "x": "48",
//			    "y": "-116",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "audio/MOEB_POINT_4_-_Small.mp3",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 4"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0017",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 5"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 5"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 5"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 5"
//                  }
//			    ],
//			    "x": "43",
//			    "y": "-124",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 5"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0018",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 6"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 6"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 6"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 6"
//                  }
//			    ],
//			    "x": "26",
//			    "y": "-123",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 6"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0019",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 7"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 7"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 7"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 7"
//                  }
//			    ],
//			    "x": "16",
//			    "y": "-116",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 7"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0020",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 8"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 8"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 8"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 8"
//                  }
//			    ],
//			    "x": "10",
//			    "y": "-84",
//			    "floorID": 2,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 8"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0021",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 9"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 9"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 9"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 9"
//                  }
//			    ],
//			    "x": "16",
//			    "y": "-100",
//			    "floorID": 3,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 9"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0022",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 10"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 10"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 10"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 10"
//                  }
//			    ],
//			    "x": "10",
//			    "y": "-126",
//			    "floorID": 3,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 10"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0023",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 11"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 11"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 11"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 11"
//                  }
//			    ],
//			    "x": "16",
//			    "y": "-126",
//			    "floorID": 4,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 11"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0024",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 12"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 12"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 12"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 12"
//                  }
//			    ],
//			    "x": "18",
//			    "y": "-125",
//			    "floorID": 5,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 12"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0025",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 13"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 13"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 13"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 13"
//                  }
//			    ],
//			    "x": "18",
//			    "y": "-99",
//			    "floorID": 5,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 13"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			},
//			{
//			    "id": "0026",
//			    "title": [
//                  {
//                      "language": "English",
//                      "title": "Artifact 14"
//                  },
//                  {
//                      "language": "French",
//                      "title": "Artéfact 14"
//                  }
//			    ],
//			    "description": [
//                  {
//                      "language": "English",
//                      "description": "MOEB Point 14"
//                  },
//                  {
//                      "language": "French",
//                      "description": "MOEB Point 14"
//                  }
//			    ],
//			    "x": "10",
//			    "y": "-85",
//			    "floorID": 5,
//			    "iBeacon": {
//			        "uuid": "0006",
//			        "major": "<major>",
//			        "minor": "<minor>"
//			    },
//			    "media": {
//			        "image": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "video": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ],
//			        "audio": [
//                      {
//                          "path": "<URL>",
//                          "language": "<language>",
//                          "caption": "<caption>"
//                      }
//			        ]
//			    },
//			    "storyPoint": [
//                  {
//                      "storylineID": "S2",
//                      "title": [
//                        {
//                            "language": "English",
//                            "title": "MOEB"
//                        },
//                        {
//                            "language": "French",
//                            "title": "MOEB"
//                        }
//                      ],
//                      "description": [
//                        {
//                            "language": "English",
//                            "description": "MOEB Point 14"
//                        }
//                      ],
//                      "media": {
//                          "image": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "video": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ],
//                          "audio": [
//                            {
//                                "path": "<URL>",
//                                "language": "<language>",
//                                "caption": "<caption>"
//                            }
//                          ]
//                      }
//                  }
//			    ]
//			}
//          ],
//          "pot": [
//            {
//                "id": "1000",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "11",
//                "y": "-85",
//                "floorID": 1
//            },
//            {
//                "id": "1001",
//                "label": {
//                    "language": "EN",
//                    "label": "stair"
//                },
//                "x": "11",
//                "y": "-84",
//                "floorID": 1
//            },
//            {
//                "id": "1002",
//                "label": {
//                    "language": "EN",
//                    "label": "stair"
//                },
//                "x": "11",
//                "y": "-84",
//                "floorID": 2
//            },
//            {
//                "id": "1003",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "50",
//                "y": "-85",
//                "floorID": 2
//            },
//            {
//                "id": "1004",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "57",
//                "y": "-77",
//                "floorID": 2
//            },
//            {
//                "id": "1005",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "54",
//                "y": "-76",
//                "floorID": 2
//            },
//            {
//                "id": "1006",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "55",
//                "y": "-62",
//                "floorID": 2
//            },
//            {
//                "id": "1007",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "57",
//                "y": "-28",
//                "floorID": 2
//            },
//            {
//                "id": "1008",
//                "label": {
//                    "language": "EN",
//                    "label": "corner"
//                },
//                "x": "62",
//                "y": "-28",
//                "floorID": 2
//            },
//            {
//                "id": "1008",
//                "label": {
//                    "language": "English",
//                    "label": "corner"
//                },
//                "x": "62",
//                "y": "-28",
//                "floorID": 2
//            },
//            {
//                "id": "1009",
//                "label": {
//                    "language": "English",
//                    "label": "corner"
//                },
//                "x": "62",
//                "y": "-28",
//                "floorID": 2
//            },
//			{
//			    "id": "1010",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "52",
//			    "y": "-80",
//			    "floorID": 2
//			},
//			{
//			    "id": "1011",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "54",
//			    "y": "-76",
//			    "floorID": 2
//			},
//			{
//			    "id": "1012",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "57",
//			    "y": "-76",
//			    "floorID": 2
//			},
//			{
//			    "id": "1013",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "56",
//			    "y": "-85",
//			    "floorID": 2
//			},
//			{
//			    "id": "1014",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "50",
//			    "y": "-85",
//			    "floorID": 2
//			},
//			{
//			    "id": "1015",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "47",
//			    "y": "-124",
//			    "floorID": 2
//			},
//			{
//			    "id": "1016",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "16",
//			    "y": "-122",
//			    "floorID": 2
//			},
//			{
//			    "id": "1017",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "16",
//			    "y": "-84",
//			    "floorID": 2
//			},
//			{
//			    "id": "1018",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "10",
//			    "y": "-84",
//			    "floorID": 3
//			},
//			{
//			    "id": "1019",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "16",
//			    "y": "-84",
//			    "floorID": 3
//			},
//			{
//			    "id": "1020",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "16",
//			    "y": "-126",
//			    "floorID": 3
//			},
//			{
//			    "id": "1021",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "10",
//			    "y": "-126",
//			    "floorID": 4
//			},
//			{
//			    "id": "1022",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "10",
//			    "y": "-124",
//			    "floorID": 5
//			},
//			{
//			    "id": "1023",
//			    "label": {
//			        "language": "English",
//			        "label": "corner"
//			    },
//			    "x": "18",
//			    "y": "-85",
//			    "floorID": 5
//			}
//          ]
//      }
//    ],
//    "edge": [
//      {
//          "startNode": "0000",
//          "endNode": "1000",
//          "floorNumber": 1,
//          "distance": 5
//      },
//      {
//          "startNode": "1000",
//          "endNode": "1001",
//          "floorNumber": 1,
//          "distance": 2
//      },
//      {
//          "startNode": "1001",
//          "endNode": "1002",
//          "floorNumber": 0,
//          "distance": 0
//      },
//      {
//          "startNode": "1002",
//          "endNode": "0001",
//          "floorNumber": 2,
//          "distance": 5
//      },
//      {
//          "startNode": "0001",
//          "endNode": "0002",
//          "floorNumber": 2,
//          "distance": 20
//      },
//      {
//          "startNode": "0002",
//          "endNode": "0003",
//          "floorNumber": 2,
//          "distance": 15
//      },
//      {
//          "startNode": "0003",
//          "endNode": "1003",
//          "floorNumber": 2,
//          "distance": 20
//      },
//      {
//          "startNode": "1003",
//          "endNode": "0004",
//          "floorNumber": 2,
//          "distance": 5
//      },
//      {
//          "startNode": "0004",
//          "endNode": "1004",
//          "floorNumber": 2,
//          "distance": 5
//      },
//      {
//          "startNode": "1004",
//          "endNode": "1005",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1005",
//          "endNode": "1006",
//          "floorNumber": 2,
//          "distance": 10
//      },
//      {
//          "startNode": "1006",
//          "endNode": "0005",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0005",
//          "endNode": "1007",
//          "floorNumber": 2,
//          "distance": 20
//      },
//      {
//          "startNode": "1007",
//          "endNode": "1008",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1008",
//          "endNode": "0006",
//          "floorNumber": 2,
//          "distance": 5
//      },
//      {
//          "startNode": "0012",
//          "endNode": "1010",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1010",
//          "endNode": "0013",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0013",
//          "endNode": "1011",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1011",
//          "endNode": "0014",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0014",
//          "endNode": "0015",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0015",
//          "endNode": "0014",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0014",
//          "endNode": "1011",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1011",
//          "endNode": "1012",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1012",
//          "endNode": "1013",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1013",
//          "endNode": "1014",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1014",
//          "endNode": "0016",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0016",
//          "endNode": "1015",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1015",
//          "endNode": "0017",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0017",
//          "endNode": "0018",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0018",
//          "endNode": "1016",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1016",
//          "endNode": "0019",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0019",
//          "endNode": "1017",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1016",
//          "endNode": "0020",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0020",
//          "endNode": "1018",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1018",
//          "endNode": "1019",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1019",
//          "endNode": "0021",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0021",
//          "endNode": "1020",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1020",
//          "endNode": "0022",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0022",
//          "endNode": "1021",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1021",
//          "endNode": "0023",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0023",
//          "endNode": "1021",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1021",
//          "endNode": "1022",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1022",
//          "endNode": "0024",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0024",
//          "endNode": "0025",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "0025",
//          "endNode": "1023",
//          "floorNumber": 2,
//          "distance": 3
//      },
//      {
//          "startNode": "1023",
//          "endNode": "0026",
//          "floorNumber": 2,
//          "distance": 3
//      }
//    ],
//    "storyline": [
//      {
//          "id": "S1",
//          "title": [
//            {
//                "language": "EN",
//                "title": "Storyline 1"
//            }
//          ],
//          "description": [
//            {
//                "language": "EN",
//                "description": "Storyline 1 description"
//            }
//          ],
//          "path": [
//            "0000",
//            "1000",
//            "1001",
//            "1002",
//            "0001",
//            "0002",
//            "0003",
//            "1003",
//            "0004",
//            "1004",
//            "1005",
//            "1006",
//            "0005",
//            "1007",
//            "1008",
//            "0006"
//          ],
//          "thumbnail": "<path of thumbnail>",
//          "walkingTimeInMinutes": "30",
//          "floorsCovered": "2"
//      },
//       {
//           "id": "S2",
//           "title": [
//             {
//                 "language": "English",
//                 "title": "Nipper Tour: <em> Searching For His Master’s Voice </em>"
//             }
//           ],
//           "description": [
//             {
//                 "language": "English",
//                 "description": "During the tour, visitors will walk through different sections of RCA Victor’s production site, constructed over a period of roughly 25 years. The tour leads them through three different time zones, the 1920s, back when Montreal was the world’s largest grain hub and Canada’s productive power house. This was also Emile Berliner’s time with the production of early recordings and record playing equipment, Montreal’s entertainment rich 1930s, when music was still at the core of RCA Victor’s production, to 1943, when production at RCA Victor diversified to serve military needs. Montreal was Canada’s most industrialized metropolis and 1943 in the middle of war production to support the allies fighting in Europe. Economy boomed and the RCA’s workforce quickly increased from around 300 to over 3.000 workers. Not only here, but in all kinds of industry, women needed to fill in formerly male positions. Military guarded industrial sites that produced for the armies. Changes came quickly, technologies advanced fast. The visitor experiences how much the working life and production changed in this factory. Together with the famous dog Nipper, they explore the core of the RCA-Victor plant, going through today’s spaces where they encounter 10 places that give them an audio-visual experience of the atmosphere of this place’s past that once played a paramount role in Montreal."
//             }
//           ],
//           "path": [
//             "0012",
//             "1010",
//             "0013",
//             "1011",
//             "0014",
//             "0015",
//             "0014",
//             "1011",
//             "1012",
//             "1013",
//             "1014",
//             "0016",
//             "1015",
//             "0017",
//             "0018",
//             "1016",
//             "0019",
//             "1017",
//             "0020",
//             "1018",
//             "1019",
//             "0021",
//             "1020",
//             "0022",
//             "1021",
//             "0023",
//             "1021",
//             "1022",
//             "0024",
//             "0025",
//             "1023",
//             "0026"
//           ],
//           "thumbnail": "<path of thumbnail>",
//           "walkingTimeInMinutes": "<minutes>",
//           "floorsCovered": "<number of floors covered>"
//       }
//    ]
//};
