export const scryEndpoints = {
    "hood": ["/kiln/vats"],
    "group-store": [],
    "graph-store": [
        "/keys",
        "/graph/${ship}/${channelName}",
        "/graph/${ship}/${channelName}/node/siblings/${newest|older|younger}/${lone|kith}/${count}${encodedIndex}",
        "/graph/${ship}/${channelName}/node/index/${lone|kith}/encodedIndex}"
    ],
    "contact-store": ["/contact/${ship}", "/is-allowed/$entity/$name/$ship/$isPersonal"],
    "hark-store": ["/recent/${archive|inbox}/${offset}/${count}"],
    "invite-store": [],
    "settings-store": ["/all", "/desk/$desk-name","/bucket/$desk-name/$bucket-name", "/entry/$desk/$bucket-name/$entry-name"],
    "s3-store": ["/configuration", "/credentials"]
}

export const threadEndpoints = {
    "graph-update-3": {},
    "graph-view-action": {},
    "group-view-action": {},
    "noun": {}
}
export const pokeEndpoints = {
    "dm-hook": [],
    "group-store": [],
    "graph-store": ["/keys"],
    "contact-store": ["/is-allowed/$entity/$name/$ship/$isPersonal"],
    "hark-store": [],
    "invite-store": [],
    "settings-store": {
        "settings-event": {
            "put-bucket": { "bucket-key": "$bucket", "bucket": {} },
            "del-bucket": { "bucket-key": "$bucket" },
            "put-entry": { "bucket-key": "$bucket", "entry-key": "$entry", value: "value" },
            "del-entry": { "bucket-key": "$bucket", "entry-key": "$entry" }
        }
    },
    "s3-store": ["/configuration", "/credentials"],
    "herm": {
        belt: ["{'ret': null}", "{'txt': 'string'}"]
    }
}
export const subscribeEndpoints = {
    "group-view": ["/all"],
    "group-store": ["/groups"],
    "graph-store": ["/keys", "/updates"],
    "metadata-store": ["/all"],
    "invite-store": ["/all"],
    "launch": ["/all"],
    "weather": ["/all"],
    "contact-store": ["/all"],
    "hark-store": ["/updates"],
    "hark-store": ["/notes"],
    "hark-graph-hook": ["/updates"],
    "hark-group-hook": ["/updates"],
    "settings-store": ["/all", "/desk/$desk-name"],
    "s3-store": ["/all"],
    "contact-pull-hook": ["/nack"],
    "contact-pull-hook": ["/all"],
    "dm-hook": ["/updates"],
    "herm": ["/session/"],
    "hood": ["/kiln/vats"],
    "docket": ["/charges"],
}
