/*jshint esversion: 6 */
const express=require("express");
const {buildSchema}=require("graphql");
const {graphqlHTTP}=require("express-graphql");
const app=express();
/*
 buit In scaler type
 ID
 String
 Float
 Boolean
 List-[]
 */
let message="this is a message";
const schema=buildSchema(`
type User{
    name:String
    age:Int
    college:String
}
type Query{
hello:String!
welcomeMessage(name:String,dayOfWeek:String!):String
getUser:User
getMessage:String
}
type Mutation{
setMessage(newMessage:String):String
}
`);
const root={
    hello:()=>{
        // return null;give error
        return "hello world";
    },
    welcomeMessage:(args)=>{
        return `hey there ${args.name}, hows life. Hope your ${args.dayOfWeek} is Going good`;
    },
    getUser:()=>{
        const user1={
            name:"Achint Singh Chhabra",
            age:22,
            college:"AITR,Indore"
        };
        return user1;
    },
    setMessage:(args)=>{
        message=args.newMessage;
        return message;
    },
    getMessage:()=>{
        console.log(message);
        return message;
    }
};
app.use("/graphql",
graphqlHTTP({
    graphiql:true,
    schema:schema,
    rootValue:root,
}));
app.listen(4000,()=>console.log("server is running"));