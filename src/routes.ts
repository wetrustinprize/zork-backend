import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { RequestController } from "./controllers/RequestController";
import { TransactionController } from "./controllers/TransactionController";
import { UserController } from "./controllers/UserController";
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated";

const router = Router();

const userController = new UserController();
const authenticateUserController = new AuthenticateUserController();
const transactionController = new TransactionController();
const requestController = new RequestController();

// Post
router.post("/user", userController.store);
router.post("/login", authenticateUserController.store);
router.post("/transaction", EnsureAuthenticated, transactionController.store);
router.post("/request", EnsureAuthenticated, requestController.store);

// Get
router.get("/user", EnsureAuthenticated, userController.show);
router.get("/user/:id", EnsureAuthenticated, userController.show);
router.get("/transaction/:id", EnsureAuthenticated, transactionController.show);

export { router };
