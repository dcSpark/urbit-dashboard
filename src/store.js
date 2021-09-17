
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
    }
}))

