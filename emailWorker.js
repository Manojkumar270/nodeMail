const { Worker } = require("bullmq");
const { Redis } = require("ioredis");
const Mail = require("./mail");
const fs = require("fs");
const path = require("path");

const redis = new Redis({ maxRetriesPerRequest: null });

const emailWorker = new Worker(
  "emailqueue",
  async (job) => {
    const { receiverid, subject, text, name } = job.data;
    let fileLocation = fs.readFileSync(path.join(__dirname, "mail.html"), "utf8");
    fileLocation = fileLocation.replace("[name]", name);

    const mail = new Mail();
    mail.setTo(receiverid);
    mail.setSubject(subject);
    mail.setText(text);
    mail.setHtml(fileLocation);
    mail.setCC("mk4539587@gmail.com");
    mail.setBCC("manojkumarp2705@gmail.com");

    // Send email directly from the worker
    await mail.send();
  },
  { connection: redis }
);

module.exports = emailWorker;
