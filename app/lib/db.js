
// const {username,password}=process.env
// export const connectionStr="mongodb+srv://"+username+":"+password+"@clusterresto0.ust9y0h.mongodb.net/restoDB?appName=Clusterresto0";

export const connectionStr = process.env.MONGODB_URI;