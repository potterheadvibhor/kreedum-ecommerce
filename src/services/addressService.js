const axios = require("axios");

class AddressService {
  async getAddressByPincode(pincode) {
    // Validate Indian PIN Code
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      throw new Error("Invalid Indian pincode.");
    }

    const url = `https://api.postalpincode.in/pincode/${pincode}`;

    const { data } = await axios.get(url, {
      timeout: 5000,
    });

    const result = data[0];

    if (
      result.Status !== "Success" ||
      !result.PostOffice ||
      result.PostOffice.length === 0
    ) {
      throw new Error("Pincode not found.");
    }

    const postOffices = result.PostOffice;

    const primary = postOffices[0];

    return {
      pincode,
      city: primary.District,
      district: primary.District,
      state: primary.State,
      country: primary.Country,
      locality: primary.Name,

      availableLocalities: postOffices.map((office) => office.Name),
    };
  }
}

module.exports = new AddressService();