# Urbit Dashboard

Simple React App to test the Login With Urbit Extension

## Get started
Clone the repo, then run `npm start`, then go to localhost:3000 on your browser.

A simple page will open up, with five clickable buttons:
- Shipname
- Scry
- Thread
- Poke
- Subscribe

Clicking on "Shipname" will show your Urbit ship's `@p`.

Clicking on scry will perform a scry with the data given in the input boxes below it.

Clicking on thread will perform a thread with the data given in the input boxes below it.

And so on.

## User story using Login With Urbit Extension
If your ship is not connected to the Login With Urbit Extension, the extension will pop up inside an iframe in the page and prompt you to connect.

If your ship has not given permissions to the page to access the requested information, the extension will popup and ask you to grant the permissions.

If permissions exist, the page will fetch the requested data from your ship, through the extension.

## Testing
A simple test scry would be `graph-store` as "app" and `/keys` as "path.
That will display a list of channels your ship is currently subscribed to.

## TODO
- Threads, pokes and subscriptions don't return data directly, they just influence the Eventsource SSE stream from your ship. The dashboard should have a way to display those as they come in.
- Granular menus to show the different available inputs taken by different actions to make data easier to fetch.


