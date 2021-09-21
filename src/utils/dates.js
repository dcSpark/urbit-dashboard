export function dateDiff(date) {
    const now = new Date();
    const diff = now - new Date(date);
    return toString(diff / 1000)
}

function toString(s) {
    if (s < 60) {
        return "right now"
    } else if (s < 3600) {
        return `${Math.ceil(s / 60)} minutes ago`
    } else if (s < 86400) {
        return `${Math.ceil(s / 60 / 60)} hours ago`
    } else if (s < 2678400) {
        return `${Math.ceil(s / 60 / 60 / 24)} days ago`
    } else if (s < 32140800) {
        return `${Math.ceil(s / 60 / 60 / 24 / 30)} months ago`
    } else {
        return `${Math.ceil(s / 60 / 60 / 24 / 30 / 12)} years ago`
    }
}
