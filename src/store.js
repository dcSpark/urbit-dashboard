
import create from 'zustand';

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
    setLoading: (boolean) => set({loading: boolean}),
    reset: () => set({ activeSubscriptions: [], chatFeed: [], activeShip: "sampel-palnet", groups: {}, channels: [], contacts: {}, metadata: {}, hark: { unreads: [], timebox: [] } }),
    checkConnection: async () => {
        try{
        const res = await isConnected()
        set({ isConnected: res })
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
    loadData: () => {
        set({ loading: true });
        let loaded = [];
        window.urbitVisor.scry({ app: "file-server", path: "/clay/base/hash" })
            .then(res => set({ hash: res.response }))
        window.addEventListener("message", function handleMessage(message) {
            if (message.data.app == "urbitVisorEvent" && message.data.event.data) {
                console.log(message, "sse")
                const data = message.data.event.data;
                const app = Object.keys(data)[0];
                switch (app) {
                    case "contact-update":
                        if (data[app].initial) {
                            set({ contacts: data[app].initial.rolodex })
                            const sub = get().activeSubscriptions.find(sub => sub.app == "contact-store" && sub.path == "/all");
                            loaded = [...loaded, sub.id]
                        }
                        break;
                    case "groupUpdate":
                        console.log(data[app], "group update")
                        if (data[app].initial) {
                            set({ groups: data.groupUpdate.initial })
                            const sub = get().activeSubscriptions.find(sub => sub.app == "group-store" && sub.path == "/groups");
                            loaded = [...loaded, sub.id]
                        }
                        break;
                    case "graph-update":
                        console.log(message, "graph-update")
                        if (data[app].keys) {
                            set({ channels: data[app].keys })
                            const sub = get().activeSubscriptions.find(sub => sub.app == "graph-store" && sub.path == "/keys");
                            loaded = [...loaded, sub.id]
                        }
                        if (data[app]["add-nodes"]) set(state => ({ chatFeed: [...state.chatFeed, data[app]["add-nodes"]] }))
                        else console.log(data[app], "graph-update")
                        break;
                    case "harkUpdate":
                        const notes = data[app].more.reduce((acc, el) => Object.assign(acc, el), {})
                        if (notes.unreads) {
                            set({ hark: notes })
                            const sub = get().activeSubscriptions.find(sub => sub.app == "hark-store" && sub.path == "/updates");
                            loaded = [...loaded, sub.id]
                        }
                        break;
                    case "metadata-update":
                        console.log(data[app], "metadata")
                        if (data[app].associations) {
                            set({ metadata: data[app].associations })
                            const sub = get().activeSubscriptions.find(sub => sub.app == "metadata-store" && sub.path == "/all");
                            loaded = [...loaded, sub.id]
                        }
                        break;
                    default:
                        console.log(app, "app")
                        break;
                }
            }
            if (loaded.length === 5) {
                set({ loading: false });
                for (let s of loaded) window.urbitVisor.unsubscribe(s);
                loaded = [];
            }
        })
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
        window.urbitVisor.subscribe({ app: "metadata-store", path: "/all" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "metadata-store", path: "/all", id: res.response }] })))
    }
}))

