/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import { gobalErrorHandler } from "./app/middlewares/gobalErrorHandler";
import { notFound } from "./app/middlewares/notFount";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from 'express-session'


const app = express()


app.use(expressSession({
    secret: 'Your Secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(express.json())
app.use(cors())


app.use("/api/v1", router)


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management System Backend"
    })
})


app.use(gobalErrorHandler)

app.use(notFound)



export default app