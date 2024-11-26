import { expect } from "chai";
import sinon from "sinon";
import { validateRegister } from "../../../src/validators/authValidator.js";

describe("Auth Middleware - validateRegister", () => {
  let req, res, next;

  beforeEach(() => {
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
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should return 400 if name is invalid", async () => {
    req.body.name = "M";

    await validateRegister[0](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if surname is invalid", async () => {
    req.body.name = "Maciej";
    req.body.surname = "A";

    await validateRegister[1](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if pesel is invalid", async () => {
    req.body.name = "Maciej";
    req.body.surname = "Alencynowicz";
    req.body.pesel = "123";

    await validateRegister[2](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if email is invalid", async () => {
    req.body.name = "Maciej";
    req.body.surname = "Alencynowicz";
    req.body.pesel = "83052812347";
    req.body.email = "invalid-email";

    await validateRegister[3](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if phone number is invalid", async () => {
    req.body.name = "Maciej";
    req.body.surname = "Alencynowicz";
    req.body.pesel = "83052812347";
    req.body.email = "maciek@example.com";
    req.body.phoneNumber = "123";

    await validateRegister[4](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should return 400 if password is invalid", async () => {
    req.body.name = "Maciej";
    req.body.surname = "Alencynowicz";
    req.body.pesel = "83052812347";
    req.body.email = "maciek@example.com";
    req.body.phoneNumber = "+48123123123";
    req.body.password = "weakpass";

    await validateRegister[5](req, res, () => {});
    await validateRegister[6](req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWith({
        message: "Wprowadz poprawne dane aby sie zarejestrowac!",
      })
    ).to.be.true;
    expect(next.notCalled).to.be.true;
  });

  it("should call next if all validation passes", async () => {
    req.body.name = "Maciej";
    req.body.surname = "Alencynowicz";
    req.body.pesel = "11111111111";
    req.body.email = "maciek@example.com";
    req.body.phoneNumber = "+48123123123";
    req.body.password = "StrongPassword123!"; 

    for (let i = 0; i < validateRegister.length; i++) {
        if (i < validateRegister.length - 1) {
          await validateRegister[i](req, res, () => {});
        } else {
          await validateRegister[i](req, res, next);
        }
    }

    expect(res.status.notCalled).to.be.true;
    expect(res.json.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });
});
