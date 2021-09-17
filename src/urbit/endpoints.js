export const scryEndpoints = {
    "file-server": ["/clay/base/hash"],
    "launch": ["/runtime-lag"],
    "group-store": [],
    "graph-store": [
        "/keys",
        "/graph/${ship}/${channelName}",
        "/graph/${ship}/${channelName}/node/siblings/${newest|older|younger}/${lone|kith}/${count}${encodedIndex}",
        "/graph/${ship}/${channelName}/node/index/${lone|kith}/encodedIndex}"
    ],
    "contact-store": ["/is-allowed/$entity/$name/$ship/$isPersonal"],
    "hark-store": [],
    "invite-store": [],
    "settings-store": ["/all", "/bucket/$bucket-name", "/entry/$bucket-name/$entry-name"],
    "s3-store": ["/configuration", "/credentials"]
}

export const threadEndpoints = {}
export const pokeEndpoints = {
    "file-server": ["/clay/base/hash"],
    "launch": ["/runtime-lag"],
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
    "s3-store": ["/configuration", "/credentials"]
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
    "hark-graph-hook": ["/updates"],
    "hark-group-hook": ["/updates"],
    "settings-store": ["/all"],
    "s3-store": ["/all"],
    "contact-pull-hook": ["/nack"],
    "contact-pull-hook": ["/all"],
    "dm-hook": ["/updates"],
    "herm": ["/session"]
}
