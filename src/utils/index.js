export const fmtMSS = (s) => (
    (s - (s%=60))/60+(9<s?':':':0') + s
)

const days = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "0": "Sunday"
};

const months = {
    "0": "January",
    "1": "February",
    "2": "March",
    "3": "April",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "August",
    "8": "September",
    "9": "October",
    "10": "November",
    "11": "December",
};

export const getDayAsString = date => (
    days[date.getDay()]
);

// 1st 2nd 3rd 4th 5th 6th 7th 8th 9th 10th..21st 22nd 23rd 24th...

export const getPrettyDate = date => (
    `${date.getDate()} of ${months[date.getMonth()]}`
);

export const camelToTitle = camelCase =>
    camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase());