
import create from 'zustand';

async function isConnected(){
    return new Promise((resolve, reject) =>{
        window.addEventListener('load', async function check(){
            window.removeEventListener('load', check)
            const res = await window.urbitVisor.isConnected()
            resolve(res)
        })
    })  
};

export const useStore = create((set, get) => ({
    isConnected: false,
    activeShip: "sampel-palnet",
    hasPerms: false,
    checkConnection: async () => {
      const res = await isConnected()
      set({isConnected: res})
    },
    checkPerms: async () =>{
    //   const res = await getPerms();
    const res = await window.urbitVisor.authorizedPermissions();
      const required = ["shipName", "scry", "subscribe"];
      if (required.every(perm => res.response.includes(perm))) set({hasPerms: true})
      else set({hasPerms: false})
    },
    setShip: async () => {
        const res = await window.urbitVisor.getShip();
        set({activeShip: res.response})
    }
}))

