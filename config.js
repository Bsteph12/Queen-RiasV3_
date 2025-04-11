const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "+",
    ownerName: process.env.OWNER_NAME || "꧁༒♛ 𝔖𝔈𝔑_𝔖𝔗𝔈𝔓ℌ𝔄𝔑𝔈 ♛༒꧂",
    ownerNumber: process.env.OWNER_NUMBER || "237699320631",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Cameroon",
    botName: process.env.BOT_NAME || "꧁༒♛ 𝔖𝔈𝔑_𝔖𝔗𝔈𝔓ℌ𝔄𝔑𝔈  ♛༒꧂",
    exifPack: process.env.EXIF_PACK || "꧁༒♛ 𝔖𝔈𝔑_𝔖𝔗𝔈𝔓ℌ𝔄𝔑𝔈  ♛༒꧂",
    exifAuthor: process.env.EXIF_AUTHOR || "BOYCE",
    timeZone: process.env.TIME_ZONE || "Africa/Yaoundé",
    presenceStatus: process.env.PRESENCE_STATUS || "available",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "false" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "false" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "false" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUlOaDNybVNSaDdpa0JtQUt2NlY3WU9QTDFzRE8yd3Evd1FmQnlSTjMyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMS9CSmxqRTF6N29nT0NhazdNbjdCN0J2eTkzT0NZMytyT3RtYUp3R095WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSkh5NGU5aEF2Q2ZFa2JPd3BkbWdRdnJGelNOME96RVoxVHJSMEhNclhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRDlLLzRVaXYvYVRrMFBWR2FEWkFXbTVEVzBPN2piSThtd3ZiYjFWODBNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFFbHRyamNFUGVNSTZyUkwyTWdhc2d5dHNsVGtVd3pOQ0RXb2V3TldRVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhPcERVdVU5YVBxeEs1T1J0R1kwcERDRHhRZFAyVkN4UThCTmw3eFlrWG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVBSbEhlLzR5M00vSjhiaXY3RmU3V1B1Vncyejd1TXI0a1djVmEra05FWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JGN0RiYUExZGlGYnBiZko4TTlIbjlVSW16NmxwMFlhOTM1dUpXU2lRST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik80RmJtYkNvM1NLSDlHWDdYeFV0R3B2Z3VXSVd6YlhxVVJqVFNKSzNxR0g0QXpqTFYxazUxOVV0QS9OVjRBVzJUSU5yelpFa3REdHBRTFV5cEJuVGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJ4NTFjRnVXaTFCejh0NGtXaVFQYnVSY3Y5YzhUSTEwaWF2M3ducm9JbzJFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI1RU5YQU1WUSIsIm1lIjp7ImlkIjoiMjM3Njk5MzIwNjMxOjUwQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTk3OTY3OTQ0Mzc2NDcwOjUwQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTW5PK2NjRUVQWE41cjhHR0FZZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQzNXek4xMExNTlhrdFF5a1g3TE1PSzdJcWcvcDRPNlYzNU1LYlZMV2sydz0iLCJhY2NvdW50U2lnbmF0dXJlIjoia3I0U3NXWWNqYWg2bmpqRnNPdTgwajBpMlBrQnFxWWpZNTlSR0RyMStLai9OVFBJMU9oNUJ4amVFU2hyVWF6L05McXBCUVlpZ2JlWGdaTktPLzVSQ0E9PSIsImRldmljZVNpZ25hdHVyZSI6ImVaN0hqTENGdkcvTURjdjNkd2Zod1ZxYnRpUGVETWNEdm5nWmo1WVZESG5jTlNFSWhCY00vWXhyWUU2dFhFRmIxeDlxSENIQVJqbXJSeVV0dUJ2eWh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3Njk5MzIwNjMxOjUwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlF0MXN6ZGRDekRWNUxVTXBGK3l6RGl1eUtvUDZlRHVsZCtUQ20xUzFwTnMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDQxNDQ2NiwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJbXAifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "false" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "false" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
