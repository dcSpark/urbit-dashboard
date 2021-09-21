
import create from 'zustand';

async function isConnected() {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async function check() {
            window.removeEventListener('load', check)
            const res = await window.urbitVisor.isConnected()
            resolve(res.response)
        })
    })
};

export const useStore = create((set, get) => ({
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
    checkConnection: async () => {
        const res = await isConnected()
        set({ isConnected: res })
    },
    recheckConnection: async () => {
        const res = await window.urbitVisor.isConnected()
        set({ isConnected: res.response })
    },
    checkPerms: async () => {
        //   const res = await getPerms();
        const res = await window.urbitVisor.authorizedPermissions();
        const required = ["shipName", "scry", "subscribe"];
        if (res.response && required.every(perm => res.response.includes(perm))) {
            const ship = await window.urbitVisor.getShip();
            set({ hasPerms: true, activeShip: ship.response });
        }
        else set({ hasPerms: false })
    },
    setShip: async () => {
        const res = await window.urbitVisor.getShip();
        set({ activeShip: res.response })
    },
    loadData: () => {
        window.addEventListener("message", function handleMessage(message) {
            if (message.data.app == "urbitVisorEvent" && message.data.event.data) {
                const data = message.data.event.data;
                const app = Object.keys(data)[0];
                switch (app) {
                    case "contact-update":
                        if (data[app].initial)
                            set({ contacts: data[app].initial.rolodex })
                        break;
                    case "groupUpdate":
                        console.log(data[app], "group update")
                        if (data[app].initial) set({ groups: data.groupUpdate.initial })
                        break;
                    case "graph-update":
                        console.log(data[app], "graph-update")
                        if (data[app].keys)
                            set({ channels: data[app].keys })
                        break;
                    case "harkUpdate":
                        const notes = data[app].more.reduce((acc, el) => Object.assign(acc, el), {})
                        if (notes.unreads) set({ hark: notes })
                        break;
                    case "metadata-update":
                        console.log(data[app], "metadata")
                        if (data[app].associations) set({ metadata: data[app].associations })
                        break;
                    default:
                        console.log(app, "app")
                        break;
                }
            }
        })
        window.urbitVisor.subscribe({ app: "contact-store", path: "/all" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "contact-store", path: "/all", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "group-store", path: "/groups" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "group-store", path: "/groups", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "graph-store", path: "/keys" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "graph-store", path: "/keys", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "hark-store", path: "/updates" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "hark-store", path: "/updates", id: res.response }] })))
        window.urbitVisor.subscribe({ app: "metadata-store", path: "/all" })
            .then(res => set(state => ({ activeSubscriptions: [...state.activeSubscriptions, { app: "metadata-store", path: "/all", id: res.response }] })))
    }
}))

