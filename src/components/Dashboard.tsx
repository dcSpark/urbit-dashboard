import React, { useState, useRef } from "react";
declare const window: any;

function getList(map: any): any{
  const keys = Object.keys(map)
  if (keys.length != 0){
      const layer2 = map[keys[0]];
      if (Array.isArray(layer2)) return layer2
      else return getList(layer2)
  }
}

function processData(data: any){
    console.log(data, "data to display")
    if (typeof(data) == "string") return <p>{data}</p>
    if (Array.isArray(data)){
        return (data.map((el, index) => <p key={index}>{JSON.stringify(el)}</p>))
    }
}


export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [app, setApp] = useState("");
    const [path, setPath] = useState("");
    const [json, setJson] = useState("");
    const [threadBody, setBody] = useState("");
    function fetchShip() {
        window.urbit.getShip()
            .then((res: any) => {
                if (res) setData(res)
                if (!res) setData("extension locked")
            })
            .catch((err: any) => setData(err))
    }
    function scry() {
        window.urbit.scry({ app: app, path: path })
            .then((res: any) => {
                console.log(res, "scried")
                console.log(getList(res), "processed")
                setData(getList(res));
            })
            .catch((err: any) => {
                console.log(err, "errored")
                setData("Scry failed")
            });
    };
    function thread() {
        window.urbit.thread({ inputMark: app, outputMark: path, threadName: json, body: threadBody })
        .then((res: any) => {
            console.log(res, "thread posted")
        })
        .catch((err: any) => {
            console.log(err, "errored")
            setData("Thread failed")
        });
    }
    function poke() {
        window.urbit.poke({ app: app, mark: path, json: json })
        .then((res: any) => {
            console.log(res, "poked")
        })
        .catch((err: any) => {
            console.log(err, "errored")
            setData("Poke failed")
        });
    }
    function subscribe() {
        window.urbit.subscribe({ app: app, path: path })
        .then((res: any) => {
            console.log(res, "subscribed")
        })
        .catch((err: any) => {
            console.log(err, "errored")
            setData("Subscription failed")
        });
    }
    return (
        <div className="main">
            <div className="col col1">
                <div className="shipname">
                    <a onClick={fetchShip}>Shipname</a>
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
                    <input onChange={(e) => setApp(e.currentTarget.value)}  type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)}  type="text" placeholder="mark" />
                    <input onChange={(e) => setJson(e.currentTarget.value)}  type="text" placeholder="json" />
                </div>
                <div className="subscribe">
                    <a onClick={subscribe}>Subscribe</a>
                    <input onChange={(e) => setApp(e.currentTarget.value)}  type="text" placeholder="app" />
                    <input onChange={(e) => setPath(e.currentTarget.value)}  type="text" placeholder="path" />
                </div>
            </div>
            <div className="col col2">
                <p>{processData(data)}</p>
            </div>
        </div>
    );
}