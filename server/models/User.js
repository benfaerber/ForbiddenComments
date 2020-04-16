module.exports = class User {
  constructor(json) {
    this.id = json.sub || json.id;
    this.name = json.name;
    this.pfp = json.picture || json.pfp;
    this.locale = json.locale;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      pfp: this.pfp,
      locale: this.locale,
    };
  }
};
