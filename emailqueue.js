const {Queue}=require("bullmq")
const {Redis}=require("ioredis")

const redis=new Redis()

 const emailqueue=new Queue("emailqueue",{connection:redis});
 module.exports={emailqueue}