import create from 'zustand';
import { urbitVisor } from "uv-core";

// async function isConnected() {
//     return new Promise((resolve, reject) => {
//         window.addEventListener('load', async function check() {
//             window.removeEventListener('load', check)
//             const res = await urbitVisor.isConnected()
//             resolve(res)
//         })
//     })
// };


export const useStore = create((set, get) => ({
    loaded: false,
    isInstalled: true,
    isConnected: false,
    activeShip: "sampel-palnet",
    hasPerms: false,
    loading: false,
    groups: {},
    channels: [],
    contacts: {},
    metadata: {},
    hark: { "all-stats": [], timebox: [] },
    chatFeed: [],
    hash: "",
    loading: false,
    connectionListener: null,
    disconnectionListener: null,
    permissionGrantingListener: null,
    permissionRevokingListener: null,
    chatFeedListener: null,
    chatsub: null,
    setChatsub: (number) => set({ chatsub: number }),
    addConnectionListener: (listener) => set({ connectionListener: listener }),
    addDisconnectionListener: (listener) => set({ disconnectionListener: listener }),
    addPermissionGrantingListener: (listener) => set({ permissionGrantingListener: listener }),
    addPermissionRevokingListener: (listener) => set({ permissionRevokingListener: listener }),
    addChatFeedListener: (listener) => set({ chatFeedListener: listener }),
    setLoading: (boolean) => set({ loading: boolean }),
    reset: () => set({ chatFeed: [], hasPerms: false, activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { "all-stats": [], timebox: [] } }),
    checkConnection: async () => {
        const res = await urbitVisor.isConnected()
        set({ isConnected: await res.response, loaded: true })
    },
    recheckConnection: async () => {
        const res = await urbitVisor.isConnected();
        set({ isConnected: await res.response })
    },
    checkPerms: async () => {
        const res = await urbitVisor.authorizedPermissions();
        const required = ["shipName", "scry", "subscribe"];
        if (res.response && required.every(perm => res.response.includes(perm)))
            set({ hasPerms: true })
        else set({ hasPerms: false })
    },
    setShip: async () => {
        const res = await urbitVisor.getShip();
        set({ activeShip: res.response })
    },
    addToChatFeed: (message) => {
        set(state => ({ chatFeed: [...state.chatFeed, message] }))
    },
    loadData: async () => {
        set({ loading: true, chatFeed: [], activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { "all-stats": [], timebox: [] } })
        let loaded = 0;
        urbitVisor.scry({ app: "hood", path: "/kiln/vats" }).then(res => set({ hash: res.response.base.hash }));
        function finish() {
            set({ loading: false });
            loaded = [];
            metadataSubscription.unsubscribe();
            contactsSubscription.unsubscribe();
            groupsSubscription.unsubscribe();
            channelsSubscription.unsubscribe();
            harkSubscription.unsubscribe();
        }
        await urbitVisor.subscribe({ app: "graph-store", path: "/updates" });

        const met = await urbitVisor.subscribe({ app: "metadata-store", path: "/all" })
        const metadataSubscription = urbitVisor.on("sse", ["metadata-update", "associations"], (data) => {
            set({ metadata: data })
            urbitVisor.unsubscribe(met.response)
            loaded++
            if (loaded === 5) finish();
        });
        const con = await urbitVisor.subscribe({ app: "contact-store", path: "/all" })
        const contactsSubscription = urbitVisor.on("sse", ["contact-update", "initial"], (data) => {
            set({ contacts: data.rolodex })
            urbitVisor.unsubscribe(con.response)
            loaded++
            if (loaded === 5) finish();

        });
        const gro = await urbitVisor.subscribe({ app: "group-store", path: "/groups" })
        const groupsSubscription = urbitVisor.on("sse", ["groupUpdate", "initial"], (data) => {
            set({ groups: data })
            urbitVisor.unsubscribe(gro.response)
            loaded++
            if (loaded === 5) finish();
        });
        const gra = await urbitVisor.subscribe({ app: "graph-store", path: "/keys" })
        const channelsSubscription = urbitVisor.on("sse", ["graph-update", "keys"], (data) => {
            set({ channels: data })
            urbitVisor.unsubscribe(gra.response)
            loaded++
            if (loaded === 5) finish();
        });
        const har = await urbitVisor.subscribe({ app: "hark-store", path: "/updates" })
        const harkSubscription = urbitVisor.on("sse", ["more"], (data) => {
            const notes = data.reduce((acc, el) => Object.assign(acc, el), {});
            if (notes["all-stats"]) {
                set({ hark: notes })
                urbitVisor.unsubscribe(har.response)
                loaded++
                if (loaded === 5) finish();
            }
        });
    }
}))

