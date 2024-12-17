import { expect } from "chai";
import sinon from "sinon";
import esmock from "esmock";

import { login, registerUser } from "../../../src/controllers/authController.js";
import { findUserByPesel } from "../../../src/models/userModel.js";
import { getBirthDateFromPESEL, getGenderFromPESEL } from "../../../src/utils/peselUtils.js";
import { formatPhoneNumber } from "../../../src/utils/formatters.js";
import { hashPassword } from "../../../src/utils/hashing.js";
import { registerUserTransaction } from "../../../src/models/userModel.js";

import db from "../../../src/config/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("AuthController - Login", () => {
  let req, res;
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

  it("should return 500 if there is a server error", async () => {
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

    req.body.username = "test@example.com";
    req.body.password = "Password123!";

    await login(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ message: "Błąd serwera" })).to.be.true;
  });
});

describe("AuthController - Register", () => {
  let req, res, mockedClient, mockedUtils, findUserByPesel, registerUser;

  beforeEach(async () => {
    req = {
      body: {
        name: "",
        surname: "",
        pesel: "",
        email: "",
        phoneNumber: "",
        password: "",
      },
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    mockedClient = {
      query: sinon.stub(),
      release: sinon.stub(),
    };

    sinon.stub(db, "connect").resolves(mockedClient);

    findUserByPesel = sinon.stub();
    mockedUtils = {
      findUserByPesel,
      getBirthDateFromPESEL: sinon.stub(),
      getGenderFromPESEL: sinon.stub(),
      formatPhoneNumber: sinon.stub(),
      hashPassword: sinon.stub(),
      registerUserTransaction: sinon.stub(),
    };

    const testEsmock = await esmock("../../../src/controllers/authController.js", {
      "../../../src/models/userModel.js": mockedUtils,
    });

    registerUser = testEsmock.registerUser;
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 400 if user already exists", async () => {
    findUserByPesel.resolves({ id: 1, pesel: "83052812339" });

    req.body = {
      name: "Maciek",
      surname: "Alencynowicz",
      pesel: "83052812339",
      email: "maciek@example.com",
      phoneNumber: "+48123123123",
      password: "StrongPassword123!",
    };

    await registerUser(req, res);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: "Podany uzytkownik juz istnieje" })).to.be.true;
  });

  it("should return 201 if user registered successfully", async () => {
    findUserByPesel.resolves(undefined);

    mockedUtils.getBirthDateFromPESEL.returns(new Date("1983-05-28"));
    mockedUtils.getGenderFromPESEL.returns("man");
    mockedUtils.formatPhoneNumber.returns({
      dialingCode: "+48",
      phoneNumber: "123123123",
    });
    mockedUtils.hashPassword.resolves("hashedPassword123!");
    mockedUtils.registerUserTransaction.resolves(1);

    req.body = {
      name: "Maciek",
      surname: "Alencynowicz",
      pesel: "83052812339",
      email: "maciek@example.com",
      phoneNumber: "+48123123123",
      password: "StrongPassword123!",
    };

    await registerUser(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Użytkownik został pomyślnie zarejestrowany. id: 1",
      })
    ).to.be.true;

    // expect(mockedClient.query.calledWith("BEGIN")).to.be.true;
    // expect(mockedClient.query.calledWith("COMMIT")).to.be.true;
  });

  it("should rollback transaction if an error occurs", async () => {
    findUserByPesel.resolves(undefined);

    mockedUtils.registerUserTransaction.rejects(new Error("Database error"));

    req.body = {
      name: "Maciek",
      surname: "Alencynowicz",
      pesel: "83052812347",
      email: "maciek@example.com",
      phoneNumber: "+48123123123",
      password: "StrongPassword123!",
    };

    await registerUser(req, res);

    expect(res.status.calledWith(409)).to.be.true;
    expect(res.json.calledWith({ message: "Błąd podczas dodawania użytkownika" })).to.be.true;

    // expect(mockedClient.query.calledWith("ROLLBACK")).to.be.true;
  });
});
