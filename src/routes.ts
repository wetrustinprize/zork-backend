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

// USER
router.get("/users", EnsureAuthenticated, userController.index); // Show all users

router.get("/user", EnsureAuthenticated, userController.show); // Show self
router.get("/user/:id", EnsureAuthenticated, userController.show); // Show specific
router.get("/user/by-email/:email", EnsureAuthenticated, userController.show); // Show specific

router.post("/user", userController.store); // Creates new user
router.post("/login", authenticateUserController.store); // Login user

// TRANSACTION
router.post("/transaction", EnsureAuthenticated, transactionController.store);

router.get("/transaction", EnsureAuthenticated, transactionController.index);
router.get("/transaction/:id", EnsureAuthenticated, transactionController.show);

// REQUEST
router.get("/requests", EnsureAuthenticated, requestController.index);
router.get("/request/:id", EnsureAuthenticated, requestController.show);

router.post("/request", EnsureAuthenticated, requestController.store);
router.post("/request/:id", EnsureAuthenticated, requestController.method);

export { router };
