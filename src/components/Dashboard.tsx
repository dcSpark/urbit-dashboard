import React, { useState, useEffect, useRef } from "react";
declare const window: any;

function getList(map: any): any {
    const keys = Object.keys(map)
    if (keys.length != 0) {
        const layer2 = map[keys[0]];
        if (Array.isArray(layer2)) return layer2
        else return getList(layer2)
    }
}

function processData(data: any) {
    console.log(data, "processing data")
    if (typeof (data) == "string") return <p>{data}</p>
    if (Array.isArray(data)) {
        return (data.map((el, index) => <p key={index}>{JSON.stringify(el)}</p>))
    }
}


export default function Dashboard() {
    const [data, setData] = useState<string[]>([]);
    const [app, setApp] = useState("");
    const [path, setPath] = useState("");
    const [json, setJson] = useState("");
    const [threadBody, setBody] = useState("");
    const handler = (event: any) => addData(event);

    useEffect(()=>{
        window.addEventListener("message", handler, false);
        return () => window.removeEventListener('message', handler)
    }, [data]);
    function addData(event: any){
        console.log(data, "data at this point")
        if (event.data?.app == "urbit-sse") setData([...data, JSON.stringify(event.data)])
    }

    function fetchShip() {
        window.urbitVisor.getShip()
            .then((res: any) => {
                if (res) setData(res)
                if (!res) setData(["extension locked"])
            })
            .catch((err: any) => setData(err))
    }
    function fetchURL() {
        window.urbitVisor.getURL()
            .then((res: any) => {
                if (res) setData(res)
                if (!res) setData(["extension locked"])
            })
            .catch((err: any) => setData(err))
    }
    function scry() {
        window.urbitVisor.scry({ app: app, path: path })
            .then((res: any) => {
                console.log(res, "scried")
                console.log(getList(res), "processed")
                setData(getList(res));
            })
            .catch((err: any) => {
                console.log(err, "errored")
                setData(["Scry failed"])
            });
    };
    function thread() {
        let body;
        try {
            body = JSON.parse(threadBody)
            window.urbitVisor.thread({ inputMark: app, outputMark: path, threadName: json, body: body })
                .then((res: any) => {
                    console.log(res, "thread posted")
                })
                .catch((err: any) => {
                    console.log(err, "errored")
                    setData(["Thread failed"])
                });
        } catch {
            setData(["Error parsing JSON body"])
        }

    }
    function poke() {
        window.urbitVisor.poke({ app: app, mark: path, json: json })
            .then((res: any) => {
                console.log(res, "poked")
            })
            .catch((err: any) => {
                console.log(err, "errored")
                setData(["Poke failed"])
            });
    }

    function subscribe() {
        window.urbitVisor.subscribe({ app: app, path: path})
            .then((res: any) => {
                console.log(res, "subscribed")
            })
            .catch((err: any) => {
                console.log(err, "errored")
                setData(["Subscription failed"])
            });
    }
    function requestPerms(){
        window.urbitVisor.requestPermissions(["shipName", "poke", "subscribe"])
        .then((res: any) => {
            console.log(res, "permissions obtained")
        })
        .catch((err: any) => {
            console.log(err, "errored")
            setData(["Permission Request Failed"])
        });
    }
    function test(){
        window.urbitVisor.test();
    }
    return (
        <div className="main">
            <div className="col col1">
                <div className="shipname">
                    <a onClick={fetchShip}>Shipname</a>
                </div>
                <div className="shipURL">
                    <a onClick={fetchURL}>URL</a>
                </div>
                <div className="scry">
                    <a onClick={scry}>Scry</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)} type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)} type="text" placeholder="path" />
                </div>
                <div className="thread">
                    <a onClick={thread}>Thread</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)} type="text" placeholder="inputMark" />
                    <input onChange={(e) => setPath(e.currentTarget.value)} type="text" placeholder="outputMark" />
                    <input onChange={(e) => setJson(e.currentTarget.value)} type="text" placeholder="threadName" />
                    <input onChange={(e) => setBody(e.currentTarget.value)} type="text" placeholder="body" />
                </div>
                <div className="poke">
                    <a onClick={poke}>Poke</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)} type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)} type="text" placeholder="mark" />
                    <input onChange={(e) => setJson(e.currentTarget.value)} type="text" placeholder="json" />
                </div>
                <div className="subscribe">
                    <a onClick={subscribe}>Subscribe</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)} type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)} type="text" placeholder="path" />
                </div>
                <div className="request-perms">
                    <a onClick={requestPerms}>Request Perms</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)} type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)} type="text" placeholder="path" />
                </div>
            </div>
            <div className="col col2">
                <div>{processData(data)}</div>
            </div>
        </div>
    );
}