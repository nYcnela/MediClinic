import { expect } from "chai";
import sinon from "sinon";
import { validateLogin } from "../../../src/validators/authValidator.js";

describe("Auth Middleware - validateLogin", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: { username: "", password: "" } };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 400 if email is invalid", async () => {
    req.body.username = "maciek.xample.com";
    req.body.password = "Maciek1234!";

    await validateLogin[0](req, res, () => {});
    await validateLogin[1](req, res, () => {});
    await validateLogin[2](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: "Wprowadz poprawne dane logowania!" })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if password is invalid", async () => {
    req.body.username = "test@example.com";
    req.body.password = "weakpass";

    await validateLogin[0](req, res, () => {});
    await validateLogin[1](req, res, () => {});
    await validateLogin[2](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWith({ message: "Wprowadz poprawne dane logowania!" })).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should call next if validation passes", async () => {
    req.body.username = "test@example.com";
    req.body.password = "Password123!";

    await validateLogin[0](req, res, () => {});
    await validateLogin[1](req, res, () => {});
    await validateLogin[2](req, res, next);

    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });
});
