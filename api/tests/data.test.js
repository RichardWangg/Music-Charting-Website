import data from "../data";

describe("testing objects, defined, nulls", () => {
  it("should test that date exist", function () {
    const result = createName("max", "smith");
    expect(result.firstName).toBeDefined();
    expect(result.lastName).toBeDefined();

    const json = { firstName: "max", lastName: "smith" };
    expect(result).toEqual(json);
  });
  it("should test that first name and last name are correct", function () {
    const result = createName("johnny", "suh");
    expect(result.firstName).toBe("johnny");
    expect(result.lastName).toBe("suh");
  });
});
