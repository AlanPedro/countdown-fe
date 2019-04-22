export const fmtMSS = (s: number) => (
    (s - (s%=60))/60+(9<s?':':':0') + s
)

interface StringIndexDictionary {
    [index: string]: string;
}

const days: StringIndexDictionary = {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "0": "Sunday"
};

const months: StringIndexDictionary = {
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

export const getDayAsString = (date: Date) => (
    days[date.getDay()]
);

export const getPrettyDate = (date: Date) => (
    `${date.getDate()} of ${months[date.getMonth()]}`
);

export const camelToTitle = (camelCase: string) =>
    camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase());