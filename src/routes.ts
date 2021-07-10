import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { TransactionController } from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const transactionController = new TransactionController();

// Post
router.post("/user", userController.store);
router.post("/login", authenticateUserController.store);
router.post("/transaction", EnsureAuthenticated, transactionController.store);

// Get
router.get("/user", EnsureAuthenticated, userController.show);
router.get("/user/:id", userController.show);

export { router };
