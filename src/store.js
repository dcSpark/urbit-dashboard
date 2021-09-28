
import create from 'zustand';
import {useCallback} from "react";
async function isConnected() {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async function check() {
            window.removeEventListener('load', check)
            if (window.urbitVisor){
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
    activeSubscriptions: [],
    groups: {},
    channels: [],
    contacts: {},
    metadata: {},
    hark: { unreads: [], timebox: [] },
    chatFeed: [],
    hash: "",
    loading: false,
    setLoading: (boolean) => set({ loading: boolean }),
    reset: () => set({ activeSubscriptions: [], chatFeed: [], activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { unreads: [], timebox: [] } }),
    checkConnection: async () => {
        try{
        const res = await isConnected()
        set({ isConnected: res, loaded: true})
        } catch(err){
          set({isInstalled: false})
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
        set({ loading: true, activeSubscriptions: [], chatFeed: [], activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { unreads: [], timebox: [] } })
        let loaded = [];
        window.urbitVisor.scry({ app: "file-server", path: "/clay/base/hash" })
            .then(res => set({ hash: res.response }));
        const metadataSubscription = window.urbitVisor.on("sse", {gallApp: "metadata-update", dataType: "associations"}, (data)=> {
            set({ metadata: data })
            const sub = get().activeSubscriptions.find(sub => sub.app == "metadata-store" && sub.path == "/all");
            loaded = [...loaded, sub.id]
            if (loaded.length === 5) finish();

        });
        const channelsSubscription = window.urbitVisor.on("sse", {gallApp: "graph-update", dataType: "keys"}, (data)=> {
            set({ channels: data })
            const sub = get().activeSubscriptions.find(sub => sub.app == "graph-store" && sub.path == "/keys");
            loaded = [...loaded, sub.id]
            if (loaded.length === 5) finish();

        });
        const groupsSubscription = window.urbitVisor.on("sse", {gallApp: "groupUpdate", dataType: "initial"}, (data)=> {
            set({ groups: data })
            const sub = get().activeSubscriptions.find(sub => sub.app == "group-store" && sub.path == "/groups");
            loaded = [...loaded, sub.id];
            if (loaded.length === 5) finish();

        });
        const contactsSubscription = window.urbitVisor.on("sse", {gallApp: "contact-update", dataType: "initial"}, (data)=> {
            set({ contacts: data.rolodex })
            const sub = get().activeSubscriptions.find(sub => sub.app == "contact-store" && sub.path == "/all");
            loaded = [...loaded, sub.id]
            if (loaded.length === 5) finish();

        });
        const harkSubscription = window.urbitVisor.on("sse", {gallApp: "harkUpdate", dataType: "more"}, (data)=> {
            const notes = data.reduce((acc, el) => Object.assign(acc, el), {})
            if (notes.unreads) {set({ hark: notes })
            const sub = get().activeSubscriptions.find(sub => sub.app == "hark-store" && sub.path == "/updates");
            loaded = [...loaded, sub.id];
            if (loaded.length === 5) finish();
        }
        });
        function finish(){
            set({ loading: false });
            for (let s of loaded) window.urbitVisor.unsubscribe(s)
            loaded = [];
            metadataSubscription.unsubscribe();
            channelsSubscription.unsubscribe();
            groupsSubscription.unsubscribe();
            harkSubscription.unsubscribe();
            contactsSubscription.unsubscribe();
        }
        window.urbitVisor.subscribe({ app: "metadata-store", path: "/all" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "metadata-store", path: "/all", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "contact-store", path: "/all" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "contact-store", path: "/all", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "group-store", path: "/groups" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "group-store", path: "/groups", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "graph-store", path: "/keys" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "graph-store", path: "/keys", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "graph-store", path: "/updates" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "graph-store", path: "/updates", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "hark-store", path: "/updates" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "hark-store", path: "/updates", id: res.response }] })))
    }
}))

