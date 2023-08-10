const  expectedJsonDiff = `[
  {
    "key": "common",
    "status": "unchanged",
    "hasChildren": true,
    "path": "common",
    "value": [
      {
        "key": "follow",
        "status": "added",
        "hasChildren": false,
        "path": "common.follow",
        "value": false
      },
      {
        "key": "setting1",
        "status": "unchanged",
        "hasChildren": false,
        "path": "common.setting1",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "status": "deleted",
        "hasChildren": false,
        "path": "common.setting2",
        "value": 200
      },
      {
        "key": "setting3",
        "oldValue": true,
        "status": "changed",
        "hasChildren": false,
        "hasOldChildren": false,
        "path": "common.setting3",
        "value": null
      },
      {
        "key": "setting4",
        "status": "added",
        "hasChildren": false,
        "path": "common.setting4",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "status": "added",
        "hasChildren": true,
        "path": "common.setting5",
        "value": [
          {
            "key": "key5",
            "status": "unchanged",
            "hasChildren": false,
            "path": "common.setting5.key5",
            "value": "value5"
          }
        ]
      },
      {
        "key": "setting6",
        "status": "unchanged",
        "hasChildren": true,
        "path": "common.setting6",
        "value": [
          {
            "key": "doge",
            "status": "unchanged",
            "hasChildren": true,
            "path": "common.setting6.doge",
            "value": [
              {
                "key": "wow",
                "oldValue": "",
                "status": "changed",
                "hasChildren": false,
                "hasOldChildren": false,
                "path": "common.setting6.doge.wow",
                "value": "so much"
              }
            ]
          },
          {
            "key": "key",
            "status": "unchanged",
            "hasChildren": false,
            "path": "common.setting6.key",
            "value": "value"
          },
          {
            "key": "ops",
            "status": "added",
            "hasChildren": false,
            "path": "common.setting6.ops",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "unchanged",
    "hasChildren": true,
    "path": "group1",
    "value": [
      {
        "key": "baz",
        "oldValue": "bas",
        "status": "changed",
        "hasChildren": false,
        "hasOldChildren": false,
        "path": "group1.baz",
        "value": "bars"
      },
      {
        "key": "foo",
        "status": "unchanged",
        "hasChildren": false,
        "path": "group1.foo",
        "value": "bar"
      },
      {
        "key": "nest",
        "oldValue": [
          {
            "key": "key",
            "status": "unchanged",
            "hasChildren": false,
            "path": "group1.nest.key",
            "value": "value"
          }
        ],
        "status": "changed",
        "hasChildren": false,
        "hasOldChildren": true,
        "path": "group1.nest",
        "value": "str"
      }
    ]
  },
  {
    "key": "group2",
    "status": "deleted",
    "hasChildren": true,
    "path": "group2",
    "value": [
      {
        "key": "abc",
        "status": "unchanged",
        "hasChildren": false,
        "path": "group2.abc",
        "value": 12345
      },
      {
        "key": "deep",
        "status": "unchanged",
        "hasChildren": true,
        "path": "group2.deep",
        "value": [
          {
            "key": "id",
            "status": "unchanged",
            "hasChildren": false,
            "path": "group2.deep.id",
            "value": 45
          }
        ]
      }
    ]
  },
  {
    "key": "group3",
    "status": "added",
    "hasChildren": true,
    "path": "group3",
    "value": [
      {
        "key": "deep",
        "status": "unchanged",
        "hasChildren": true,
        "path": "group3.deep",
        "value": [
          {
            "key": "id",
            "status": "unchanged",
            "hasChildren": true,
            "path": "group3.deep.id",
            "value": [
              {
                "key": "number",
                "status": "unchanged",
                "hasChildren": false,
                "path": "group3.deep.id.number",
                "value": 45
              }
            ]
          }
        ]
      },
      {
        "key": "fee",
        "status": "unchanged",
        "hasChildren": false,
        "path": "group3.fee",
        "value": 100500
      }
    ]
  }
]`
export default expectedJsonDiff;