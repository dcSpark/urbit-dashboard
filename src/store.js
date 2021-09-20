
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
    groups: {},
    channels: [],
    contacts: {},
    hark: [],
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
    loadData:  () => {
        window.addEventListener("message", (message) => {
          if (message.data.app == "urbitVisorEvent"){
            const app = Object.keys(message.data.event.data)[0]
             switch (app){
                 case "contact-update":
                     set({contacts: message.data.event.data[app].initial.rolodex})
                     break;
                 case "groupUpdate":
                     set({groups: message.data.event.data.groupUpdate.initial})
                     break;
                  case "graph-update":
                      set({channels: message.data.event.data[app].keys})
                      break;
                  case "harkUpdate":
                      set({hark: message.data.event.data[app].more})
                      break;
                  default:
                      console.log(app, "app")
                      break;
             }
          }
        })
        window.urbitVisor.subscribe({app: "contact-store", path: "/all"})
          .then(res => console.log(res, "subscription..."))
        window.urbitVisor.subscribe({app: "group-store", path: "/groups"})
        window.urbitVisor.subscribe({app: "graph-store", path: "/keys"})
        window.urbitVisor.subscribe({app: "hark-store", path: "/updates"})
    }
}))

