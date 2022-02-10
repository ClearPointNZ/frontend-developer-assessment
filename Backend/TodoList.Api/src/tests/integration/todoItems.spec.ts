import request from "supertest";
import * as httpStatus from "http-status";
import { getApp } from "../../app";

const app = getApp();

describe("TodoItems routes", () => {
  test("should initially have empty list", async () => {
    const response = await request(app)
      .get("/api/todoItems")
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  test("should not allow to create an empty todoItem", async () => {
    await request(app).post("/api/todoItems").expect(httpStatus.BAD_REQUEST);

    const response = await request(app)
      .get("/api/todoItems")
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  test("should be able to create a todoItem", async () => {
    await request(app)
      .post("/api/todoItems")
      .send({
        description: "test",
        isCompleted: false,
      })
      .expect(httpStatus.CREATED);

    const response = await request(app)
      .get("/api/todoItems")
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(1);
  });
});
