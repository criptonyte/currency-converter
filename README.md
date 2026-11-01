# IDR to AUD

A mobile currency calculator, based on the supplied Claude HTML artifact.

## Install on Android

Open the GitHub Pages HTTPS address in Chrome. From the browser menu choose **Add to Home screen**, then **Install** (wording varies by browser).

Keep the app open with internet access on the first visit so its offline files can finish downloading. After that it can reopen and calculate offline. Rates are entered manually; there is no live rate feed.

Exchange rate, card-fee preference, and spending history are stored on this device in browser local storage. They are not uploaded. Clearing site data removes them. Existing data from a downloaded HTML file or another website address does not migrate automatically.

## Publish

Create a public repository, upload these files to its root, and enable **Settings → Pages → Deploy from a branch → main → /(root)**.

No build step, backend, paid hosting, or external dependencies are needed.

## Updates

Increment the cache version in `sw.js` when changing application files. Updates activate after all existing app windows close. Reopen while online to pick up the update.
