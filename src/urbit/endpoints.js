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
    "graph-view-action": ["/graph-eval/tang", "/graph-join/json", "/graph-leave/json", "/graph-delete/json", "/graph-create/json", "/graph-create-group-feed/resource", "/graph-disable-group-feed/json", "/graph-add-nodes/graph-view-action"],
    "group-view-action": ["/group-create", "/group-leave", "/group-delete", "/group-invite"],
    "noun": {}
}
export const pokeEndpoints = {
    "dm-hook": ["dm-hook-action", "graph-update-3"],
    "group-push-hook": ["group-update-0"],
    "group-view": ["group-view-action"],
    "graph-push-hook": ["graph-update-3"],
    "contact-pull-hook": ["pull-hook-action"],
    "hark-store": ["hark-action"],
    "hark-pull-hook": ["hark-pull-hook-action"],
    "metadata-push-hook": ["metadata-update-2"],
    "invite-store": ["invite-action"],
    "settings-store": ["settings-event"],
    "s3-store": ["s3-action"],
    "herm": ["belt"]
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
