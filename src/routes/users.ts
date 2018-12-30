import express from "express";
import { User } from "../entity/User";
import DatabaseHandler from "../services/database-handler";

const router = express.Router();

router.route("/")
    .get(async (req, res, next) => {
        res.status(200)
            .send(await DatabaseHandler.getInstance().findAll(User));
    })
    .post(async (req, res, next) => {
        const { firstName, lastName, age } = req.body;

        const user = new User();
        user.id = 0;
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;

        await DatabaseHandler.getInstance().save(user);
        res.sendStatus(201);
    });

router.route("/:id")
    .get(async (req, res, next) => {
        res.status(200)
            .send(await DatabaseHandler.getInstance().findOne(User, "user", "user.id = :id", { id: req.params.id }));
    })
    .patch(async (req, res, next) => {
        const { id } = req.params;
        const { firstName, lastName, age } = req.body;

        const user: User | undefined =
            await DatabaseHandler.getInstance().findOne(User, "user", "user.id = :id", { id });

        if (user === undefined) {
            res.sendStatus(404);
            return;
        }

        if (firstName != null && firstName !== undefined) {
            user.firstName = firstName;
        }

        if (lastName != null && lastName !== undefined) {
            user.lastName = lastName;
        }

        if (age != null && age !== undefined) {
            user.age = age;
        }

        await DatabaseHandler.getInstance().save(user);
        res.status(200).send(await DatabaseHandler.getInstance().findOne(User, "user", "user.id = :id", { id }));
    })
    .delete(async (req, res, next) => {
        const { id } = req.params;
        try {
            await DatabaseHandler.getInstance().getDeleteBuilder(User, "user", "user.id = :id", { id });
            res.sendStatus(204);
        } catch (error) {
            console.log(error);
            res.sendStatus(404);
        }
    });

export default router;
