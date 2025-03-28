const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "?",
    ownerName: process.env.OWNER_NAME || "SUKUNA",
    ownerNumber: process.env.OWNER_NUMBER || "237650471093",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Cameroon",
    botName: process.env.BOT_NAME || "SUKUNA",
    exifPack: process.env.EXIF_PACK || "SUKUNA STEPH",
    exifAuthor: process.env.EXIF_AUTHOR || "BOYCE",
    timeZone: process.env.TIME_ZONE || "Africa/Yaoundé",
    presenceStatus: process.env.PRESENCE_STATUS || "available",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "false" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "false" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hvbWpsRm5QOEg3SG1LMC9CTW5rQi9CU25aeWZiK1hSdGovVWJzeTgzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS012UElOZ1IwS1dsQXVWa2cxbExjNHhzZzN4S01UQ3F3dzVEekx2YUhCMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjR0xRNHNGTTg5TlJjR3QzWmRXSjcya0Fadldvd2NjdGdNV1JEaVhmZm1vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVa0FnU3RrZ0dzaTFFZUlFa0tKdHJ3UXQ0TGk2Q2NpQnBlLzdmbWVyMldFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlMVUdTclZDaEhCQXc0VHRDdWhTdU0waXlXbnZvZUdwem10MWtJWjEwRm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRyMzlPUTB1eW5jS1I0enc2K3BZWWRzelZhalpzaTFtVGRDZVcwS1VGVjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUd0TGRGeC9YVmVNNUR4c0xmdU9NMzhtZ0FaOFFRMDVPUlYwckF4YkVFQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjZNRmUrNDNSWkZxa21vdTljaFluQmZ6NDBZdEVyemhlR0k2ZStnVlAyaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJ6SElIUDFlUnZRaFA3a285T3pIdTRmKzd6TGRTejUwajc4MlBvc0UzZHR5UDF2WHZUUS9kOFRDNFlLSHJGbUVRWUdHVjFab3crYkUydTJsVTE2U2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjMsImFkdlNlY3JldEtleSI6IjVtSjJQSWRPK2tKSEtsdU1jclk1dlYvTEJoTC9Malhpa1ZaTTFNejQrVTg9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM3NjUwNDcxMDkzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM3NjI0OEQ3NEIwOEM5Q0ZFQ0FFODJDMzkxMjU2NTBBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDMxNTI2Mjh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjIzNzY1MDQ3MTA5M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDRURDRDAwMjU2MjIxM0JEODE0RDk5Q0VFNjk1MDAxQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQzMTUyNjI4fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI1UVdONUg1WiIsIm1lIjp7ImlkIjoiMjM3NjUwNDcxMDkzOjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoic2VuIHN0dWRpbyIsImxpZCI6Ijg4OTI3OTE4NjYxODU5OjFAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQTGF6L1lDRU9UTG1iOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJranhPSEVJNWdVa2tpbmRqcGJPdlVtNnh4bmxSa2FUdkpOVm1hM1NweVh3PSIsImFjY291bnRTaWduYXR1cmUiOiIwVzlCaWFONGd6UkZCTG1nbGtDV0M5SXcxTnpQMThReDBLZ1Erb1FFbGdNM1poMHJ3bjFDcFpRTWpqaW1YNzFRNUM4Um1FV2I4dG95Vzl1Qko1K21BQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYVl3ZTFORVlBYVFnRDBMNGxLNnJJcmVTM1E1V3hiTXNjRW1SQkZZZUltbnVqdm5xejBOSXVVWU5DUThBOVRZbWkra2VZb2V0OTgvTUQvbTdvOXJMamc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2NTA0NzEwOTM6MUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaSThUaHhDT1lGSkpJcDNZNld6cjFKdXNjWjVVWkdrN3lUVlptdDBxY2w4In19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQklJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDMxNTI2MjUsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFRWsifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
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
