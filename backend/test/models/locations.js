var chai = require("chai");
var assert = chai.assert;
var Models = require("../../server/models");

describe("Models: locations", () => {
  describe("getLocations", async () => {
    it("should return an array with valid objects", async () => {
      const locations = await Models.getLocations();
  
      assert.isArray(locations);
      assert.isAbove(locations.length, 0);
      assert.property(locations[0], "name");
      assert.property(locations[0], "url");
    });
  });

  describe("getLandmarks", async () => {
    it("should return an array with valid objects if passed a valid location", async () => {
      const locationId = 1;
      const landmarks = await Models.getLandmarks(locationId);
  
      assert.isArray(landmarks);
      assert.isAbove(landmarks.length, 0);
      assert.property(landmarks[0], "name");
      assert.property(landmarks[0], "url");
      assert.property(landmarks[0], "locationId");
    });
  
    it("should return an empty array if passed an invalid location", async () => {
      const locationId = 'test';
      const landmarks = await Models.getLandmarks(locationId);
  
      assert.isArray(landmarks);
      assert.equal(landmarks.length, 0);
    });
  });
});