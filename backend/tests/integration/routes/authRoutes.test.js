// test/integration/authIntegrationTest.js

import express from "express";
import request from "supertest";
import { expect } from "chai";
import sinon from "sinon";
import bodyParser from "body-parser";

import { validateLogin } from "../../../src/validators/authValidator.js";
import { login } from "../../../src/controllers/authController.js";

import db from "../../../src/config/dbConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Integration Test - /login Route", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());

    app.post("/login", validateLogin, login);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 200 and token if login is successful", async () => {
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

    const response = await request(app).post("/login").send({ username: "maciek@example.com", password: "Password123!" });

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({
      message: "Użytkownik został pomyślnie zalogowany",
      token: "access_token",
    });
    expect(response.headers["set-cookie"]).to.exist;
    expect(response.headers["set-cookie"][0]).to.include("refreshToken=refresh_token");
  });

  it("should return 400 if email is invalid", async () => {
    const response = await request(app).post("/login").send({ username: "invalidEmail", password: "Password123!" });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "Wprowadz poprawne dane logowania!",
    });
  });

  it("should return 400 if password is invalid", async () => {
    const response = await request(app).post("/login").send({ username: "maciek@example.com", password: "weakpass" });

    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({
      message: "Wprowadz poprawne dane logowania!",
    });
  });

  it("should return 404 if user is not found", async () => {
    sinon.stub(db, "query").resolves({ rows: [] });

    const response = await request(app).post("/login").send({ username: "nieIstniejacyMacko@example.com", password: "Password123!" });

    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({
      message: "Wprowadzony uzytkownik nie jest zarejestrowany",
    });
  });

  it("should return 401 if authentication fails due to wrong password", async () => {
    const mockUser = {
      id: 1,
      email: "maciek@example.com",
      password: "hashedPassword",
    };

    sinon.stub(db, "query").resolves({ rows: [mockUser] });
    sinon.stub(bcrypt, "compare").resolves(false); // Incorrect password

    const response = await request(app).post("/login").send({ username: "maciek@example.com", password: "WrongPassword123!" });

    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({
      message: "Błędny email lub hasło!",
    });
  });

  it("should return 500 if a server error occurs", async () => {
    const mockUser = {
      id: 1,
      name: "Maciek",
      surname: "A",
      email: "maciek@example.com",
      birth_date: new Date("2002-08-10"),
      role: "user",
      password: "hashedPassword",
    };
    sinon.stub(db, "query").resolves({rows: [mockUser]});
    sinon.stub(bcrypt, "compare").throws(new Error("Symulowany błąd w bcrypt.compare"));

    const response = await request(app).post("/login").send({ username: "maciek@example.com", password: "Password123!" });

    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({
      message: "Błąd serwera",
    });
  });
});
