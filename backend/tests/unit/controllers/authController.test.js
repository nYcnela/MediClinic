import { expect } from "chai";
import sinon from "sinon";
import { login } from "../../../src/controllers/authController.js";
import db from "../../../src/config/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("AuthController - Login", () => {
  let req, res;
  // console.log(findUserByEmail);
  beforeEach(() => {
    req = { body: { username: "", password: "" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      cookie: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 404 if user is not found", async () => {
    sinon.stub(db, "query").resolves({ rows: [] });

    req.body.username = "test@example.com";
    req.body.password = "Password123!";

    await login(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: "Wprowadzony uzytkownik nie jest zarejestrowany" })).to.be.true;
  });

  it("should return 401 if password is incorrect", async () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      password: "hashedPassword123!",
    };

    sinon.stub(db, "query").resolves({ rows: [mockUser] });
    sinon.stub(bcrypt, "compare").resolves(false);

    req.body.username = "test@example.com";
    req.body.password = "wrongPassword123!";

    await login(req, res);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: "Błędny email lub hasło!" })).to.be.true;
  });

  it("should return 200 and a token if login is successful", async () => {
    const mockUser = {
      id: 1,
      name: "Maciek",
      surname: "A",
      email: "maciek@example.com",
      birth_date: new Date("2002-08-10"),
      role: "user",
      password: "hashedPassword",
    };

    sinon.stub(db, "query").resolves({ rows: [mockUser] });
    sinon.stub(bcrypt, "compare").resolves(true);

    sinon.stub(jwt, "sign").onFirstCall().returns("access_token").onSecondCall().returns("refresh_token");

    req.body.username = "maciek@example.com";
    req.body.password = "hashedPassword";

    await login(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Użytkownik został pomyślnie zalogowany",
        token: "access_token",
      })
    ).to.be.true;
    expect(res.cookie.calledWith("refreshToken", "refresh_token")).to.be.true;
  });

  it('should return 500 if there is a server error', async () => {
    const mockUser = {
      id: 1,
      name: "Maciek",
      surname: "A",
      email: "maciek@example.com",
      birth_date: new Date("2002-08-10"),
      role: "user",
      password: "hashedPassword",
    };

    sinon.stub(db, "query").resolves({ rows: [mockUser] });
    sinon.stub(bcrypt, "compare").throws(new Error("Symulowany błąd w bcrypt.compare"));

    req.body.username = 'test@example.com';
    req.body.password = 'Password123!';

    await login(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "Błąd serwera" })).to.be.true;
  });
});
