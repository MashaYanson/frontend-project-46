const expectedJsonDiff = `[
  {
    "key": "common",
    "status": "nested",
    "value": [
      {
        "key": "follow",
        "status": "added",
        "value": false
      },
      {
        "key": "setting1",
        "status": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "status": "deleted",
        "value": 200
      },
      {
        "key": "setting3",
        "status": "changed",
        "value": {
          "old": true,
          "new": null
        }
      },
      {
        "key": "setting4",
        "status": "added",
        "value": "blah blah"
      },
      {
        "key": "setting5",
        "status": "added",
        "value": {
          "key5": "value5"
        }
      },
      {
        "key": "setting6",
        "status": "nested",
        "value": [
          {
            "key": "doge",
            "status": "nested",
            "value": [
              {
                "key": "wow",
                "status": "changed",
                "value": {
                  "old": "",
                  "new": "so much"
                }
              }
            ]
          },
          {
            "key": "key",
            "status": "unchanged",
            "value": "value"
          },
          {
            "key": "ops",
            "status": "added",
            "value": "vops"
          }
        ]
      }
    ]
  },
  {
    "key": "group1",
    "status": "nested",
    "value": [
      {
        "key": "baz",
        "status": "changed",
        "value": {
          "old": "bas",
          "new": "bars"
        }
      },
      {
        "key": "foo",
        "status": "unchanged",
        "value": "bar"
      },
      {
        "key": "nest",
        "status": "changed",
        "value": {
          "old": {
            "key": "value"
          },
          "new": "str"
        }
      }
    ]
  },
  {
    "key": "group2",
    "status": "deleted",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    }
  },
  {
    "key": "group3",
    "status": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]`;
export default expectedJsonDiff;
