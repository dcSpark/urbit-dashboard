
import create from 'zustand';
import { useCallback } from "react";
async function isConnected() {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async function check() {
            window.removeEventListener('load', check)
            if (window.urbitVisor) {
                const res = await window.urbitVisor.isConnected()
                resolve(res.response)
            } else reject("not installed")
        })
    })
};

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
    setChatsub: (number) => set({chatsub: number}),
    addConnectionListener: (listener) => set({connectionListener: listener}), 
    addDisconnectionListener: (listener) => set({disconnectionListener: listener}), 
    addPermissionGrantingListener: (listener) => set({permissionGrantingListener: listener}), 
    addPermissionRevokingListener: (listener) => set({permissionRevokingListener: listener}), 
    addChatFeedListener: (listener) => set({chatFeedListener: listener}), 
    setLoading: (boolean) => set({ loading: boolean }),
    reset: () => set({ chatFeed: [], hasPerms: false, activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { "all-stats": [], timebox: [] } }),
    checkConnection: async () => {
        try {
            const res = await isConnected()
            set({ isConnected: res, loaded: true })
        } catch (err) {
            set({ isInstalled: false })
        }
    },
    recheckConnection: async () => {
        const res = await window.urbitVisor.isConnected();
        set({ isConnected: res.response })
    },
    checkPerms: async () => {
        const res = await window.urbitVisor.authorizedPermissions();
        const required = ["shipName", "scry", "subscribe"];
        if (res.response && required.every(perm => res.response.includes(perm)))
            set({ hasPerms: true })
        else set({ hasPerms: false })
    },
    setShip: async () => {
        const res = await window.urbitVisor.getShip();
        set({ activeShip: res.response })
    },
    addToChatFeed: (message) => {
        set(state => ({ chatFeed: [...state.chatFeed, message] }))
    },
    loadData: async () => {
        set({ loading: true, chatFeed: [], activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { "all-stats": [], timebox: [] } })
        let loaded = 0;
        window.urbitVisor.scry({ app: "hood", path: "/kiln/vats" }).then(res => set({ hash: res.response.base.hash }));
        function finish() {
            set({ loading: false });
            loaded = [];
            metadataSubscription.unsubscribe();
            contactsSubscription.unsubscribe();
            groupsSubscription.unsubscribe();
            channelsSubscription.unsubscribe();
            harkSubscription.unsubscribe();
        }
        await window.urbitVisor.subscribe({ app: "graph-store", path: "/updates" });

        const met = await window.urbitVisor.subscribe({ app: "metadata-store", path: "/all" })
        const metadataSubscription = window.urbitVisor.on("sse", [ "metadata-update", "associations"], (data) => {
            set({ metadata: data })
            window.urbitVisor.unsubscribe(met.response)
            loaded++
            if (loaded === 5) finish();
        });
        const con = await window.urbitVisor.subscribe({ app: "contact-store", path: "/all" })
        const contactsSubscription = window.urbitVisor.on("sse", [ "contact-update", "initial"], (data) => {
            set({ contacts: data.rolodex })
            window.urbitVisor.unsubscribe(con.response)
            loaded++
            if (loaded === 5) finish();

        });
        const gro = await window.urbitVisor.subscribe({ app: "group-store", path: "/groups" })
        const groupsSubscription = window.urbitVisor.on("sse", [ "groupUpdate", "initial"], (data) => {
            set({ groups: data })
            window.urbitVisor.unsubscribe(gro.response)
            loaded++
            if (loaded === 5) finish();
        });
        const gra = await window.urbitVisor.subscribe({ app: "graph-store", path: "/keys" })
        const channelsSubscription = window.urbitVisor.on("sse", [ "graph-update", "keys"], (data) => {
            set({ channels: data })
            window.urbitVisor.unsubscribe(gra.response)
            loaded++
            if (loaded === 5) finish();
        });
        const har = await window.urbitVisor.subscribe({ app: "hark-store", path: "/updates" })
        const harkSubscription = window.urbitVisor.on("sse", ["more"], (data) => {
            const notes = data.reduce((acc, el) => Object.assign(acc, el), {});
            if (notes["all-stats"]) {
                set({ hark: notes })
                window.urbitVisor.unsubscribe(har.response)
                loaded++
                if (loaded === 5) finish();
            }
        });
    }
}))

