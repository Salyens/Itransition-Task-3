import crypto from "crypto";

class CryptoFunctions {
  constructor() {
    this.key = crypto.randomBytes(32).toString("hex");
  }

  generateHMAC(message) {
    return crypto.createHmac("sha256", this.key).update(message).digest("hex");
  }
}

export default CryptoFunctions;
