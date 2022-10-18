const rp = require("request-promise");

async function getToken() {
  const options = {
    method: "POST",
    url: "https://api-hermes.pathaointernal.com/aladdin/api/v1/issue-token",
    body: {
      client_id: "1159",
      client_secret: "IF6qltiEzzeIuVGx9bnL7r4awpffaGfDlskQmdsS",
      username: "alistore.bangladesh@gmail.com",
      password: "EkIiJjHgX",
      grant_type: "password",
    },
    json: true,
  };
  const data = await rp(options);
  return data.access_token;
}

exports.getRecipientCity = async (req, res) => {
  const token = await getToken();
  const options = {
    method: "GET",
    url: "https://api-hermes.pathaointernal.com/aladdin/api/v1/countries/1/city-list",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  };
  const city = await rp(options);
  return res.status(200).json({ data: city.data.data });
};

exports.getRecipientZone = async (req, res) => {
  const { city_id } = req.body;
  const token = await getToken();
  const options = {
    method: "GET",
    url: `https://api-hermes.pathaointernal.com/aladdin/api/v1/cities/${city_id}/zone-list`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  };
  const zone = await rp(options);
  return res.status(200).json({ data: zone.data.data });
};

exports.getRecipientArea = async (req, res) => {
  const { zone_id } = req.body;
  const token = await getToken();
  const options = {
    method: "GET",
    url: `https://api-hermes.pathaointernal.com/aladdin/api/v1/zones/${zone_id}/area-list`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  };
  const area = await rp(options);
  return res.status(200).json({ data: area.data.data });
};

exports.getDeliveryCharge = async (req, res) => {
  const { weight, recipient_city, recipient_zone } = req.body;
  const token = await getToken();
  const options = {
    method: "POST",
    url: "https://api-hermes.pathaointernal.com/aladdin/api/v1/merchant/price-plan",
    body: {
      store_id: "53067",
      item_type: 2,
      delivery_type: 48,
      item_weight: weight,
      recipient_city: recipient_city.id,
      recipient_zone: recipient_zone.id,
    },
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    json: true,
  };
  const data = await rp(options);
  return res.status(200).json({ data });
};
